import {useEffect, useState } from "react";
import Loged from "../components/ui/Logedpag";
import NotLoggedInPage from "../components/ui/Notloginpag";


const Console = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if(localStorage.getItem("token")){
      setIsLoggedIn(true);
      console.log("logged in");
    }
  }, []);

  return (
    <>
      {isLoggedIn ? <Loged /> : <NotLoggedInPage />}
    </>
  );
};

export default Console;