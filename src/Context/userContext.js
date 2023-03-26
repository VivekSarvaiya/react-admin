import axios from "axios";
import { createContext, useEffect, useRef, useState } from "react";

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({});
  const [authflag, setAuthflag] = useState(false)
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

  useEffect(() => {
    console.log(authflag);
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
        });
    };
    getUserData();
  }, [authflag]);

  return (
    <Provider
      value={{
        authState,
        // setAuthState: (userAuthInfo) => setUserAuthInfo(userAuthInfo),
        setAuthflag,
        authflag
      }}
    >
      {children}
    </Provider>
  );
};
export { AuthContext, AuthProvider };
