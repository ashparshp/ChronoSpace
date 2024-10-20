import { useRef } from "react";
import AnimationWrapper from "../common/page-animation";
import InputBox from "../components/input.component";
import googleIcon from "../imgs/google.png";
import { Link } from "react-router-dom";
const UserAuthForm = ({ formType }) => {

  const authForm =  useRef();

  const handleSubmit = (e) => {

    e.preventDefault();

    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    // formData
    let form = new FormData(authForm.current);
    let formData = {};

    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }

   // form validation

    let { fullname, email, password } = formData;

    if(fullname){
      if (fullname.length < 3) {
        return console.log({ "error": "Fullname must be at least 3 characters long" });
      }
    }

  if (!email.length) {
    return console.log({ "error": "Email is required" });
  }

  if (!emailRegex.test(email)) {
    return console.log({ "error": "Invalid email" });
  }

  if (!passwordRegex.test(password)) {
    return console.log({
      "error":
        "Password must be at least 6 characters long, and contain at least one uppercase letter, one lowercase letter, and one number",
    });
  } 

  }




  return (
    <AnimationWrapper keyValue={formType}>
        <section className="h-cover flex items-center justify-center">
        <form ref={authForm} className="w-[80%] max-w-[400px]" action="">
          <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
            {formType === "sign-in" ? "Welcome back!" : "Create an account"}
          </h1>

          {formType != "sign-in" ? (
            <InputBox
              name="fullname"
              type="text"
              placeholder="Full Name"
              icon="fi-rr-user"
            />
          ) : (
            ""
          )}

          <InputBox
            name="email"
            type="email"
            placeholder="Email"
            icon="fi-rr-envelope"
          />

          <InputBox
            name="password"
            type="password"
            placeholder="Password"
            icon="fi-rr-lock"
          />

          <button className="btn-dark center mt-14" type="submit"

          onClick={handleSubmit}

          >
            {formType.replace("-", " ")}
          </button>

          <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
            <hr className="w-1/2 border-black" />
            <p>or</p>
            <hr className="w-1/2 border-black" />
          </div>

          <button className="btn-dark flex items-center justify-center gap-4 w-[90%] center">
            <img src={googleIcon} className="w-5" />
            Continue with Google
          </button>

          {
            formType === "sign-in" ?
            <p className="mt-6 text-dark-grey text-xl text-center">
              Don't have an account?
              <Link to="/signup" className="underline text-black text-xl ml-1">
              Join us today
              </Link>
            </p>
          
          : 
          <p className="mt-6 text-dark-grey text-xl text-center">
              Already have an account?
              <Link to="/signin" className="underline text-black text-xl ml-1">Sign in here.</Link>
            </p>
          }
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default UserAuthForm;
