/**
 * SearchBar component
 * 
 * @module SearchBar
 * @returns {React.Element} SearchBar component
 */
function SearchBar() {
    return (
        <div className="search-bar">
            <input type="text" placeholder="Search" />
            <button type="submit">Search</button>
        </div>
    )
}

export default SearchBar