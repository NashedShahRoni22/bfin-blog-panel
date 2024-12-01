import { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi"; // Importing React Icons
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";

export default function ManageBlogs() {
  const accessToken = localStorage.getItem("bfinitBlogAccessToken");
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    let url = "https://api.blog.bfinit.com/api/v1/filter_category";
    if (categoryId !== "") {
      url = `https://api.blog.bfinit.com/api/v1/filter_category/${categoryId}`;
    }
    fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setLoading(false);
          setBlogs(data.data.data);
        } else {
          setLoading(false);
          alert(data.message);
        }
      });
  }, [accessToken, categoryId]);

  const handleBlogDelete = (id, title) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the blog: "${title}"? This action cannot be undone.`,
    );
    if (confirmDelete) {
      fetch(`https://api.blog.bfinit.com/api/v1/blogs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status) {
            const updatedBlogs = blogs.filter((blogItem) => blogItem.id !== id);
            setBlogs(updatedBlogs);
            alert(`Blog "${title}" has been deleted successfully.`);
          } else {
            alert("Failed to delete the blog.");
          }
        });
    }
  };

  useEffect(() => {
    fetch("https://api.blog.bfinit.com/api/v1/show_list", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setCategories(data.data);
        } else {
          alert(data.message);
        }
      });
  }, [accessToken]);

  return (
    <section className="h-screen w-full overflow-y-auto px-5 py-5 lg:px-10">
      <div className="flex items-center justify-between border-b pb-2.5">
        <h1 className="text-xl font-semibold text-neutral-800">Manage Blogs</h1>
        <select
          name="category"
          id="category"
          required
          className="mt-2 rounded-lg border border-gray-400 px-4 py-2 outline-none"
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">All</option>
          {categories &&
            categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
        </select>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto py-6">
          <table className="min-w-full table-auto bg-white">
            <thead>
              <tr className="border bg-gray-100 text-left text-sm font-medium text-gray-700">
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Website Name</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {blogs &&
                blogs.map((blog) => (
                  <tr key={blog.id} className="border text-sm text-gray-600">
                    <td className="px-6 py-3">{blog.id}</td>
                    <td className="px-6 py-3">{blog.title}</td>
                    <td className="px-6 py-3">{blog.category.name}</td>
                    <td className="px-6 py-3">
                      {blog.created_at.slice(0, 10)}
                    </td>
                    <td className="flex justify-start gap-4 px-6 py-3">
                      <Link
                        to={`/dashboard/update-blog/${blog.id}`}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FiEdit className="h-5 w-5" />
                      </Link>
                      <button
                        onClick={() => handleBlogDelete(blog.id, blog.title)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiTrash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
