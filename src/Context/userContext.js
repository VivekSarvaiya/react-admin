import axios from "axios";
import { createContext, useEffect, useRef, useState } from "react";

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({});

  const _authState = useRef(authState).current;

  const setUserAuthInfo = (id) => {
    axios
      .get(`http://localhost:8000/api/UserAllDetails/${id}/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("TOKEN")}` },
      })
      .then((res) => {
        console.log(res, "context");
        setAuthState(res.data?.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
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
  }, [_authState]);

  return (
    <Provider
      value={{
        authState,
        setAuthState: (userAuthInfo) => setUserAuthInfo(userAuthInfo),
      }}
    >
      {children}
    </Provider>
  );
};
export { AuthContext, AuthProvider };
