import { Hono } from 'hono';
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import bcrypt from 'bcryptjs';
import { sign, verify } from 'hono/jwt'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string
  };
  Variables: {
    user: {
      id: string;
    }; 
  };
}>();


app.use('/api/v1/blogs/*', async (c, next) => {
  const header = c.req.header('Authorization');
  if (!header) return c.text('Unauthorized', 401);

  const token = header.replace('Bearer ', '');
  try {
    const payload = await verify(token, c.env.JWT_SECRET) as { id: string };
    c.set('user', payload);
    await next();
  } catch (err) {
    return c.text('Invalid or expired token', 401);
  }
});


app.post('/api/v1/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { userName, email, password } = body;

  if (!userName || !email || !password) {
    return c.text('All fields required!', 400);
  }
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        userName,
        email,
        password: hashedPassword
      }
    });

    console.log("user created->", user);
    const secret = 'mySecretKey';
    const token = await sign({ id: user.id }, secret);
    return c.json({
      jwt: token
    });

  } catch (error) {
    console.error("Invalid Data!", error);
  }
})

app.post('/api/v1/signin', async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { email, password } = body;

  if (!email || !password) {
    return c.text('No user found for this email!', 403);
  }

  try {
    const response = await prisma.user.findUnique({
      where: {
        email
      }
    })
    if (!response) {
      return c.text('No user found with this email!', 404);
    }

    const passwordMatch = await bcrypt.compare(password, response.password);

    if (!passwordMatch) {
      return c.text('Incorrect password!', 401);
    }
    console.log(response)
    const secret = 'mySecretKey';
    const token = await sign({ id: response?.id }, secret);
    return c.json({
      jwt: token
    });
  } catch (error) {
    console.error("Invalid Data!", error);
  }
})

// app.post('/api/v1/blogs/blog', (c) => {

// })

// app.put('/api/v1/blogs/update-blog', (c) => {

// })

// app.get('/api/v1/blogs/getBlogs/:id', (c) => {
// })

export default app