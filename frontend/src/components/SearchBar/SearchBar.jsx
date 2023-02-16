const SearchBar = (props) => {

    return (
        <form onSubmit={props.submitSearchTerm} className='form-grid'>
            <div className='form-group'>
             <input type='text'
             placeholder='search videos...'
             className='form-control' value={props.query} onChange={(event) => props.setQuery(event.target.value)} />
            </div>
            <button type='submit' class='btn btn-primary' style={{'margin-top': '1rem', 'margin-left': '1rem', 'margin-bottom': '1rem'}}>Search</button>
      </form>
    )
}


export default SearchBar;