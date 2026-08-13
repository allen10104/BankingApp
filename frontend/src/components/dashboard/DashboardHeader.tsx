import type { Customer } from "../../types/customer"
import "./DashboardHeader.css"

interface DashboardHeaderProps {
    customer: Customer
}


function DashboardHeader({
    customer
}: DashboardHeaderProps) {

    return (
        <header className="dashboard-topbar">

            <div>

                <p className="dashboard-small-text">
                    Welcome back,
                </p>

                <h1>
                    {customer.name}
                </h1>

            </div>

            <div className="dashboard-user">

                <div className="dashboard-avatar">
                    {customer.name
                        .charAt(0)
                        .toUpperCase()}
                </div>

                <span>
                    {customer.username}
                </span>

            </div>

        </header>
    )
}


export default DashboardHeader