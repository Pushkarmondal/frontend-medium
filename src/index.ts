import { Hono } from 'hono';
import userRoutes from './routes/user';
import { blogsRoute } from './routes/blogs';

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

app.route('/api/v1/user', userRoutes)
app.route('/api/v1/blogs', blogsRoute)


export default app