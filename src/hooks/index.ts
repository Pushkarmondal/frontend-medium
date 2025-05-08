import { useEffect, useState } from "react";
import axios from "axios";
import { GET_BLOGS } from "../Config";

// Define the structure of a blog object (adjust if necessary)
interface Blog {
      id: string;
      title: string;
      content: string;
      publishDate?: string;
      authorName?: string;
}


export const useBlog = ({ id }: { id: string }) => {
      const [loading, setLoading] = useState<boolean>(true);
      const [blogs, setBlogs] = useState<Blog[]>([]); // Type for blogs array
      const [error, setError] = useState<string | null>(null); // Type error state as string | null

      useEffect(() => {
            const fetchBlogs = async () => {
                  try {
                        const token = localStorage.getItem("jwt");

                        if (!token) {
                              console.error("No authentication token found");
                              setLoading(false);
                              return;
                        }

                        const res = await axios.get(GET_BLOGS, {
                              headers: {
                                    Authorization: `Bearer ${token}`,
                              },
                        });

                        setBlogs(res.data.blogs);
                  } catch (error) {
                        if (axios.isAxiosError(error)) {
                              console.error("Failed to fetch blogs:", error.response?.data?.message || error.message);
                              setError("Failed to fetch blogs. Please try again later.");
                        } else {
                              console.error("An unknown error occurred:", error);
                              setError("An unknown error occurred. Please try again later.");
                        }
                  } finally {
                        setLoading(false);
                  }
            };

            fetchBlogs();
            
      }, []);
}




export const useBlogs = () => {
      const [loading, setLoading] = useState<boolean>(true);
      const [blogs, setBlogs] = useState<Blog[]>([]); // Type for blogs array
      const [error, setError] = useState<string | null>(null); // Type error state as string | null

      useEffect(() => {
            const fetchBlogs = async () => {
                  try {
                        const token = localStorage.getItem("jwt");

                        if (!token) {
                              console.error("No authentication token found");
                              setLoading(false);
                              return;
                        }

                        const res = await axios.get(GET_BLOGS, {
                              headers: {
                                    Authorization: `Bearer ${token}`,
                              },
                        });

                        setBlogs(res.data.blogs);
                  } catch (error) {
                        if (axios.isAxiosError(error)) {
                              console.error("Failed to fetch blogs:", error.response?.data?.message || error.message);
                              setError("Failed to fetch blogs. Please try again later.");
                        } else {
                              console.error("An unknown error occurred:", error);
                              setError("An unknown error occurred. Please try again later.");
                        }
                  } finally {
                        setLoading(false);
                  }
            };

            fetchBlogs();
            const intervalBlogs = setInterval(fetchBlogs, 5000)
            return () => clearInterval(intervalBlogs);
      }, []);

      return {
            loading,
            blogs,
            error,
      };
};
