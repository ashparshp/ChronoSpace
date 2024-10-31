import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserAuthForm from "./pages/userAuthForm.page";
import { useEffect, createContext, useState } from "react";
import { lookInSession } from "./common/session";
import Editor from "./pages/editor.pages";

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
        <Route path="/" element={<Navbar />}>
          <Route path="signin" element={<UserAuthForm formType="sign-in" />} />
          <Route path="signup" element={<UserAuthForm formType="sign-up" />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
