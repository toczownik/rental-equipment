import React from "react";
import Header from "./components/Header";
import MainPage from "./components/MainPage";
import About from "./components/About";
import LoginForm from "./components/LoginForm";
import Items from "./components/Items";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/about" component={About} />
          <Route path="/formLogin" component={LoginForm} />
          <Route path="/item" exact component={Items} />
          {/* <Route path="/shop/:id" component={ItemDetails} /> */}
        </Switch>
      </div>
    </Router>
  );
};

export default App;
