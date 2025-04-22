import { getDay } from "../common/date";
import { Link } from "react-router-dom";

const BlogPostCard = ({ content, author }) => {
  let {
    publishedAt,
    tags,
    title,
    des,
    banner,
    activity: { total_likes },
    blog_id: id,
  } = content;

  let { fullname, profile_img, username } = author;
  return (
    <Link
      to={`/blog/${id}`}
      className="flex gap-8 items-center border-b border-grey dark:border-gray-700 pb-5 mb-4"
    >
      <div className="w-full">
        <div className="flex gap-2 items-center mb-7">
          <img
            src={profile_img}
            className="w-6 h-6 rounded-full"
            alt={`${fullname}'s profile`}
          />
          <p className="line-clamp-1 dark:text-gray-300">
            {fullname} @{username}
          </p>
          <p className="min-w-fit text-dark-grey dark:text-gray-400">{getDay(publishedAt)}</p>
        </div>

        <h1 className="blog-title dark:text-gray-100">{title}</h1>

        <p className="my-3 text-xl font-gelasio leading-7 hidden sm:block md:block line-clamp-2 dark:text-gray-300">
          {des}
        </p>

        <div className="flex gap-4 mt-7">
          <span className="btn-light py-1 px-4 dark:bg-gray-700 dark:text-gray-200">{tags[0]}</span>
          <span className="ml-3 flex items-center gap-2 text-dark-grey dark:text-gray-400">
            <i className="fi fi-rr-heart text-xl"></i>
            {total_likes}
          </span>
        </div>
      </div>
      <div className="h-28 aspect-square bg-grey dark:bg-gray-700">
        <img
          src={banner}
          className="w-full h-full aspect-square object-cover"
          alt={`${title} banner`}
        />
      </div>
    </Link>
  );
};

export default BlogPostCard;
