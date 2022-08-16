import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();
 
  const refresh = async () => {
    const response = await axios.post("/auth/jwt/refresh/",{refresh:auth.refreshToken} );
     setAuth((prev) => {
       console.log(prev);
       console.log(response.data.access);
       return { ...prev, accessToken: response.data.access };
     });
    return response.data.access;
  };
  return refresh;
};
export default useRefreshToken;
