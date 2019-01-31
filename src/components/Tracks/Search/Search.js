import React, { Component } from 'react';
import './Search.css';

class Search extends Component {
    render() {
        return(
            <div className="SearchBar">
                <input placeholder="Enter A Song Title" value={this.props.search} onChange={this.props.updateSearch} />
                <button onClick={this.props.click}>SEARCH</button>
            </div>
        )
    }
}

export default Search;