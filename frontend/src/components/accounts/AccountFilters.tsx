import {
    useState
} from "react"

import type {
    AccountFilters as AccountFiltersType
} from "../../types/account"

import "./AccountFilters.css"


interface AccountFiltersProps {
    onApply: (
        filters: AccountFiltersType
    ) => void

    onReset: () => void
}


function AccountFilters({
    onApply,
    onReset
}: AccountFiltersProps) {

    const [branchId, setBranchId] =
        useState("")

    const [minBalance, setMinBalance] =
        useState("")


    function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {

        event.preventDefault()


        const filters:
            AccountFiltersType = {}


        if (branchId !== "") {

            filters.branch_id =
                Number(branchId)
        }


        if (minBalance !== "") {

            filters.min_balance =
                Number(minBalance)
        }


        onApply(filters)
    }


    function handleReset() {

        setBranchId("")
        setMinBalance("")

        onReset()
    }


    return (
        <form
            className="account-filters"
            onSubmit={handleSubmit}
        >

            <div className="account-filter-field">

                <label htmlFor="branch-filter">
                    Branch ID
                </label>

                <input
                    id="branch-filter"
                    type="number"
                    placeholder="Any branch"
                    value={branchId}
                    onChange={
                        event =>
                            setBranchId(
                                event.target.value
                            )
                    }
                />

            </div>


            <div className="account-filter-field">

                <label htmlFor="balance-filter">
                    Minimum Balance
                </label>

                <input
                    id="balance-filter"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Any balance"
                    value={minBalance}
                    onChange={
                        event =>
                            setMinBalance(
                                event.target.value
                            )
                    }
                />

            </div>


            <button
                className="account-filter-button"
                type="submit"
            >
                Apply Filters
            </button>


            <button
                className="account-reset-button"
                type="button"
                onClick={handleReset}
            >
                Reset
            </button>

        </form>
    )
}


export default AccountFilters