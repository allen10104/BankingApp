import { Route, Routes } from "react-router"

import CreateAccountPage from "./pages/CreateAccountPage"
import CustomersPage from "./pages/CustomersPage"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"

import "./App.css"


function App() {

    return (
        <Routes>

            <Route
                path="/"
                element={<HomePage />}
            />

            <Route
                path="/login"
                element={<LoginPage />}
            />

            <Route
                path="/create-account"
                element={<CreateAccountPage />}
            />

            <Route
                path="/customers"
                element={<CustomersPage />}
            />

        </Routes>
    )
}


export default App