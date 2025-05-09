
import { BlogPage } from "../components/BlogPage";
import { useBlog } from "../hooks"
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../icons/LoadingSpinner";
import { Skeleton } from "../components/Skeleton";

export const Blog = () => {
      const { id } = useParams();
      const { loading, blog } = useBlog({
            id: id || ""
      });
      if (loading) return <div><Skeleton/></div>;
      if (!blog) return <div>Blog not found.</div>;

      return <div>
            <BlogPage blog={blog} />;
      </div>
}
 