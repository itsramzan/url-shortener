import React, { useState, useEffect } from "react";
import BannerFormLayout from "../components/Layout/BannerFormLayout";
import registerSvg from "../assets/images/register.svg";
import {
  IoPersonOutline,
  IoMailOutline,
  IoLockClosedOutline,
  IoEyeOutline,
  IoEyeOffOutline,
} from "react-icons/io5";
import Form from "../components/Form/Form";
import FormHeading from "../components/Form/FormHeading";
import FormControll from "../components/Form/FormControll";
import FormLink from "../components/Form/FormLink";
import FormButton from "../components/Form/FormButton";
import { useRegisterMutation } from "../features/auth/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [register, { data, error }] = useRegisterMutation();

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const data = { username, email, password };
    register(data);
  };

  useEffect(() => {
    if (data) {
      navigate("/");
    }
    if (error?.data?.errors) {
      const errors = Object.entries(error.data.errors);
      toast.error(errors[0][1].msg);
    }
  }, [data, error, navigate]);

  return (
    <BannerFormLayout banner={registerSvg}>
      <Form onSubmit={handleRegister}>
        <FormHeading text="Register Form" slogan="It's easy & free" />
        <FormControll
          type="text"
          text="Enter your username"
          IconLeft={IoPersonOutline}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <FormControll
          type="email"
          text="Enter your email"
          IconLeft={IoMailOutline}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormControll
          type={showPassword ? "text" : "password"}
          text="Enter your password"
          IconLeft={IoLockClosedOutline}
          IconRight={showPassword ? IoEyeOutline : IoEyeOffOutline}
          passwordVisibility={showPassword}
          handlePasswordVisibility={setShowPassword}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormLink to="/login" text="Already have an account?" />
        <FormButton text="Register" />
      </Form>
    </BannerFormLayout>
  );
};

export default Login;
