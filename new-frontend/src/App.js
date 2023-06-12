import './App.css';
import Header from "./components/Header";
import {getIsLoginStorage} from "./helpers/LocalStorageHelper";
import {BrowserRouter, redirect, Route, Routes} from "react-router-dom";
import MainPage from "./components/MainPage";
import About from "./components/About";
import UserManagement from "./components/user-management/UserManagement";
import Management from "./components/Management";
import RentalsManagement from "./RentalsManagement";
import AddNewItem from "./components/item-management/AddNewItem";
import EditItemDetails from "./components/item-management/EditItemDetails";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import RentalItem from "./components/RentalItem";
import UserDetails from "./components/UserDetails";
import Items from "./components/Items";
import ItemRental from "./components/ItemRental";

function App() {
    const isLogin = getIsLoginStorage();

    return (
        <div className={"App"}>
            <Header/>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<MainPage/>}/>
                    <Route path={"/about"} element={<About/>}/>
                    <Route path="/formLogin" element = {isLogin ? <About/> : <LoginForm/>} />
                    <Route path="/item" element={<Items text={"Rezerwuj"} baseUrl={"/item/"} />} />
                    <Route path="/item/:id" element={<ItemRental/>} />
                    <Route path="/editItem/:id" element={<EditItemDetails/>} />
                    <Route path="/addItem/" element={<AddNewItem/>} />
                    <Route path="/userDetails/:id" element={<UserDetails/>} />
                    <Route path="/registration" element={<RegistrationForm/>} />
                    <Route path="/management" exact element={<Management/>} />
                    <Route path="/management/user" element={<UserManagement/>} />
                    <Route path="/management/rentals" element={<RentalsManagement/>} />
                    <Route path="/management/item" element={<Items text={"Edytuj"} baseUrl={"/editItem/"} />} />
                    <Route path="/analytics"/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;
