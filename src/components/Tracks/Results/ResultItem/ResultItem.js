import React, { Component } from 'react';
import './ResultItem.css';

class ResultItem extends Component {

    constructor(props) {
        super(props);
      
        this.addItemToPlaylist = this.addItemToPlaylist.bind(this);
      }

    addItemToPlaylist() {
        this.props.addToPlaylist(this.props.index);
    }

    render() {
        return(
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track}</h3>
                    <p>{this.props.artist} | {this.props.album}</p>
                </div>
                <button className="Track-action" onClick={this.addItemToPlaylist}>+</button>
            </div>
        )
    }
}

export default ResultItem;
