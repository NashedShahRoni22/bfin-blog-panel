import { useEffect, useState } from "react";
import BlogCard from "../../components/BlogCard";
import Loader from "../../components/Loader";

export default function ManageBlogs() {
  const accessToken = localStorage.getItem("bfinitBlogAccessToken");
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("https://api.blog.bfinit.com/api/v1/blogs", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setLoading(false);
          setBlogs(data.data.Blog_posts);
        } else {
          setLoading(false);
          alert(data.message);
        }
      });
  }, [accessToken]);

  return (
    <section className="h-screen w-full overflow-y-auto px-5 py-5 lg:px-10">
      <h1 className="border-b pb-3 text-2xl font-semibold text-neutral-800">
        Manage Blogs
      </h1>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 gap-8 py-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs &&
            blogs?.map((blog) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                blogs={blogs}
                setBlogs={setBlogs}
              />
            ))}
        </div>
      )}
    </section>
  );
}
