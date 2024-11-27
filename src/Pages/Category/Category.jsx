import { useEffect, useState } from "react";
import CategoryListItem from "../../components/CategoryListItem";
import "./category.css";
import Loader from "../../components/Loader";

export default function Category() {
  const accessToken = localStorage.getItem("bfinitBlogAccessToken");
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  // Handle Add New Category
  const handleAddNewCategory = (e) => {
    e.preventDefault();
    const form = e.target;
    const newCategory = form.newCategory.value;

    if (newCategory) {
      fetch("https://api.blog.bfinit.com/api/v1/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ name: newCategory }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status) {
            setLoading(false);
            setCategories((oldCategories) => [data.data, ...oldCategories]);
          } else {
            setLoading(false);
            alert(data.message);
          }
        });
    }

    // Reset input filed
    form.reset();
  };

  // Fetch All Categories
  useEffect(() => {
    fetch("https://api.blog.bfinit.com/api/v1/show_list", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setLoading(false);
          setCategories(data.data);
        } else {
          setLoading(false);
          alert(data.message);
        }
      });
  }, [accessToken]);

  return (
    <section className="relative h-screen w-full px-5 py-5 lg:overflow-y-auto lg:px-10">
      <h1 className="mb-4 border-b pb-3 text-2xl font-semibold text-neutral-800">
        Category
      </h1>

      <div className="grid grid-cols-12 lg:gap-x-12">
        <form
          onSubmit={handleAddNewCategory}
          className="col-span-12 lg:col-span-4"
        >
          <div className="h-fit w-full lg:sticky lg:top-0">
            <input
              type="text"
              name="newCategory"
              id="newCategory"
              placeholder="Category Name"
              required
              className="mb-6 mt-2 w-full rounded-lg border border-gray-400 bg-subtle-white px-4 py-2 outline-none"
            />
            <button
              type="submit"
              className="mx-auto block w-full rounded-lg bg-primary px-4 py-2 text-lg font-medium capitalize text-white lg:mx-0"
            >
              Add new category
            </button>
          </div>
        </form>
        {/* Category List Container */}
        <div className="col-span-12 mt-8 lg:col-span-8 lg:mt-0">
          <h3 className="bg-subtle-white px-4 py-2 text-xl font-medium text-neutral-800 lg:mt-2">
            All Categories
          </h3>
          {loading ? (
            <Loader />
          ) : (
            <ul className="custom-scrollbar lg:h-[72vh] lg:overflow-y-auto">
              {categories?.map((category) => (
                <CategoryListItem
                  key={category.id}
                  categories={categories}
                  category={category}
                  setCategories={setCategories}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
