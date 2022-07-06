import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        // Reset local storage
        setAuth({});
    }

    return logout;
}

export default useLogout