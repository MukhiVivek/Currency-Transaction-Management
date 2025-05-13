import { useEffect, useState } from "react";
import NotLoggedInPage from "../components/ui/Notloginpag";
import Logged from "../components/ui/Logedpag";

const Console = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // null = not yet checked

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      console.log("Logged in");
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  if (isLoggedIn === null) {
    return <div className="text-center p-6 text-gray-500 dark:text-gray-400">Checking login status...</div>;
  }

  return (
    <>
      {isLoggedIn ? <Logged /> : <NotLoggedInPage />}
    </>
  );
};

export default Console;
