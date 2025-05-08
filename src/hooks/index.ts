import { useEffect, useState } from "react";
import axios from "axios";
import { GET_BLOGS } from "../Config";

export const useBlogs = () => {
      const [loading, setLoading] = useState(true);
      const [blogs, setBlogs] = useState([]);

      useEffect(() => {
            const response = axios.get(GET_BLOGS)
                  .then(res => {
                        setBlogs(res.data)
                        setLoading(false)
                  }) 
      }, [])

      return {
            loading,
            blogs
      }
}