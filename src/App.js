import React, { Component } from "react";
import ButterExample from "./components/ButterExample";
import NickExample from "./components/NickExample";
import "./App.css";

class App extends Component {
  state = {
    meta: {},
    restaurants: []
  };

  render() {
    return (
      <div className="App">
        <h1>ButterCMS Tests</h1>
        {/* <ButterExample /> */}
        <NickExample />
      </div>
    );
  }
}

export default App;
