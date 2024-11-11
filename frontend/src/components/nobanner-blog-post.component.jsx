import { Link } from "react-router-dom";
import { getDay } from "../common/date";

const MinimalBlogPost = ({ blog, index }) => {
  let {
    title,
    blog_id: id,
    author: {
      personal_info: { fullname, username, profile_img },
    },
    publishedAt,
  } = blog;

  return (
    <Link
      to={`/blog/${id}`}
      className="flex gap-5 mb-8 p-5 rounded-lg bg-white shadow-md hover:scale-105 duration-300"
    >
      <h1 className="blog-index text-xl font-semibold text-gray-400">
        {index < 10 ? "0" + (index + 1) : index}
      </h1>

      <div>
        <div className="flex gap-2 items-center mb-4">
          <img
            src={profile_img}
            className="w-8 h-8 rounded-full"
            alt={`${fullname}'s profile`}
          />
          <p className="line-clamp-1 text-sm">
            {fullname} @{username}
          </p>
          <p className="min-w-fit text-xs">{getDay(publishedAt)}</p>
        </div>

        <h1 className="blog-title text-lg font-semibold">{title}</h1>
      </div>
    </Link>
  );
};

export default MinimalBlogPost;
