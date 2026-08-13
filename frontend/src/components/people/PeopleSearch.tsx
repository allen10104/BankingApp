import "./PeopleSearch.css"


interface PeopleSearchProps {
    search: string

    onSearchChange:
        (value: string) => void
}


function PeopleSearch({
    search,
    onSearchChange
}: PeopleSearchProps) {

    return (
        <div className="people-search">

            <span className="people-search-icon">
                ⌕
            </span>

            <input
                type="text"
                placeholder="Search by name or username..."
                value={search}
                onChange={
                    event =>
                        onSearchChange(
                            event.target.value
                        )
                }
            />

            {search !== "" && (

                <button
                    type="button"
                    onClick={() =>
                        onSearchChange("")
                    }
                >
                    ×
                </button>

            )}

        </div>
    )
}


export default PeopleSearch