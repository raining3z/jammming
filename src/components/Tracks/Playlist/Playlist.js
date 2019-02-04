import React, { Component } from 'react';
import './Playlist.css';
import PlaylistItem from './PlaylistItem/PlaylistItem';

class Playlist extends Component {

    enableButtonToggle() {
        if(this.props.playlist.length > 0 && this.props.title.length) {
            return false
        } else {
            return true
        }
    }

    render() {
        return(
            <div className="Playlist">
                <input value={this.props.title} onChange={this.props.changeName}/>
                <div className="TrackList">
                    {this.props.playlist.map((i, index) => {
                        return <PlaylistItem 
                                    key={index} 
                                    track={i.track} 
                                    artist={i.artist} 
                                    album={i.album} 
                                    removeToPlaylist={this.props.removeToPlaylist} 
                                    index={index} />
                    })}
                </div>
                <button 
                    className="Playlist-save" 
                    onClick={this.props.saveList} 
                    disabled={this.enableButtonToggle()}>SAVE TO SPOTIFY</button>
            </div>
        )
    }
}

export default Playlist;