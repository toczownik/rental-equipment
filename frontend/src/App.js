import React from "react";
import Header from "./components/Header";
import MainPage from "./components/MainPage";
import About from "./components/About";
import LoginForm from "./components/LoginForm";
import Items from "./components/Items";
import RegistrationForm from "./components/RegistrationForm";
import ItemDetails from "./components/ItemsDetails";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import { getIsLoginStorage } from "./helpers/HelperLocalStorage";
import UserDetails from "./components/UserDetails";

const App = () => {
  const isLogin = getIsLoginStorage();
  const comp = () => <LoginForm />;

  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/about" component={About} />
          <Route path="/formLogin">
            {isLogin ? <Redirect to="/about" /> : comp}
          </Route>
          <Route path="/item" exact component={Items} />
          <Route path="/item/:id" component={ItemDetails} />
          <Route path="/userDatails/:id" component={UserDetails} />
          <Route path="/registration" component={RegistrationForm} />
          userDatails
        </Switch>
      </div>
    </Router>
  );
};

export default App;
