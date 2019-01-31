import React, { Component } from 'react';
import './PlaylistItem.css';

class PlaylistItem extends Component {
    constructor(props) {
        super(props);

        this.removeItemToPlaylist = this.removeItemToPlaylist.bind(this);
    }

    removeItemToPlaylist() {
        this.props.removeToPlaylist(this.props.index);
    }

    render() {
        return(
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track}</h3>
                    <p>{this.props.artist} | {this.props.album}</p>
                </div>
                <button className="Track-action" onClick={this.removeItemToPlaylist}>-</button>
            </div>
        )
    }
    
}

export default PlaylistItem;
