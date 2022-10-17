import React, { useEffect, useState } from "react";
import Modal from "../UI/Modal";
import Form from "../Form/Form";
import FormHeading from "../Form/FormHeading";
import FormControll from "../Form/FormControll";
import FormButton from "../Form/FormButton";
import { IoNewspaperOutline, IoLinkOutline } from "react-icons/io5";
import { useUpdateUrlMutation } from "../../features/url/urlApi";
import { toast } from "react-toastify";

const ListUpdateModal = ({ page, isOpen, setIsOpen, itemForUpdate }) => {
  const { _id, uniqueText: uText, fullUrl: fUrl } = itemForUpdate || {};

  const [uniqueText, setUniqueText] = useState("");
  const [fullUrl, setFullUrl] = useState("");

  useEffect(() => {
    if (uText && fUrl) {
      setUniqueText(uText);
      setFullUrl(fUrl);
    }
  }, [uText, fUrl]);

  const [updateUrl, { isSuccess, isError, error }] = useUpdateUrlMutation();

  const handleUpdate = (e) => {
    e.preventDefault();
    const data = { uniqueText, fullUrl };
    updateUrl({ id: _id, data, page });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("URL successfully updated!");
      setIsOpen(false);
    }
  }, [isSuccess, setIsOpen]);

  useEffect(() => {
    if (isError) {
      if (error?.data?.errors) {
        const errors = Object.entries(error.data.errors);
        toast.error(errors[0][1].msg);
      } else {
        toast.error("Something went wrong!");
      }
    }
  }, [isError, error]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={handleUpdate}>
        <FormHeading text="Update Form" slogan="It's easy & free" />
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
        <FormButton text="Update" />
      </Form>
    </Modal>
  );
};

export default ListUpdateModal;
