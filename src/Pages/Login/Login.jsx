import { useState } from "react";
import { PiEye, PiEyeClosed } from "react-icons/pi";
import bfinitLogo from "../../assets/logo/bfinit-logo.png";
import shapes1 from "../../assets/shapes/shapes-1.png";
import rectangle from "../../assets/shapes/rectangle.png";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const url = "https://api.blog.bfinit.com/api/v1/login";
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);

  // Submit Login Form
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    if (email && password) {
      fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            localStorage.setItem("bfinitBlogAccessToken", data.data.token);
            navigate("/dashboard");
          } else {
            alert(data.message);
          }
        });
    }
  };

  return (
    <section className="flex min-h-screen flex-col font-nunito-sans md:mx-auto md:max-w-[1536px] md:flex-row lg:gap-x-6">
      {/* Login Form Container */}
      <div className="flex h-screen max-h-[1080px] w-full flex-col justify-center p-5 text-neutral-900 md:w-1/2">
        <img src={bfinitLogo} alt="bfinit logo" className="w-24" />
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex flex-1 flex-col justify-center md:w-3/4"
        >
          <h1 className="text-center text-4xl font-bold md:text-left">
            Welcome Back!
          </h1>
          <p className="mb-10 mt-1.5 text-center text-lg font-medium text-neutral-700 md:text-left">
            Please Log in to your account.
          </p>

          <label htmlFor="email" className="capitalize text-neutral-700">
            email address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className="mb-6 mt-1.5 w-full rounded-lg border px-4 py-2 outline-none"
          />

          <div className="flex w-full items-end justify-between text-neutral-700">
            <label htmlFor="password" className="capitalize">
              password
            </label>
            <p
              onClick={() => setShowPass(!showPass)}
              className="flex cursor-pointer items-center gap-1"
            >
              {showPass ? (
                <>
                  <PiEyeClosed className="text-xl" />
                  <span className="text-sm">Hide</span>
                </>
              ) : (
                <>
                  <PiEye className="text-xl" />
                  <span className="text-sm">Show</span>
                </>
              )}
            </p>
          </div>
          <input
            type={showPass ? "text" : "password"}
            name="password"
            id="password"
            required
            className="mb-6 mt-1.5 w-full rounded-lg border px-4 py-2 outline-none"
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-primary px-4 py-2 text-xl font-semibold text-white"
          >
            Log in
          </button>
        </form>
      </div>

      {/* Right Side Banner Container */}
      <div className="relative hidden h-screen max-h-[1080px] w-full flex-col items-center justify-center overflow-hidden bg-[#4a3aff] px-5 md:flex md:w-1/2">
        <h2 className="text-center text-4xl font-bold text-white">
          Effortless Blog Management
        </h2>
        <p className="mt-6 max-w-xl text-center text-lg text-neutral-200">
          Take control of your Blogging journey with an intuitive and powerful
          Dashboard. Add, edit and manage your Blog posts seamlessly, all in one
          place.
        </p>

        <img
          src={shapes1}
          alt=""
          className="absolute -top-20 left-0 w-40 rotate-90"
        />
        <img
          src={rectangle}
          alt=""
          className="absolute -right-10 bottom-0 w-32 -rotate-90"
        />
      </div>
    </section>
  );
}
