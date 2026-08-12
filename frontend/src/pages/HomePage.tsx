import { useEffect, useState } from "react"

import { fetchCustomers } from "../services/customerService"
import type { Customer } from "../types/customer"


function HomePage() {

    const [customers, setCustomers] = useState<Customer[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)


    useEffect(() => {

        async function loadCustomers() {

            try {

                const data = await fetchCustomers()

                setCustomers(data)

            } catch (error) {

                if (error instanceof Error) {
                    setError(error.message)
                } else {
                    setError("Unable to load customers")
                }

            } finally {

                setLoading(false)

            }
        }


        void loadCustomers()

    }, [])


    if (loading) {
        return <p>Loading customers...</p>
    }


    if (error) {
        return <p>{error}</p>
    }


    return (
        <main className="page">

            <header className="hero">
                <h1>Citi Banking Portal</h1>
                <p>Customer Management Dashboard</p>
            </header>

            <section className="customer-section">

                <h2>Customers</h2>

                {customers.length === 0 ? (

                    <p>No customers found.</p>

                ) : (

                    <div className="customer-list">

                        {customers.map((customer) => (

                            <article
                                className="customer-card"
                                key={customer.id}
                            >

                                <h3>{customer.name}</h3>

                                <p>
                                    Username: {customer.username}
                                </p>

                                <p className="customer-id">
                                    ID: {customer.id}
                                </p>

                            </article>

                        ))}

                    </div>

                )}

            </section>

        </main>
    )
}


export default HomePage