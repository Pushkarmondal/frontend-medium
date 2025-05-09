import axios from 'axios';
import { Sparkles } from 'lucide-react';
import { PUBLISH_BLOG } from '../Config';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function AddContent() {
      const navigate = useNavigate();
      const [title, setTitle] = useState("");
      const [content, setContent] = useState("");
      return (
            <div className="min-h-screen  bg-gradient-to-b from-gray-50 to-slate-200">
                  <main className="max-w-3xl mx-auto px-4 py-12">
                        <div className="space-y-8">
                              <input
                                    onChange={(e) => {
                                          setTitle(e.target.value)
                                    }}
                                    type="text"
                                    placeholder="Title"
                                    className="w-full  rounded-md shadow-md text-4xl font-serif font-bold placeholder-slate-600 bg-transparent focus:outline-none focus:ring-0 transition-all duration-200 p-4"
                              />

                              <div className="prose prose-lg max-w-none">
                                    <textarea
                                          value={content}
                                          onChange={(e) => setContent(e.target.value)}
                                          placeholder="Tell your story..."
                                          className=" shadow-md w-full min-h-[70vh] resize-none font-serif font-semibold rounded-md text-lg leading-relaxed placeholder-slate-500 bg-transparent focus:outline-none focus:ring-0 transition-all duration-200 p-4"
                                    />
                              </div>

                              <div className="flex justify-end">
                                    <button
                                          onClick={async () => {
                                                const token = localStorage.getItem("jwt");

                                                if (!token) {
                                                      console.error("No authentication token found");
                                                      return;
                                                }

                                                try {
                                                      const response = await axios.post(
                                                            PUBLISH_BLOG,
                                                            { title, content },
                                                            {
                                                                  headers: {
                                                                        Authorization: `Bearer ${token}`,
                                                                  },
                                                            }
                                                      );
                                                      console.log(response.data.id)
                                                      navigate(`/blogs`)
                                                } catch (error) {
                                                      console.error("Error publishing blog:", error);
                                                }
                                          }}
                                          className="flex items-center px-6 py-2 -mt-2 rounded-full bg-green-600 text-white font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200"
                                    >
                                          <Sparkles className="w-4 h-4 mr-2" />
                                          Publish
                                    </button>

                              </div>
                        </div>
                  </main>
            </div>
      );
}
