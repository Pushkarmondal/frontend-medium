import { BlogCard } from "../components/Blogcard"
import { useBlogs } from "../hooks"

export const Blogs = () => {
      const { loading, blogs } = useBlogs();

      

      return <div className="space-y-2" >
            <BlogCard
                  authorName={'Pushkar'}
                  title={"How a ugly looking website makes $5000 a month with affiliate marketing"}
                  content={'How a ugliy looking website makes $5000 a month with affiliate marketing, How a ugliy looking website makes $5000 a month with affiliate marketing, How a ugliy looking website makes $5000 a month with affiliate marketing,'}
                  publishDate={'Today'}
                  />
      </div>
}