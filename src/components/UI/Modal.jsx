import React from "react";
import ReactModal from "react-modal";
import { IoClose } from "react-icons/io5";

const customStyles = {
  content: {
    width: "30%",
    padding: "0",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

ReactModal.setAppElement("#root");

const Modal = ({ isOpen, setIsOpen, children }) => {
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <div className="w-full relative p-4">
        <IoClose
          onClick={closeModal}
          className="absolute top-2 right-2 text-xl cursor-pointer"
        />
        {children}
      </div>
    </ReactModal>
  );
};

export default Modal;
