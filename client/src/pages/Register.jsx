import React, { useState, useEffect } from "react";
import { RiEyeLine, RiEyeCloseLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import toast from "react-hot-toast";
import { useRegister } from "../hooks/useRegister";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const { register, isLoading, error } = useRegister();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const randomString = Math.random().toString(36).substr(2, 5);
    const generatedUsername = `${name.replace(
      /\s/g,
      ""
    )}_${randomString}`.toLowerCase();

    const result = await register(
      name,
      generatedUsername,
      email,
      password,
      profileImage
    );

    if (result.success) {
      toast.success(`Username: ${generatedUsername}`);
      navigate("/home");
    } else {
      toast.error(result.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const maxWidth = 800;
        const maxHeight = 800;
        let { width, height } = img;

        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        const resizedDataUrl = canvas.toDataURL("image/jpeg", 0.7);
        setProfileImage(resizedDataUrl);
      };
    };
    reader.onerror = (error) => {
      toast.error("Couldn't convert your profile image");
    };
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="h-screen w-screen bg-background-100 flex justify-center items-center">
      <div className="bg-background-100 w-4/12 flex items-center justify-center gap-16 rounded-xl overflow-hidden">
        <form
          className="w-full bg-[#121212] px-16 py-16 lg:py-20"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center justify-center font-semibold gap-0.5 text-3xl lg:text-4xl">
            <h1 className="text-white">C</h1>
            <img src={Logo} alt="Logo" className="h-9 w-auto" />
            <h1 className="text-white">dePencil</h1>
          </div>
          <h2 className="text-3xl font-bold text-center my-8 mb-16 text-secondary-100">
            Sign Up
          </h2>
          <div className="mb-7">
            <label
              htmlFor="name"
              className="input input-bordered flex items-center gap-5 text-md mb-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="grow placeholder:text-gray-500"
              />
            </label>
          </div>
          <div className="mb-7">
            <label
              htmlFor="email"
              className="input input-bordered flex items-center gap-5 text-md mb-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="email"
                id="email"
                placeholder="johndoe@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="grow placeholder:text-gray-500"
              />
            </label>
          </div>
          <div className="mb-7 relative">
            <label
              htmlFor="password"
              className="input input-bordered flex items-center gap-5 text-md mb-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="example@123"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="grow placeholder:text-gray-500"
              />
            </label>

            <button
              type="button"
              className="absolute top-4 right-3 text-gray-400 focus:outline-none"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <RiEyeCloseLine /> : <RiEyeLine />}
            </button>
          </div>
          <div className="mb-7 relative">
            <label
              htmlFor="confirmPassword"
              className="input input-bordered flex items-center gap-5 text-md mb-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="example@123"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="grow placeholder:text-gray-500"
              />
            </label>

            <button
              type="button"
              className="absolute top-4 right-3 text-gray-400 focus:outline-none"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? <RiEyeCloseLine /> : <RiEyeLine />}
            </button>
          </div>
          <div className="mb-7">
            <label
              htmlFor="profileImage"
              className="input input-bordered flex items-center gap-5 text-md mb-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M13.5 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h11ZM2 2v12h12V2H2Z"
                  clipRule="evenodd"
                />
                <path d="M4 5.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5ZM4.5 7a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7ZM4 9.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5ZM8 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Z" />
              </svg>
              <input
                type="file"
                id="profileImage"
                onChange={handleImageChange}
                className="grow placeholder:text-gray-500"
                accept="image/*"
              />
            </label>
          </div>
          <div className="text-md flex gap-2 mt-16">
            <h1>Already a developer at CodePencil?</h1>
            <Link to="/sign-in" className="text-blue-500 underline font-bold">
              Sign In
            </Link>
          </div>
          <button
            type="submit"
            className="btn btn-primary border-0 w-full mt-5 bg-secondary-100 text-white py-3 rounded-lg font-semibold"
            disabled={isLoading}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
