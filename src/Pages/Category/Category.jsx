import { useEffect, useState } from "react";
import blogsCategoryData from "../../data/blogsCategoryData";
import CategoryListItem from "../../components/CategoryListItem";
import "./category.css";

export default function Category() {
  const [categories, setCategories] = useState([]);

  // Handle Add New Category
  const handleAddNewCategory = (e) => {
    e.preventDefault();
    const form = e.target;
    const newCategory = form.newCategory.value;
    setCategories((oldCategories) => [newCategory, ...oldCategories]);

    // Reset input filed
    form.reset();
  };

  // Fetch All Categories
  useEffect(() => {
    setCategories(blogsCategoryData);
  }, []);

  return (
    <section className="relative h-screen w-full px-5 py-5 lg:overflow-y-auto lg:px-10">
      <h1 className="mb-4 border-b pb-3 text-2xl font-semibold text-neutral-800">
        Category
      </h1>

      <form
        onSubmit={handleAddNewCategory}
        className="grid grid-cols-12 lg:gap-x-12"
      >
        <div className="col-span-12 h-fit lg:sticky lg:top-0 lg:col-span-4">
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

        {/* Category List Container */}
        <div className="col-span-12 mt-8 lg:col-span-8 lg:mt-0">
          <h3 className="rounded-lg bg-subtle-white px-4 py-2 text-xl font-medium text-neutral-800 shadow lg:mt-2 lg:py-1.5">
            All Categories
          </h3>
          <ul className="custom-scrollbar mt-3.5 lg:h-[72vh] lg:overflow-y-auto">
            {categories.map((category, i) => (
              <CategoryListItem key={i} category={category} index={i} />
            ))}
          </ul>
        </div>
      </form>
    </section>
  );
}
