import { useEffect, useState } from "react";
import { getDocs, query, collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import { googleauth, googleprovider } from "./firebase";
import { signInWithPopup } from "firebase/auth";


function Header() {
    const [credentials, setCredentials] = useState([]);
    const [dispNameLog, setDispNameLog] = useState([]);
    const [buttonbool, setbuttonbool] = useState([]);
  
    useEffect(() => {
      if (credentials?.user?.displayName == "undefined") {
        setDispNameLog(credentials.user.displayName + "\n");
        setbuttonbool(true);
      } else {
        setDispNameLog("Login");
        setbuttonbool(false);
      }
    }, []);
  
    const loginwithgoogle = async () => {
      const credentials = await signInWithPopup(googleauth, googleprovider);
      setCredentials(credentials);
      console.log(credentials);
      setbuttonbool(true);
    };
    return (
      <div className="header">
        <a href="#default" class="logo">
          LeoPard
        </a>
        <div className="header-right">
          {credentials?.user?.displayName + "\n"}
          <button
            classname={buttonbool}
            disabled={buttonbool}
            onClick={loginwithgoogle}
          >
            {dispNameLog}
          </button>
        </div>
      </div>
    );
  }

export default Header;