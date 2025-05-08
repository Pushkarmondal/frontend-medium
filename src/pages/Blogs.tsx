import { BlogCard } from "../components/Blogcard";
import { useBlogs } from "../hooks";

export const Blogs = () => {
      const { loading, blogs, error } = useBlogs();

      if (loading) {
            return <div>Loading.....</div>;
      }

      if (error) {
            return <div>{error}</div>; // Display error message if any
      }

      return (
            <div className="space-y-2">
                  {blogs && blogs.length > 0 ? (
                        blogs.map((blog) => (
                              <BlogCard
                                    key={blog.id}
                                    authorName={blog.authorName || 'Pushkar'} // Assuming each blog has an 'authorName'
                                    title={blog.title} // Using the dynamic title from 'blog'
                                    content={blog.content} // Using the dynamic content from 'blog'
                                    publishDate={blog.publishDate || 'Today'}
                                    id={blog.id}// Using the dynamic publish date
                              />
                        ))
                  ) : (
                        <p>No blogs available</p>
                  )}
            </div>
      );
};
