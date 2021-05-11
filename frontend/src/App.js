import React from "react";
import Header from "./components/Header";
import MainPage from "./components/MainPage";
import About from "./components/About";
import LoginForm from "./components/LoginForm";
import Items from "./components/Items";
import RegistrationForm from "./components/RegistrationForm";
import ItemRentail from "./components/ItemRentail";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import { getIsLoginStorage } from "./helpers/HelperLocalStorage";
import UserDetails from "./components/UserDetails";
import Menagement from "./components/Menagement";
import UserMangemnt from "./components/mangmentUser/UserMangemnt";
import EditItemDetails from "./components/managmentItems/EditItemDetails";
import AddNewItem from "./components/managmentItems/AddNewItem";
import ManagementRentails from "./components/rentails/ManagementRentails";

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
          <Route
            path="/item"
            exact
            component={() => <Items text={"Rezerwój"} baseUrl={"/item/"} />}
          />
          <Route path="/item/:id" component={ItemRentail} />
          <Route path="/editItem/:id" component={EditItemDetails} />
          <Route path="/addItem/" component={AddNewItem} />
          <Route path="/userDatails/:id" component={UserDetails} />
          <Route path="/registration" component={RegistrationForm} />
          <Route path="/menagment" exact component={Menagement} />
          <Route path="/manegment/user" component={UserMangemnt} />
          <Route path="/manegment/rentails" component={ManagementRentails} />
          <Route
            path="/manegment/item"
            component={() => <Items text={"Edytuj"} baseUrl={"/editItem/"} />}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
