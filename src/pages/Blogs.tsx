import { BlogCard } from "../components/Blogcard";
import { useBlogs } from "../hooks";
import { LoadingSpinner } from "../icons/LoadingSpinner";

export const Blogs = () => {
      const { loading, blogs, error } = useBlogs();

      if (loading) {
            return <div><LoadingSpinner /></div>;
      }

      if (error) {
            return <div>{error}</div>;
      }

      return (
            <div className="space-y-2">
                  {blogs && blogs.length > 0 ? (
                        blogs.map((blog) => {
                              // Extract the author name from the correct location in the data structure
                              let authorName = "Anonymous";

                              // Check if blog has authorname directly
                              if (blog.authorname && blog.authorname !== "undefined") {
                                    authorName = blog.authorname;
                              }
                              // Check if blog has author.username structure (from your initial JSON)
                              else if (blog.author && blog.author.username && blog.author.username !== "undefined") {
                                    authorName = blog.author.username;
                              }

                              return (
                                    <BlogCard
                                          key={blog.id}
                                          authorName={authorName}
                                          title={blog.title || "Untitled"}
                                          content={blog.content || "No content available"}
                                          publishDate={'Today'}
                                          id={blog.id}
                                    />
                              );
                        })
                  ) : (
                        <p>No blogs available</p>
                  )}
            </div>
      );
};