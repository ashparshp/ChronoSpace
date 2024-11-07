import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserAuthForm from "./pages/userAuthForm.page";
import { useEffect, createContext, useState } from "react";
import { lookInSession } from "./common/session";
import Editor from "./pages/editor.pages";
import HomePage from "./pages/home.page";
import SearchPage from "./pages/search.page";
import PageNotFound from "./pages/404.page";
import ProfilePage from "./pages/profile.page";
import BlogPage from "./pages/blog.page";
import SideNav from "./components/sidenavbar.component";

export const UserContext = createContext({});

const App = () => {
  const [userAuth, setUserAuth] = useState({});

  useEffect(() => {
    const userInSession = lookInSession("user");
    setUserAuth(
      userInSession
        ? (() => {
            try {
              return JSON.parse(userInSession);
            } catch {
              return { access_token: null };
            }
          })()
        : { access_token: null }
    );
  }, []);

  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      <Routes>
        <Route path="/editor" element={<Editor />} />
        <Route path="/editor/:blog_id" element={<Editor />} />
        <Route path="/" element={<Navbar />}>
          <Route index element={<HomePage />} />
          <Route path="settings" element={<SideNav />}>
            <Route path="edit-profile" element={<h1>Edit Profile</h1>} />
            <Route path="change-password" element={<h1>Change Password</h1>} />
          </Route>
          <Route path="signin" element={<UserAuthForm formType="sign-in" />} />
          <Route path="signup" element={<UserAuthForm formType="sign-up" />} />
          <Route path="search/:query" element={<SearchPage />} />
          <Route path="user/:id" element={<ProfilePage />} />
          <Route path="blog/:blog_id" element={<BlogPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
