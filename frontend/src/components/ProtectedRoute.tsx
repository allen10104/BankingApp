import { Navigate } from "react-router"

import { getToken } from "../services/sessionService"


interface ProtectedRouteProps {
    children: React.ReactNode
}


function ProtectedRoute({
    children
}: ProtectedRouteProps) {

    const token = getToken()

    if (token === null) {

        return (
            <Navigate
                to="/login"
                replace
            />
        )
    }

    return children
}


export default ProtectedRoute