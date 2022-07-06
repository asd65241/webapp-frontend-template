import { useContext, useDebugValue } from "react";
import ModalContext from "../context/ModalProvider";

const useModal = () => {
    const { isModalOpen, setIsModalOpen} = useContext(ModalContext);
    return useContext(ModalContext);
}

export default useModal;