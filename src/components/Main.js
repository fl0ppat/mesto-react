import React from "react";
import Grid from "./Grid";
import Profile from "./Profile";
//import Api from "../utils/Api";
class Main extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <main>
        <Profile />
        <Grid />
      </main>
    );
  }
}

export default Main;
