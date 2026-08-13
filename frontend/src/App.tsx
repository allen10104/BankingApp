import { Route, Routes } from "react-router"

import CreateAccountPage from "./pages/CreateAccountPage"
import DashboardPage from "./pages/DashboardPage"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import AccountsPage from "./pages/AccountsPage"
import ProtectedRoute from "./components/ProtectedRoute"
import OpenAccountPage from "./pages/OpenAccountPage"
import TransactionsPage from "./pages/TransactionsPage"


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

            <Route
                path="/accounts"
                element={
                <ProtectedRoute>
                    <AccountsPage />
                </ProtectedRoute>
                }
            />

            <Route
                path="/accounts/open"
                element={
                    <ProtectedRoute>
                        <OpenAccountPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/transactions"
                element={
                    <ProtectedRoute>
                        <TransactionsPage />
                    </ProtectedRoute>
                }
            />
        </Routes>
    )
}


export default App