import { Link } from "react-router"


function HomePage() {

    return (
        <main className="home-page">

            <section className="home-card">

                <h1>The Bank</h1>

                <p>
                    Simple banking made easy.
                </p>

                <div className="home-buttons">

                    <Link
                        className="primary-button"
                        to="/login"
                    >
                        Log In
                    </Link>

                    <Link
                        className="secondary-button"
                        to="/create-account"
                    >
                        Create Account
                    </Link>

                </div>

            </section>

        </main>
    )
}

export default HomePage