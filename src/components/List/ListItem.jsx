import React from "react";
import {
  IoCalendarOutline,
  IoCopyOutline,
  IoCreateOutline,
  IoTrashBinOutline,
} from "react-icons/io5";
import moment from "moment";
import { toast } from "react-toastify";
import copyToClipboard from "../../utils/copyToClipboard";
import { useDeleteUrlMutation } from "../../features/url/urlApi";

const ListItem = ({ item, index, isOpen, setIsOpen, setItemForUpdate }) => {
  const { _id, uniqueText, fullUrl, createdAt } = item || {};
  const shortUrl = `${process.env.REACT_APP_API_URL}url/${uniqueText}`;

  const [deleteUrl] = useDeleteUrlMutation();

  const handleCopying = async () => {
    await copyToClipboard(shortUrl);
    toast.success("Successfully copied!");
  };

  const handleDeleteUrl = () => {
    if (window.confirm("Are you sure to delete?")) {
      deleteUrl({ id: _id });
    }
  };

  const handleSetIsOpen = () => {
    setItemForUpdate(item);
    setIsOpen(!isOpen);
  };

  return (
    <div
      key={item.id}
      className={`p-4 space-y-2 rounded-md relative ${
        index === 0 ? "bg-blue-300" : "bg-blue-100"
      }`}
    >
      <h3 className="font-semibold line-clamp-1">{uniqueText}</h3>
      <p className="text-sm line-clamp-1">{fullUrl}</p>
      <p className="text-sm line-clamp-1">{shortUrl}</p>
      <p className="text-sm  flex items-center gap-2">
        <IoCalendarOutline />
        {moment(new Date(createdAt).getTime()).format("MMM Do YY")}
      </p>

      <div className="flex justify-end items-center gap-4 cursor-pointer">
        <IoCopyOutline onClick={handleCopying} />
        <IoCreateOutline onClick={handleSetIsOpen} />
        <IoTrashBinOutline onClick={handleDeleteUrl} />
      </div>
    </div>
  );
};

export default ListItem;
