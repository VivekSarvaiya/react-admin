import axios from "axios";
import { createContext, useEffect, useRef, useState } from "react";

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({});
  const [authflag, setAuthflag] = useState(true);
  const _authState = useRef(authState).current;

  // const setUserAuthInfo = (id) => {
  //   console.log(id);
  //   axios
  //     .get(`http://localhost:8000/api/UserAllDetails/${id}/`, {
  //       headers: { Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
  //     })
  //     .then((res) => {
  //       console.log(res, "context");
  //       setAuthState(res.data?.message);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const setAuthStateflag = (flag) => {
    console.log(flag);
    setAuthflag(flag);
  };

  const refreshToken = async () => {
    axios
      .post(
        `http://localhost:8000/api/token/refresh/`,
        {
          refresh: localStorage.getItem("REFRESH")
        }
      )
      .then((res) => {
        console.log(res, "Refresh");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUserData = async () => {
    axios
      .get(
        `http://localhost:8000/api/AdminDetail/${localStorage.getItem(
          "USERID"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
          },
        }
      )
      .then((res) => {
        console.log(res, "context");
        setAuthState(res.data);
      })
      .catch((err) => {
        console.log(err);
        refreshToken()
      });
  };
  useEffect(() => {
    console.log(authflag, "authflag");
    getUserData();
  }, [authflag]);

  return (
    <Provider
      value={{
        authState,
        // setAuthState: (userAuthInfo) => setUserAuthInfo(userAuthInfo),
        setAuthflag: (flag) => setAuthStateflag(flag),
        authflag,
      }}
    >
      {children}
    </Provider>
  );
};
export { AuthContext, AuthProvider };
