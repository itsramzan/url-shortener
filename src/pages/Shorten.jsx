import React, { useState, useEffect } from "react";
import BannerFormLayout from "../components/Layout/BannerFormLayout";
import shortenSvg from "../assets/images/shorten.svg";
import { IoNewspaperOutline, IoLinkOutline } from "react-icons/io5";
import Form from "../components/Form/Form";
import FormHeading from "../components/Form/FormHeading";
import FormControll from "../components/Form/FormControll";
import FormLink from "../components/Form/FormLink";
import FormButton from "../components/Form/FormButton";
import { useShortenMutation } from "../features/url/urlApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Shorten = () => {
  const [uniqueText, setUniqueText] = useState("");
  const [fullUrl, setFullUrl] = useState("");

  const [shorten, { isLoading, data, error }] = useShortenMutation();

  const navigate = useNavigate();

  const handleShorten = (e) => {
    e.preventDefault();
    const data = { uniqueText, fullUrl };
    shorten(data);
  };

  useEffect(() => {
    if (data) {
      navigate("/list");
      toast.success(data?.message);
    }
    if (error?.data?.errors) {
      const errors = Object.entries(error.data.errors);
      toast.error(errors[0][1].msg);
    }
  }, [data, error, navigate]);

  return (
    <BannerFormLayout banner={shortenSvg}>
      <Form onSubmit={handleShorten}>
        <FormHeading text="Shorten Form" slogan="It's easy & free" />
        <FormControll
          type="text"
          text="Enter unique text"
          IconLeft={IoNewspaperOutline}
          value={uniqueText}
          onChange={(e) => setUniqueText(e.target.value)}
        />
        <FormControll
          type="text"
          text="Enter full url"
          IconLeft={IoLinkOutline}
          value={fullUrl}
          onChange={(e) => setFullUrl(e.target.value)}
        />
        <FormLink to="/list" text="See already shorten urls" />
        <FormButton text="Shorten" disabled={isLoading} />
      </Form>
    </BannerFormLayout>
  );
};

export default Shorten;
