import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserAuthForm from "./pages/userAuthForm.page";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route path="signin" element={<UserAuthForm formType="sign-in"/>} />
        <Route path="signup" element={<UserAuthForm formType="sign-up"/>} />
      </Route>
    </Routes>
  );
};

export default App;
