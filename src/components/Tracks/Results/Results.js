import React, { Component } from 'react';
import './Results.css';
import ResultItem from './ResultItem/ResultItem';

class Results extends Component {
    render() {
        const tracks = this.props.tracks;
        return(
            <div className="SearchResults">
                <h2>Results</h2>
                <div className="TrackList">
                    {tracks.map((i, index) => {
                        return <ResultItem key={index} track={i.track} artist={i.artist} album={i.album} addToPlaylist={this.props.addToPlaylist} index={index} />
                    })}
                </div>
            </div>
        )
    }
}

export default Results;