import { LiaEdit, LiaTrashAlt } from "react-icons/lia";
import { Link } from "react-router-dom";

export default function BlogCard({ blog, blogs, setBlogs }) {
  const accessToken = localStorage.getItem("bfinitBlogAccessToken");
  const { id, title, thumbnail_url } = blog;

  const handleBlogDelete = () => {
    fetch(`https://api.blog.bfinit.com/api/v1/blogs/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          const updatedBlogs = blogs.filter((blogItem) => blogItem.id !== id);
          setBlogs(updatedBlogs);
        }
      });
  };

  return (
    <div className="rounded border">
      <Link to="/">
        <img
          src={thumbnail_url}
          alt=""
          loading="lazy"
          className="rounded-t border-b"
        />
      </Link>
      <div className="p-4 text-gray-600">
        <Link to="/" className="text-xl font-semibold text-black">
          {title}
        </Link>

        <Link
          to={`/dashboard/update-blog/${id}`}
          className="mt-6 flex w-full items-center justify-center gap-1 rounded border border-[#DEE8F7] bg-[#EFF4FB] py-2 font-medium text-primary transition-all duration-200 ease-linear hover:border-[#9CBAE7] hover:bg-[#DEE8F7] hover:text-primary-hover"
        >
          <LiaEdit className="text-2xl" /> Update
        </Link>
        <button
          onClick={handleBlogDelete}
          className="mt-3 flex w-full items-center justify-center gap-1 rounded border border-red-100 bg-red-50 py-2 font-medium text-red-300 transition-all duration-200 ease-linear hover:border-red-400 hover:bg-red-100 hover:text-red-500"
        >
          <LiaTrashAlt className="text-2xl" /> Delete
        </button>
      </div>
    </div>
  );
}
