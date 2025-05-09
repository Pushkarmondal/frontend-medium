import { Blog } from "../hooks";
import { Avatar } from "./Avatar";

export const BlogPage = ({ blog }: { blog: Blog }) => {
      // Format the date if it exists
      const formattedDate = blog?.publishDate
            ? new Date(blog.publishDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
            })
            : "August 24, 2023"; // Fallback date

      // More robust author name extraction
      let authorName = "Anonymous";

      // Handle different possible structures
      if (blog?.authorname && blog.authorname !== "undefined") {
            authorName = blog.authorname;
      } else if (blog?.author?.username && blog.author.username !== "undefined") {
            authorName = blog.author.username;
      }

      console.log("BlogPage using authorName:", authorName);

      return (
            <div className="min-h-screen bg-white px-4 sm:px-10 py-8 sm:py-12">
                  <div className="grid grid-cols-12 gap-8 lg:gap-12 max-w-7xl mx-auto">
                        {/* Left Content - Blog Text */}
                        <div className="col-span-12 md:col-span-8">
                              <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                                    {blog?.title || "Untitled Blog"}
                              </h1>
                              <p className="text-gray-500 mb-6">Posted on {'Today'}</p>
                              <div className="text-gray-800 leading-relaxed space-y-4">
                                    {blog?.content || "No content available"}
                              </div>
                        </div>

                        {/* Right Content - Author Info */}
                        <div className="col-span-12 md:col-span-4 md:pl-6 lg:pl-10">
                              <div className="flex items-start gap-4">
                                    <Avatar name={authorName} size="lg" />
                                    <div>
                                          <p className="text-slate-600 mb-1">Author</p>
                                          <p className="text-xl font-semibold">{authorName}</p>
                                          <p className="text-gray-700 mt-2">
                                                Master of mirth, purveyor of puns, and the funniest person in the kingdom.
                                          </p>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
};