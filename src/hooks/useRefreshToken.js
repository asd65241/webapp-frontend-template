import axios from "../api/axios";
import useAuth from "./useAuth";
import endpoints from "../api/endpoints";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    const res = await axios.get(endpoints.REFRESH_URL, {
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + auth?.token,
      },
    });
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(res?.data);
      return {
        ...prev,
        ...res?.data,
      };
    });
    return res?.data.token;
  };
  return refresh;
};

export default useRefreshToken;
