import { Link } from "react-router-dom";

export default function BlogCard({ blog }) {
  return (
    <div className="rounded border">
      <Link to="/">
        <img src={blog.image} alt="" className="rounded-t border-b" />
      </Link>
      <div className="px-4 py-6 text-gray-600">
        <Link to="/" className="text-xl font-semibold text-black">
          {blog.title}
        </Link>
        <p className="mb-4 mt-1">{blog.date}</p>
        <p>{blog.description}</p>
        <Link to="/" className="text-electricViolet mt-4 inline-block">
          Read More
        </Link>
      </div>
    </div>
  );
}
