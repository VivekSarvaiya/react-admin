import axios from "axios";
import { createContext, useEffect, useRef, useState } from "react";

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({});

  const _authState = useRef(authState).current;

  const setUserAuthInfo = (data) => {
    // console.log(data.data.token, "setauth");
    // localStorage.setItem("UID", data.userId);
    // localStorage.setItem("TOKEN", data.token);

    // axios
    //   .get("http://localhost:4000/api/auth/getUserDetails", {
    //     headers: { Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     setAuthState(res.data?.message);
    //     localStorage.setItem("Line", res.data?.message?.Line);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  // checks if the user is authenticated or not
  const isUserAuthenticated = () => {
    if (!localStorage.getItem("TOKEN")) {
      return false;
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/getUserDetails`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("TOKEN"),
            },
          }
        );
        // console.log(res.data.message);
        setAuthState(res.data?.message);
      } catch (error) {
        console.error(error);
      }
    };

    // if (localStorage.getItem("TOKEN")) {
    //   getUserData();
    // }
  }, [_authState]);

  return (
    <Provider
      value={{
        authState,
        setAuthState: (userAuthInfo) => setUserAuthInfo(userAuthInfo),
        isUserAuthenticated,
      }}
    >
      {children}
    </Provider>
  );
};
export { AuthContext, AuthProvider };
