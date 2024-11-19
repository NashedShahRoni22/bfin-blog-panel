export default function UpdateModal({ closeModal, category }) {
  return (
    <div className="inline-block w-full rounded-lg bg-white pb-6 pt-4 shadow-2xl md:w-[27.5rem]">
      <p className="mb-6 border-b pb-2 text-center text-xl font-medium">
        Edit Category Name
      </p>

      <p className="mb-6 px-4 leading-relaxed text-neutral-600">
        The current name is{" "}
        <span className="font-semibold text-neutral-800">{category}</span>.{" "}
        <br />
        Enter the new name below to update it.
      </p>

      <form className="px-4">
        <input
          type="text"
          name="newCategory"
          id="newCategory"
          placeholder="New Name"
          required
          className="mb-6 mt-2 w-full rounded-lg border border-gray-400 bg-subtle-white px-4 py-2 outline-none"
        />

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="mx-auto w-full rounded-lg border border-[#DEE8F7] bg-[#EFF4FB] px-4 py-2 text-lg font-medium capitalize text-[#6B98DB] transition-all duration-200 ease-linear hover:border-[#9CBAE7] hover:bg-[#DEE8F7] hover:text-primary lg:mx-0"
          >
            Update
          </button>

          <button
            onClick={closeModal}
            className="mx-auto w-full rounded-lg px-4 py-2 text-lg font-medium capitalize text-neutral-700 hover:text-neutral-900 lg:mx-0"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
