export default function DeleteModal({
  closeModal,
  category,
  id,
  setCategories,
  categories,
}) {
  const accessToken = localStorage.getItem("bfinitBlogAccessToken");

  const handleCategoryDelete = () => {
    fetch(`https://api.blog.bfinit.com/api/v1/delete-category/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          const updatedCategories = categories.filter(
            (category) => category.id !== id,
          );
          setCategories(updatedCategories);
          closeModal();
        }
      });
  };

  return (
    <div className="inline-block w-full rounded-lg bg-white pb-6 pt-4 shadow-2xl md:w-[27.5rem]">
      <p className="mb-6 border-b pb-2 text-center text-xl font-medium">
        Confirm Deletetion
      </p>

      <div className="px-4">
        <p className="leading-relaxed text-gray-600">
          Are you sure you want to delete{" "}
          <span className="font-semibold">{category}</span>? <br />
        </p>
        <p className="mb-6 mt-2 text-sm text-gray-500">
          This action cannot be undone.
        </p>

        <div className="flex items-center gap-4">
          <button
            onClick={handleCategoryDelete}
            className="mx-auto w-full rounded-lg border border-red-100 bg-red-50 px-4 py-2 text-lg font-medium capitalize text-red-400 transition-all duration-200 ease-linear hover:border-red-400 hover:bg-red-100 hover:text-red-500 lg:mx-0"
          >
            Delete
          </button>
          <button
            onClick={closeModal}
            className="mx-auto w-full rounded-lg px-4 py-2 text-lg font-medium capitalize text-neutral-700 hover:text-neutral-900 lg:mx-0"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
