import { Route, Routes } from "react-router"

import CreateAccountPage from "./pages/CreateAccountPage"
import DashboardPage from "./pages/DashboardPage"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"

import ProtectedRoute from "./components/ProtectedRoute"

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
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                }
            />

        </Routes>
    )
}


export default App