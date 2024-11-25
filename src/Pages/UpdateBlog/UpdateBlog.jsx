import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { FaCloudUploadAlt, FaRegTrashAlt } from "react-icons/fa";
import { TbPhotoPlus } from "react-icons/tb";
import { BsFillInfoCircleFill } from "react-icons/bs";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";

export default function AddBlogs() {
  const { id } = useParams();
  const accessToken = localStorage.getItem("bfinitBlogAccessToken");
  const thumbnailRef = useRef();
  const [blogDetails, setBlogDetails] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedThumbnail, setSelectedThumbnail] = useState("");
  const [details, setDetails] = useState("");

  // Fetch Currently Selected Blog
  useEffect(() => {
    fetch(`https://api.blog.bfinit.com/api/v1/single_blog_view/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setBlogDetails(data.data);
          setDetails(data.data.content);
        }
      });
  }, [id]);

  // Modules for ReactQuill (toolbar options)
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  // Formats supported by the Quill editor
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  // Update selectedThumbnail image
  const handleThumbnail = (e) => {
    const image = e.target.files?.[0];
    if (image) {
      setSelectedThumbnail(URL.createObjectURL(image));
    }
  };

  // Delete selectedThumbnail image & reset previously selected image
  const deleteThumbnail = () => {
    setSelectedThumbnail("");
    // reset previously selected thumbnail
    if (thumbnailRef.current) {
      thumbnailRef.current.value = "";
    }
  };

  // Handle Add New Blog Form Submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const customURL = form.customURL.value;
    const category = form.category.value;
    const thumbnailFile = form.thumbnail.files?.[0];

    if (!selectedThumbnail) {
      return alert("Please Select Image");
    }

    if (thumbnailFile.size > 2 * 1024 * 1024) {
      return alert("Image must be less than 2 MB");
    }

    if (!details) {
      return alert("Please Add Blog Details");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("custom_url", customURL);
    formData.append("category_id", category);
    formData.append("content", details);
    formData.append("thumbnail", thumbnailFile);
    formData.append("status", 0);

    fetch("https://api.blog.bfinit.com/api/v1/blogs", {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}` },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
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
          setCategories(data.data);
        } else {
          alert(data.message);
        }
      });
  }, [accessToken]);

  console.log(blogDetails);

  return (
    <section className="h-screen w-full overflow-y-auto px-5 py-5 lg:px-10">
      <h1 className="border-b pb-3 text-2xl font-semibold text-neutral-800">
        Update Blog
      </h1>
      <form onSubmit={handleFormSubmit}>
        <div className="flex w-full flex-col gap-8 py-6">
          {/* Image Upload Container */}
          <div className="h-44 flex-col items-center justify-center rounded-lg border border-dashed border-primary/40 text-neutral-400">
            <div className="group relative h-full w-full">
              <img
                src={blogDetails?.thumbnail_url}
                alt=""
                loading="lazy"
                className="h-full w-full object-contain"
              />

              {/*Add & Delete Button Overlay */}
              <div className="absolute left-0 top-0 hidden h-full w-full items-center justify-center gap-x-6 bg-black/50 group-hover:flex">
                {/* add new image button */}
                <label
                  htmlFor="thumbnail"
                  className="flex cursor-pointer items-center gap-1.5 rounded-md border border-primary bg-primary px-2.5 py-1.5 text-sm font-medium text-white transition-all hover:bg-primary-hover"
                >
                  <TbPhotoPlus className="text-base" /> <span>New Image</span>
                </label>
                {/* delete image button */}
                <button
                  onClick={deleteThumbnail}
                  className="flex items-center gap-1.5 rounded-md border border-red-400 bg-red-50 px-2.5 py-1.5 text-sm font-medium text-red-500 transition-all hover:bg-red-100"
                >
                  <FaRegTrashAlt className="text-base" /> <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
          {/* Image Upload input tag Default Hidden */}
          <input
            ref={thumbnailRef}
            type="file"
            name="thumbnail"
            id="thumbnail"
            accept="image/*"
            onChange={handleThumbnail}
            className="hidden"
          />

          {/* Title and Category Container */}
          <div className="flex w-full flex-col">
            <label htmlFor="title" className="font-medium text-neutral-700">
              Blog Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              id="title"
              defaultValue={blogDetails?.title}
              required
              className="mb-6 mt-2 w-full rounded-lg border border-gray-400 px-4 py-2 outline-none"
            />
            {/* Custom URL Filled */}
            <label htmlFor="customURL" className="font-medium text-neutral-700">
              Custom URL <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="customURL"
              id="customURL"
              defaultValue={blogDetails?.custom_url}
              required
              className="mb-6 mt-2 w-full rounded-lg border border-gray-400 px-4 py-2 outline-none"
            />
            <label htmlFor="category" className="font-medium text-neutral-700">
              Choose Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              id="category"
              required
              className="mt-2 w-full rounded-lg border border-gray-400 px-4 py-2 outline-none"
            >
              {categories &&
                categories?.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                    selected={category.id == blogDetails?.category_id}
                  >
                    {category.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Blog Details Container */}
          <div>
            <label className="mb-2 block font-medium text-neutral-700">
              Details <span className="text-red-500">*</span>
            </label>
            <ReactQuill
              theme="snow"
              value={details}
              onChange={setDetails}
              modules={modules}
              formats={formats}
            />
          </div>

          <button
            type="submit"
            className="rounded-lg bg-primary px-4 py-2 text-lg font-medium text-white"
          >
            Upload
          </button>
        </div>
      </form>
    </section>
  );
}
