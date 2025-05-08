import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import bcrypt from 'bcryptjs';
import { Hono } from "hono";
import { sign } from 'hono/jwt'
import { signUpSchema, signInSchema } from '@nishitcodes100x/medium-common'



export const userRoutes = new Hono<{
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

userRoutes.post('/signup', async (c) => {
      const body = await c.req.json();
      const { success } = signUpSchema.safeParse(body);

      if (!success) {
            console.error('Error Signup:');
            return c.json({ message: 'Invalid data for signup' }, 403);
      }
      const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());

      const { username, email, password } = body;

      if (!username || !email || !password) {
            return c.text('All fields required!', 400);
      }

      try {
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await prisma.user.create({
                  data: {
                        username,
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

userRoutes.post('/signin', async (c) => {
      const body = await c.req.json();
      const { success } = signInSchema.safeParse(body);
      if (!success) {
            console.error('Error Signin:');
            return c.json({ message: 'Invalid data for signin' }, 403);
      }
      const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());

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


export default userRoutes