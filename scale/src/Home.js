import React from "react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import Profile from "./Profile";
import { useAuth0 } from "@auth0/auth0-react";
import useAxiosAuth0 from "./hooks/useAxiosAuth0";


function Home() {
  const { isLoading, error, getAccessTokenSilently} = useAuth0();
  const axiosPrivate = useAxiosAuth0();

  const testAuth = () => {
    const controller = new AbortController();
    console.log("button clicked");

    const getMsg = async () => {
      try {
        const response = await axiosPrivate.get("api/private-scoped", {
          signal: controller.signal,
        });
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    getMsg();
  };

  return (
    <div>
      {error && <div>auth error</div>}
      {!error && isLoading && <div>Loading...</div>}
      {!error && !isLoading && (
        <>
          <LoginButton />
          <LogoutButton />
          <Profile />
          <button
            onClick={() => {
              testAuth();
            }}
          >
            test authenticaed
          </button>
        </>
      )}
    </div>
  );
}

export default Home;
