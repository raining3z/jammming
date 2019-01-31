import React, { Component } from 'react';
import Search from '../Tracks/Search/Search';
import Results from '../Tracks/Results/Results';
import Playlist from '../Tracks/Playlist/Playlist';
import './Tracks.css';

const apiKey = 'BQAEWo_1DOfMQBqbFaj_IH9w7f8j8SN1XnfJx4gZ1sHnMixcDPFG2lLFwWGWcp0P9-e8tkiWHFn-gpn5WdetkxWjKz55w4Hp_eWnmMkHDMcoCrJXABpVzp8zGz0cz47giF-kLDZbCwS3c4JO2vtelGnMln-8XvQVKgaxh6DpkKHjD3hSimTPPyC6uwFqr8wu2Eckuz8';
const url = 'https://api.spotify.com/v1/search?q=';
//const queryParam = document.getElementById('search_input');
const queryType = '&type=album,track,playlist,track'
//const redirectUrl = 'http://localhost:3000/callback'
//const clientSecret = '8390e0b271ab43caa757c21d5ca402c6';

class Tracks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tracks: [],
            playlist: [],
            searchValue: ''
        }
        this.getSuggestions = this.getSuggestions.bind(this);
        this.addToPlaylist = this.addToPlaylist.bind(this);
        this.removeToPlaylist = this.removeToPlaylist.bind(this);
        this.changeSearch = this.changeSearch.bind(this);
    }

    getSuggestions = async () => {
        try {
            const endpoint = url + this.state.searchValue + queryType;
            console.log(endpoint)
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

    changeSearch = (e) => {
        this.setState({
            searchValue: e.target.value
        })
    }

    render() {
        return(
            <div>
                <Search click={this.getSuggestions} search={this.state.searchValue} updateSearch={this.changeSearch} />
                <div className="App-playlist">
                    <Results tracks={this.state.tracks} addToPlaylist={this.addToPlaylist} />
                    <Playlist playlist={this.state.playlist} removeToPlaylist={this.removeToPlaylist} />
                </div>
            </div>
        )
    }
}

export default Tracks;