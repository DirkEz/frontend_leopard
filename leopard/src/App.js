import logo from "./img/logo.png";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div class="main">
          <div class="menu-bar">
            <div class="name-bar">
              {/* <div class="items"> */}
                <img src={logo} className="App-logo" alt="logo" width="150px" />
                <p>Leopard</p>
              {/* </div> */}
            </div>
            {/* <ul>
                <li>Home</li>
                <li>Zoeken</li>
                <li>Chat</li>
                <li>Profiel</li>
        </ul> */}
          </div>
          <div className="view-story"></div>
          <div className="view-feed"></div>
          <div className="friend-list"></div>
        </div>
      </header>
    </div>
  );
}

export default App;
