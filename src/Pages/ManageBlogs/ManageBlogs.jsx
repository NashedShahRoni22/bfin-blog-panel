import BlogCard from "../../components/BlogCard";
import { blogsData } from "../../data/blogsData";

export default function ManageBlogs() {
  return (
    <section className="h-screen w-full overflow-y-auto px-5 py-5 lg:px-10">
      <h1 className="border-b pb-3 text-2xl font-semibold text-neutral-800">
        Manage Blogs
      </h1>
      {/* Blogs Container */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {blogsData.map((blog, i) => (
          <BlogCard key={i} blog={blog} />
        ))}
      </div>
    </section>
  );
}
