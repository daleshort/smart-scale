import axios, { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useAuth0 } from "@auth0/auth0-react";

const audience = "https://quickstarts/api";
const scope = "edit:foods";

const useAxiosAuth0 = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
        async (config) => {

          if (!config.headers["Authorization"]) {
            const accessToken = await getAccessTokenSilently({
              audience: audience,
              scope: scope,
            });
            config.headers["Authorization"] = `Bearer ${accessToken}`;
            return config;
          }
          return config;
      },
      (error) => {Promise.reject(error)
      console.error(error)}
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
    };
  }, [user, isAuthenticated]);

  return axiosPrivate;
};

export default useAxiosAuth0;
