import "./App.css";
import "./css/header.css";
import "./firebase.jsx";
import "./header.jsx";
import { useEffect, useState } from "react";
import {
  getDocs,
  query,
  collection,
  addDoc,
  deleteDoc,
  doc,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase";
import { googleauth, googleprovider } from "./firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";

function App() {
  const [posts, setPosts] = useState([]);
  const haalDocumentenOp = () => {
    const p = query(collection(db, "posts"), orderBy("title", "asc"));
    const l = query(collection(db, "accounts"));
    getDocs(p).then((firebaseResponse) => {
      const lijstVanDocumenten = firebaseResponse.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPosts(lijstVanDocumenten);
    });
  };

  useEffect(() => {
    haalDocumentenOp();
  }, []);

  function refreshPage() {
    console.log(Header.user?.uid);
    window.location.reload(false);
  }
  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    console.log(postDoc);
    await deleteDoc(postDoc);
    haalDocumentenOp();
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="main">
          <div>
            {<Header />}
            {/* {credentials?.user?.displayName + "\n" } */}

            {/* <div className="friend-list"></div> */}
          </div>
          <div className="flex">
            <div className="view-feed">
              <button className="refresh" onClick={refreshPage}>
                Click to refresh!
              </button>

              <div>
                <div className="prepost">
                  <div>
                    {posts.map((post) => {
                      return (
                        <div className="post">
                          <h3>{post.title}</h3>
                          <h4>{post.displayName} </h4>
                          <p>{post.desc}</p>
                          <div className="footer">
                            {post.date} {post.uid}
                          </div>
                          <div>
                            {Header.user?.uid === post.uid ? (
                              <div>
                                <button
                                  className="delete"
                                  onClick={() => deletePost(post.id)}
                                >
                                  Verwijder
                                </button>
                              </div>
                            ) : (
                              console.log(Header.user?.uid)
                            )}
                          </div>
                          {/* <img href={pic} alt="Post"/> */}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

function Header() {
  const [dispNameLog, setDispNameLog] = useState([]);
  const [buttonbool, setbuttonbool] = useState([]);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [userid, setId] = useState([]);
  const [title, setTitle] = useState([]);
  const [desc, setDesc] = useState([]);
  const [date, setDate] = useState([]);
  const [postid, setPostid] = useState();
  const auth = getAuth();
  useEffect(() => {
    const fetchLogin = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setUser(user);
        const uid = user.uid;
        // ...
      } else {
        // User is signed out
        // ...
      }
    });

    // Clean up the  when the component unmounts
    return () => {
      fetchLogin();
    };
  }, []);

  const toevoegenDoc = async () => {
    await addDoc(collection(db, "posts"), {
      title: title,
      desc: desc,
      uid: userid,
      displayName: user?.displayName,
    });
  };

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(collection(db, "posts"));
      setPosts(data);
    };
    getPosts();
    // App.haalDocumentenOp();
  }, []);

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const loginwithgoogle = async () => {
    const credentials = await signInWithPopup(googleauth, googleprovider);
    setUser(credentials.user);
    setId(credentials.user.uid);
    console.log(user);
    setbuttonbool(true);
  };
  return (
    <div>
      <div className="header">
        <a href="#default" class="logo">
          LeoPard
        </a>
        <div className="header-right">
          {user ? (
            <div>
              Logged in as: <b>{user?.displayName} </b>
              {/* {console.log(user.displayName)} */}
              <button onClick={logout}>Logout</button>
            </div>
          ) : (
            <div>
              <button className="login-button" onClick={loginwithgoogle}>
                Login
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="add">
        {user ? (
          <div>
            <input
              type="text"
              placeholder="Title"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            ></input>
            <input
              type="text"
              placeholder="Desc"
              onChange={(event) => {
                setDesc(event.target.value);
              }}
            ></input>
            <button onClick={toevoegenDoc}>Add</button>
          </div>
        ) : (
          ""
          // console.log("test")
        )}
      </div>
    </div>
  );
}

export default App;
