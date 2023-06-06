import logo from "./img/logo.png";
import "./App.css";
import "./css/header.css";
import "./firebase.jsx";
import { useEffect, useState } from "react";
import { getDocs, query, collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import { googleauth, googleprovider } from "./firebase";
import { signInWithPopup } from "firebase/auth";
// import firebase from 'firebase';
// import Header from "./header.jsx";

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState([]);
  const credentialslog = Header.credentials;

  const haalDocumentenOp = () => {
    const p = query(collection(db, "posts"));
    const l = query(collection(db, "accounts"));
    getDocs(p).then((firebaseResponse) => {
      const lijstVanDocumenten = firebaseResponse.docs.map((doc) => doc.data());
      setPosts(lijstVanDocumenten);
    });
  };

  // const [curr , setCurr] = useState('');

  // // Function to get time and date
  // const getDate = () => {
  //     const a = firebase.firestore
  //         .Timestamp.now().toDate().toString();
  //     setCurr(a);
  // }

  const toevoegenDoc = async () => {
    await addDoc(collection(db, "posts"), { title: title, desc: "Test" });
  };
  useEffect(() => {
    haalDocumentenOp();
  }, []);
  posts.map((post) => {
    const pic = "./img/posts/" + post.foto;
  });

  return (
    <div className="App">
      <header className="App-header">
        <div class="main">
          <div>
            {<Header />}
            <input
              type="text"
              placeholder="Title"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            ></input>
            <button onClick={toevoegenDoc}>Add</button>
            {/* {credentials?.user?.displayName + "\n" } */}

            {/* <div className="friend-list"></div> */}
          </div>
          <div className="view-feed">
            <div className="prepost">
              <div>
                {posts.map((post) => {
                  return (
                    <div className="post">
                      {post.title}
                      {post.desc}
                      <div className="pic">{post.picture}</div>

                      <div className="footer">{post.date}</div>

                      {/* <img href={pic} alt="Post"/> */}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

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

export default App;
