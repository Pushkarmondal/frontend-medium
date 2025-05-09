// blog-adapter.ts
// This utility helps convert from your API response format to your component format

export interface ApiBlog {
      blog: {
            content: string;
            title: string;
            id: string;
            author: {
                  username: string;
            };
            publishDate?: string;
      }
}

export interface ComponentBlog {
      id: string;
      title: string;
      content: string;
      authorname: string;
      publishDate?: string;
}

export function adaptBlogData(apiData: ApiBlog): ComponentBlog {
      return {
            id: apiData.blog.id,
            title: apiData.blog.title,
            content: apiData.blog.content,
            authorname: apiData.blog.author.username,
            publishDate: apiData.blog.publishDate
      };
}

// Usage example:
// const apiResponse = fetchBlogData(); // Your API call
// const blogForComponent = adaptBlogData(apiResponse);
// return <BlogPage blog={blogForComponent} />;