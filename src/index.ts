import { Hono } from 'hono';
import userRoutes from './routes/user';
import { blogsRoute } from './routes/blogs';
import { cors } from 'hono/cors'


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

app.use('*', cors())
app.route('/api/v1/user', userRoutes)
app.route('/api/v1/blogs', blogsRoute)


export default app