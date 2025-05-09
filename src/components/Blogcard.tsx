import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";

interface BlogCardDetails {
      authorName: string;
      title: string;
      content: string;
      publishDate: string;
      id: string;
}

export const BlogCard = ({
      authorName,
      title,
      content,
      publishDate,
      id
}: BlogCardDetails) => {
      return (
            <Link to={`/blogs/${id}`}>
                  <div className="w-full px-4 py-3 flex justify-center cursor-pointer">
                        <div className="w-full max-w-screen-xl min-h-[150px] border border-slate-200 rounded-2xl shadow-2xl/10 bg-white p-6 transition hover:shadow-lg">
                              {/* Author Info */}
                              <div className="flex items-center mb-4 text-normal text-gray-600">
                                    <Avatar name={authorName || "Anonymous"} size="md" />
                                    <div className="ml-3">
                                          <p className="font-semibold text-lg text-gray-800">{authorName || "Anonymous"}</p>
                                          <div className="flex items-center text-gray-500 text-sm">
                                                <span>
                                                      {publishDate || "Today"}
                                                </span>
                                                <span className="mx-1">·</span>
                                                <span>{Math.ceil(content.length / 100)} min read</span>
                                          </div>
                                    </div>
                              </div>

                              {/* Title */}
                              <h2 className="text-2xl font-bold text-gray-900 mb-3">{title}</h2>

                              {/* Content */}
                              <p className="text-gray-700 text-base leading-relaxed">
                                    {content.length > 300 ? `${content.slice(0, 300)}...` : content}
                              </p>
                        </div>
                  </div>
            </Link>
      );
};