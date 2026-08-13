import {
    useEffect,
    useMemo,
    useState
} from "react"

import {
    useNavigate
} from "react-router"


import DashboardSidebar
    from "../components/dashboard/DashboardSidebar"

import DashboardHeader
    from "../components/dashboard/DashboardHeader"

import PeopleSearch
    from "../components/people/PeopleSearch"

import PersonCard
    from "../components/people/PersonCard"


import {
    getCurrentCustomer
} from "../services/authService"

import {
    fetchPeople
} from "../services/peopleService"

import {
    clearToken
} from "../services/sessionService"


import type {
    Customer
} from "../types/customer"

import type {
    Person
} from "../types/people"


import "./DashboardPage.css"
import "./SearchPeoplePage.css"


function SearchPeoplePage() {

    const navigate =
        useNavigate()


    const [
        customer,
        setCustomer
    ] = useState<Customer | null>(
        null
    )


    const [
        people,
        setPeople
    ] = useState<Person[]>([])


    const [
        search,
        setSearch
    ] = useState("")


    const [
        loading,
        setLoading
    ] = useState(true)


    const [
        error,
        setError
    ] = useState<string | null>(
        null
    )


    useEffect(() => {

        async function loadPage() {

            try {

                const [
                    customerData,
                    peopleData
                ] = await Promise.all([
                    getCurrentCustomer(),
                    fetchPeople()
                ])


                setCustomer(
                    customerData
                )

                setPeople(
                    peopleData
                )

            } catch (error) {

                if (
                    error instanceof Error
                ) {

                    setError(
                        error.message
                    )

                } else {

                    setError(
                        "Unable to load customers"
                    )
                }

            } finally {

                setLoading(false)

            }
        }


        void loadPage()

    }, [])


    const filteredPeople =
        useMemo(
            () => {

                const normalizedSearch =
                    search
                        .trim()
                        .toLowerCase()


                if (
                    normalizedSearch === ""
                ) {

                    return people
                }


                return people.filter(
                    person =>
                        person.name
                            .toLowerCase()
                            .includes(
                                normalizedSearch
                            )
                        ||
                        person.username
                            .toLowerCase()
                            .includes(
                                normalizedSearch
                            )
                )

            },
            [
                people,
                search
            ]
        )


    function handleLogout() {

        clearToken()

        navigate("/")
    }


    if (loading) {

        return (
            <div className="dashboard-loading">
                Loading people...
            </div>
        )
    }


    if (error) {

        return (
            <div className="dashboard-loading">

                <p className="error-message">
                    {error}
                </p>

            </div>
        )
    }


    if (customer === null) {
        return null
    }


    return (
        <div className="dashboard-background">

            <div className="dashboard-shell">


                <DashboardSidebar
                    onLogout={
                        handleLogout
                    }
                />


                <main className="dashboard-content">


                    <DashboardHeader
                        customer={
                            customer
                        }
                    />


                    <header className="people-page-header">

                        <span>
                            CUSTOMER DIRECTORY
                        </span>

                        <h1>
                            Search People
                        </h1>

                        <p>
                            Find customers registered
                            with The Bank.
                        </p>

                    </header>


                    <PeopleSearch
                        search={search}

                        onSearchChange={
                            setSearch
                        }
                    />


                    <div className="people-results-header">

                        <span>
                            {
                                search === ""
                                    ? "All Customers"
                                    : "Search Results"
                            }
                        </span>

                        <strong>
                            {filteredPeople.length}
                        </strong>

                    </div>


                    {filteredPeople.length === 0 ? (

                        <div className="people-empty">

                            <div>
                                ⌕
                            </div>

                            <h3>
                                No customers found
                            </h3>

                            <p>
                                Try searching for
                                another name or username.
                            </p>

                        </div>

                    ) : (

                        <div className="people-grid">

                            {filteredPeople.map(
                                person => (

                                    <PersonCard
                                        key={
                                            person.id
                                        }

                                        person={
                                            person
                                        }

                                        isCurrentUser={
                                            person.id ===
                                            customer.id
                                        }
                                    />

                                )
                            )}

                        </div>

                    )}

                </main>

            </div>

        </div>
    )
}


export default SearchPeoplePage