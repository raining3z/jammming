import React, { Component } from 'react';
import Search from '../Tracks/Search/Search';
import Results from '../Tracks/Results/Results';
import Playlist from '../Tracks/Playlist/Playlist';
import './Tracks.css';

const apiKey = 'BQBW7QBlHWObJjQC0Ue2f8COlxUdEftjJXSezzN1no35H27L6hDlLohtBrcYc3bl8AxRq_Azm1fShrNMsx0rkR5gj7DH-ZYStagjMUFf6t73s06HEn9fHnjMj3Hv3gOLADNgvJaw3USRNephnwD8pwYikBluKu3Qn2_DobVg44NaHJRZDrbtHtjg7JiettqeQYpee_k';
const url = 'https://api.spotify.com/v1/search?q=';
const queryType = '&type=album,track,playlist,track';

const createUrl = 'https://api.spotify.com/v1/users/raining3z/playlists';
const addTrackUrl = 'https://api.spotify.com/v1/playlists/';

class Tracks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tracks: [],
            playlist: [],
            searchValue: '',
            uris: [],
            playlistTitle: 'New Playlist'
        }
        this.getSuggestions = this.getSuggestions.bind(this);
        this.addToPlaylist = this.addToPlaylist.bind(this);
        this.removeToPlaylist = this.removeToPlaylist.bind(this);
        this.changeSearch = this.changeSearch.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.changeName = this.changeName.bind(this);
    }

    getSuggestions = async () => {
        this.state.tracks = [];
        try {
            const endpoint = url + this.state.searchValue + queryType;
            //console.log(endpoint)
            const response = await fetch(endpoint, {
                headers: {
                    'Authorization': 'Bearer ' + apiKey
                }
            });
            if(response.ok) {
                const jsonResponse = await response.json();
                const jsonTracks = jsonResponse.tracks.items;
                jsonTracks.forEach(i => {
                    this.state.tracks.push({
                        id: i.id,
                        track: i.name,
                        artist: i.artists[0].name,
                        album: i.album.name
                    });
                });
            }
           // throw new Error('Request failed!')
        } catch (error) {
            console.log(error)
        }
        this.setState({
            tracks: this.state.tracks
        })
    }

    addToPlaylist = (index) => {
        //console.log(index)
        this.state.playlist.push({
            id: this.state.tracks[index].id,
            track: this.state.tracks[index].track,
            artist: this.state.tracks[index].artist,
            album: this.state.tracks[index].album
        });
        this.state.tracks.splice(index, 1);
        this.setState({
            tracks: this.state.tracks,
            playlist: this.state.playlist
        })
    }

    removeToPlaylist = (index) => {
        //console.log(index)
        this.state.tracks.push({
            id: this.state.playlist[index].id,
            track: this.state.playlist[index].track,
            artist: this.state.playlist[index].artist,
            album: this.state.playlist[index].album
        });
        this.state.playlist.splice(index, 1);
        this.setState({
            tracks: this.state.tracks,
            playlist: this.state.playlist
        })
    }

    changeName = (event) => {
        this.setState({
            playlistTitle: event.target.value
        })
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
                this.addTrackstoPlaylist(jsonResponse);
                //return jsonResponse;
            }
            throw new Error ('Request failed at savePlaylist')
        } catch (error) {
            console.log(error)
        }

        this.state.playlist = []

        this.setState({
            playlistTitle: 'New Playlist',
            uris: []
        })
    }

    addTrackstoPlaylist = async (jsonResponse) => {
        //console.log(jsonResponse.id)
        const endpoint = addTrackUrl + jsonResponse.id + '/tracks';
                
        try {
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
                const jsonResponseTrack = await responseTrack.json();
                return jsonResponseTrack;
            }
            throw new Error ('Request failed at addTrackstoPlaylist')
        } catch (error) {
            console.log(error)
        }
    }

    changeSearch = (e) => {
        this.setState({
            searchValue: e.target.value
        })
    }

    render() {
        return(
            <div className="Track-Playlist">
                <Search 
                    click={this.getSuggestions} 
                    search={this.state.searchValue} 
                    updateSearch={this.changeSearch} />
                <div className="App-playlist">
                    <Results 
                        tracks={this.state.tracks} 
                        addToPlaylist={this.addToPlaylist} />
                    <Playlist 
                        playlist={this.state.playlist} 
                        removeToPlaylist={this.removeToPlaylist} 
                        saveList={this.savePlaylist} 
                        title={this.state.playlistTitle} 
                        changeName={this.changeName}  />
                </div>
            </div>
        )
    }
}

export default Tracks;