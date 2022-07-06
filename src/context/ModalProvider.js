import { createContext, useState, useEffect } from "react";

const ModalContext = createContext({});

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <ModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
