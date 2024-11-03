import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const blogStructure = {
  title: "",
  des: "",
  content: [],
  tag: [],
  author: { personal_info: {} },
  banner: "",
  publishedAt: "",
};

const BlogPage = () => {
  const { blog_id } = useParams();

  const [blog, setBlog] = useState(blogStructure);

  const {
    title,
    content,
    banner,
    author: {
      personal_info: { fullname, username, profile_img },
    },
    publishedAt,
  } = blog || {};

  const fetchBlog = () => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/get-blog", { blog_id })
      .then(({ data: { blog } }) => {
        setBlog(blog);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <div>{blog ? <h1>Blog Page - {blog.title}</h1> : <h1>Loading..</h1>}</div>
  );
};

export default BlogPage;
