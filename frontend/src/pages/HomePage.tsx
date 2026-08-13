import { Link } from "react-router"
import "./HomePage.css"

function HomePage() {

    return (
        <main className="landing-background">

            <div className="landing-shell">

                <header className="landing-header">

                    <h2 className="landing-logo">
                        The Bank
                    </h2>

                    <nav className="landing-nav">

                        <a href="#features">
                            Banking
                        </a>

                        <a href="#security">
                            Security
                        </a>

                        <Link
                            className="landing-login-link"
                            to="/login"
                        >
                            Log In
                        </Link>

                        <Link
                            className="landing-open-button"
                            to="/create-account"
                        >
                            Open an Account
                        </Link>

                    </nav>

                </header>


                <section className="landing-hero">

                    <div className="landing-hero-content">

                        <span className="landing-eyebrow">
                            SIMPLE. SECURE. YOURS.
                        </span>

                        <h1>
                            Banking built
                            <br />
                            around you.
                        </h1>

                        <p>
                            Manage your checking and savings accounts,
                            transfer money, and keep track of your
                            transactions — all in one place.
                        </p>


                        <div className="landing-actions">

                            <Link
                                className="landing-primary-button"
                                to="/create-account"
                            >
                                Get Started
                            </Link>

                            <Link
                                className="landing-secondary-button"
                                to="/login"
                            >
                                Log In
                            </Link>

                        </div>

                    </div>


                    <div className="landing-preview">

                        <div className="preview-card">

                            <div className="preview-card-header">

                                <span>
                                    The Bank
                                </span>

                                <span>
                                    •••
                                </span>

                            </div>


                            <div className="preview-balance">

                                <span>
                                    Available Balance
                                </span>

                                <strong>
                                    $8,450.00
                                </strong>

                            </div>


                            <div className="preview-card-footer">

                                <span>
                                    Everyday Checking
                                </span>

                                <span>
                                    •••• 4821
                                </span>

                            </div>

                        </div>


                        <div className="preview-transfer">

                            <div className="preview-transfer-icon">
                                ⇄
                            </div>

                            <div>
                                <span>
                                    Transfer complete
                                </span>

                                <strong>
                                    +$350.00
                                </strong>
                            </div>

                        </div>

                    </div>

                </section>


                <section
                    id="features"
                    className="landing-features"
                >

                    <article className="landing-feature-card lavender">

                        <div className="landing-feature-icon">
                            $
                        </div>

                        <h3>
                            Your Accounts
                        </h3>

                        <p>
                            View checking and savings balances
                            from your personal dashboard.
                        </p>

                    </article>


                    <article className="landing-feature-card peach">

                        <div className="landing-feature-icon">
                            ⇄
                        </div>

                        <h3>
                            Easy Transfers
                        </h3>

                        <p>
                            Move money securely between
                            your own bank accounts.
                        </p>

                    </article>


                    <article className="landing-feature-card blue">

                        <div className="landing-feature-icon">
                            ≡
                        </div>

                        <h3>
                            Transaction History
                        </h3>

                        <p>
                            Keep track of your recent
                            account activity in one place.
                        </p>

                    </article>

                </section>


                <section
                    id="security"
                    className="landing-security"
                >

                    <div>

                        <span className="landing-eyebrow light">
                            BUILT FOR CONFIDENCE
                        </span>

                        <h2>
                            Your finances.
                            <br />
                            Clearly organized.
                        </h2>

                        <p>
                            Sign in securely to access only your
                            accounts, balances, and transactions.
                        </p>

                    </div>


                    <Link
                        className="landing-security-button"
                        to="/create-account"
                    >
                        Join The Bank
                    </Link>

                </section>


                <footer className="landing-footer">

                    <strong>
                        The Bank
                    </strong>

                    <span>
                        Simple banking for everyday life.
                    </span>

                </footer>

            </div>

        </main>
    )
}


export default HomePage