import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createBlogSchema, updateBlogSchema } from '@nishitcodes100x/medium-common'

export const blogsRoute = new Hono<{
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

blogsRoute.use('/*', async (c, next) => {
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

blogsRoute.post('/blog', async (c) => {
      const body = await c.req.json();
      const { success } = createBlogSchema.safeParse(body);
      if (!success) {
            console.log('Error while creating blogs');
            return c.json({message: 'Invalid data for blogs'}, 400)
      }
      const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
      const author = c.get('user');
      const { title, content } = body;

      if (!title || !content) {
            return c.json({ message: 'Invalid data' }, 400);
      }

      try {
            const blog = await prisma.blogs.create({
                  data: {
                        title,
                        content,
                        authorId: author.id,
                  },
            });

            return c.json({ message: 'Blog created', blog }, 201);
      } catch (error) {
            console.error('Error creating blog:', error);
            return c.json({ message: 'Invalid data or database error' }, 400);
      }
});

blogsRoute.put('/update-blog', async (c) => {
      const body = await c.req.json();
      const { success } = updateBlogSchema.safeParse(body);
      if (!success) {
            console.log('Error editing blogs');
            return c.json({ message: 'Can not edit' }, 400)
      }
      const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());

      const { id, title, content } = body;

      if (!id || !title || !content) {
            return c.json({ message: 'Invalid data' }, 400);
      }

      try {
            const updatedBlog = await prisma.blogs.update({
                  where: { id },
                  data: { title, content },
            });

            return c.json({ message: 'Blog updated', updatedBlog }, 200);
      } catch (error) {
            console.error('Error updating blog:', error);
            return c.json({ message: 'Invalid data or blog not found' }, 400);
      }
});


blogsRoute.get('/getBlogs/:id', async (c) => {
      const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());

      const id = c.req.param('id');

      if (!id) {
            return c.json({ message: 'Invalid ID!' }, 400);
      }

      try {
            const response = await prisma.blogs.findUnique({
                  where: { id },
            });

            if (!response) {
                  return c.json({ message: 'Blog not found' }, 404);
            }

            console.log("Blogs details ->", response);
            return c.json({ blog: response }, 200); 
      } catch (error) {
            console.error('Error getting blog based on ID:', error);
            return c.json({ message: 'Invalid data or blog not found' }, 400);
      }
});

blogsRoute.get('/allblogs', async (c) => {
      const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
      try {
            const allBlogs = await prisma.blogs.findMany({
                  select: {
                        content: true,
                        title: true,
                        id: true,
                        author: {
                              select: {
                                    username: true
                              }
                        }
                  }
            });

            return c.json({
                  blogs: allBlogs
            }, 200);
      } catch (error) {
            console.error('Error getting all blogs', error);
            return c.json({ message: 'Blog not found' }, 400);
      }

})
