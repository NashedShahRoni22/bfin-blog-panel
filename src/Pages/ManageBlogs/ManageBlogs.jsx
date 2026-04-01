import { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function ManageBlogs() {
  const accessToken = localStorage.getItem("bfinitBlogAccessToken");
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [page, setPage] = useState(1);
  const [paginationData, setPaginationData] = useState([]);

  useEffect(() => {
    let url = `https://api.blog.bfinit.com/api/v1/filter_category?page=${page}&per_page=2`;
    if (categoryId !== "") {
      url = `https://api.blog.bfinit.com/api/v1/filter_category/${categoryId}?page=${page}&per_page=2`;
    }
    fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setPaginationData(data?.data);
          setLoading(false);
          setBlogs(data.data.data);
        } else {
          setLoading(false);
          alert(data.message);
        }
      });
  }, [accessToken, categoryId, page]);
  const totalPage = Math.ceil(paginationData.total / paginationData.per_page);

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
          <table className="min-w-full table-auto overflow-hidden rounded-lg bg-white">
            <thead>
              {blogs.length <= 0 ? (
                <p className="flex min-h-screen items-center justify-center text-center font-semibold">
                  No Blogs Found
                </p>
              ) : (
                <>
                  <tr className="border bg-gray-100 text-left text-sm font-medium text-gray-700">
                    <th className="px-6 py-3">SL</th>
                    <th className="px-6 py-3">Title</th>
                    <th className="px-6 py-3">Website Name</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Action</th>
                  </tr>
                </>
              )}
            </thead>
            <tbody className="">
              {blogs &&
                blogs.map((blog, i) => (
                  <tr
                    key={blog.id}
                    className="border text-sm text-gray-600 shadow-sm hover:bg-gray-100"
                  >
                    <td className="px-6 py-3">{i + 1}</td>
                    <td className="w-1/2 px-6 py-3">{blog.title}</td>
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
          {/* pagination */}
          <div className="mt-6 flex justify-center">
            <div className="join">
              {/* Left Arrow */}
              <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                <FaArrowLeft className="mx-2 text-gray-600" />
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPage || 0 }, (_, i) => i + 1).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`mx-2 ${
                      pageNum === page
                        ? "btn btn-xs rounded-sm bg-primary px-1.5 text-white"
                        : "btn btn-outline btn-xs rounded-sm px-1.5 hover:bg-primary hover:text-white"
                    }`}
                  >
                    {pageNum}
                  </button>
                ),
              )}

              {/* Right Arrow */}
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPage}
              >
                <FaArrowRight className="mx-2 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
