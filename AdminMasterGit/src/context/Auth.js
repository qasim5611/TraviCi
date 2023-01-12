import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import ApiConfig from "src/Config/APIconfig";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";


export const AuthContext = createContext();

const setSession = (accessToken) => {
  if (accessToken) {
    sessionStorage.setItem("creatturAccessToken", accessToken);
    axios.defaults.headers.common.Authorization = `Creattur ${accessToken}`;
  } else {
    sessionStorage.removeItem("creatturAccessToken");
    delete axios.defaults.headers.common.Authorization;
  }
};

function checkLogin() {
  const accessToken = window.sessionStorage.getItem("creatturAccessToken");
  return accessToken ? true : false;
}

export default function AuthProvider(props) {
  const history = useHistory();

  const [isLogin, setIsLogin] = useState(checkLogin());
  const [userData, setUserData] = useState({});

  const accessToken = window.sessionStorage.getItem("creatturAccessToken");

  const getProfileHandler = async (accessToken) => {
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.getProfile,
        headers: {
          token: sessionStorage.getItem("creatturAccessToken"),
        },

      })
      if (res.data.response_code === 200) {
        setUserData(res.data.result)
      } else if (res.data.response_code === 404) {
        sessionStorage.removeItem("creatturAccessToken")
        sessionStorage.removeItem("tokenNew")
        history.push('/')
      } else {
        sessionStorage.removeItem("creatturAccessToken")
        sessionStorage.removeItem("tokenNew")
        history.push('/')

        // toast.error(response.data.response_message)
      }

    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    if (accessToken) {
      getProfileHandler(accessToken)
    }
  }, [accessToken])



  let data = {
    userLoggedIn: isLogin,
    userData,
    getProfileHandler: () => getProfileHandler()
    ,
    userLogIn: (type, data) => {
      setSession(data);
      setIsLogin(type);
    },
  };

  return (
    <AuthContext.Provider value={data}>{props.children}</AuthContext.Provider>
  );
}
