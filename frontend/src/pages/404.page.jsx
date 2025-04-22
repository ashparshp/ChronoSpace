import { Link } from "react-router-dom";
import lightPageNotFoundImage from "../imgs/404-light.png";
import darkPageNotFoundImage from "../imgs/404-dark.png";
import lightFullLogo from "../imgs/logo-light.png";
import darkFullLogo from "../imgs/logo-dark.png";
import { ThemeContext } from "../App";
import { useContext } from "react";

const PageNotFound = () => {
  let { theme } = useContext(ThemeContext);

  return (
    <section className="h-cover relative p-10 flex flex-col items-center gap-20 text-center bg-white dark:bg-gray-900">
      <img
        src={theme == "light" ? darkPageNotFoundImage : lightPageNotFoundImage}
        className="select-none border-2 border-grey dark:border-gray-700 w-72 aspect-square object-cover rounded"
      />

      <h1 className="text-4xl font-gelasio leading-7 dark:text-gray-100">Page not found</h1>
      <p className="text-dark-grey dark:text-gray-400 text-xl leading-7 -mt-12">
        The page you are looking for does not exists. Head back to the{" "}
        <Link to="/" className="text-black dark:text-white underline">
          home page
        </Link>
      </p>

      <div className="mt-auto">
        <img
          src={theme == "light" ? darkFullLogo : lightFullLogo}
          className="h-9 object-contain block mx-auto select-none"
        />
        <p className="mt-3 text-dark-grey dark:text-gray-400">
          Read millions of stories around the world
        </p>
      </div>
    </section>
  );
};

export default PageNotFound;
