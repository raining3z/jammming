import React, { Component } from 'react';
import './Playlist.css';
import PlaylistItem from './PlaylistItem/PlaylistItem';

const apiKey = 'BQAEWo_1DOfMQBqbFaj_IH9w7f8j8SN1XnfJx4gZ1sHnMixcDPFG2lLFwWGWcp0P9-e8tkiWHFn-gpn5WdetkxWjKz55w4Hp_eWnmMkHDMcoCrJXABpVzp8zGz0cz47giF-kLDZbCwS3c4JO2vtelGnMln-8XvQVKgaxh6DpkKHjD3hSimTPPyC6uwFqr8wu2Eckuz8';
const createUrl = 'https://api.spotify.com/v1/users/raining3z/playlists';
const addTrackUrl = 'https://api.spotify.com/v1/playlists/';

class Playlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlistTitle: 'New Playlist',
            playlist: this.props.playlist,
            uris: []
        }

        this.changeName = this.changeName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
    }

    savePlaylist = async () => {
        this.state.playlist.forEach(i => {
            this.state.uris.push(
                'spotify:track:' + i.id
            )
        })
        
        try {
            const response = await fetch(createUrl,  {
                method: 'POST',
                body: JSON.stringify({
                    "name": this.state.playlistTitle,
                    "public": false
                }),
                headers: {
                    'Authorization': 'Bearer ' + apiKey,
                    'Content-Type': 'application/json'
                }
            })
            if (response.ok) {
                const jsonResponse = await response.json();

                const endpoint = addTrackUrl + jsonResponse.id + '/tracks';
                
                const responseTrack = await fetch(endpoint, {
                    method: 'POST',
                    body: JSON.stringify({
                        uris: this.state.uris
                    }),
                    headers: {
                        'Authorization': 'Bearer ' + apiKey,
                        'Content-Type': 'application/json'
                    }
                });
                if(responseTrack.ok) {
                    const jsonResponseTrack = await response.json();
                    console.log(jsonResponseTrack)
                }

                return jsonResponse;
            }
            throw new Error ('Request Failed!')
        } catch (error) {
            console.log(error)
        }

        this.setState({
            playlistTitle: 'New Playlist',
            playlist: []
        })
    }

    changeName = (event) => {
        this.setState({
            playlistTitle: event.target.value
        })
    }

    enableButtonToggle() {
        if(this.state.playlist.length > 0 && this.state.playlistTitle.length) {
            return false
        } else {
            return true
        }
    }

    render() {
        return(
            <div className="Playlist">
                <input value={this.state.playlistTitle} onChange={this.changeName} id="playlist_title" />
                <div className="TrackList">
                    {this.state.playlist.map((i, index) => {
                        return <PlaylistItem key={index} track={i.track} artist={i.artist} album={i.album} removeToPlaylist={this.props.removeToPlaylist} index={index} />
                    })}
                </div>
                <button className="Playlist-save" onClick={this.savePlaylist} disabled={this.enableButtonToggle()}>SAVE TO SPOTIFY</button>
            </div>
        )
    }
}

export default Playlist;