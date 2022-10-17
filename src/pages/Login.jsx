import React, { useState, useEffect } from "react";
import BannerFormLayout from "../components/Layout/BannerFormLayout";
import loginSvg from "../assets/images/login.svg";
import {
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
import { useLoginMutation } from "../features/auth/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { data, error }] = useLoginMutation();

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const data = { email, password };
    login(data);
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
    <BannerFormLayout banner={loginSvg}>
      <Form onSubmit={handleLogin}>
        <FormHeading text="Login Form" slogan="It's easy & free" />
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
        <FormLink to="/register" text="Havn't an account yet?" />
        <FormButton text="Login" />
      </Form>
    </BannerFormLayout>
  );
};

export default Login;
