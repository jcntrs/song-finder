import React, { useReducer } from 'react';
import SongContext from './SongContext';
import SongReducer from './SongReducer';
import credentials from '../../credentials.json';
import {
    GET_SONGS,
    ADD_LYRIC,
    SET_CURRENT_TRACK
} from '../../types/songType';

const SongState = props => {

    const { api_key } = credentials;

    const initialState = {
        trackList: [],
        lyrics: {},
        currentTrack: {}
    }

    const [state, dispatch] = useReducer(SongReducer, initialState);

    const getCurrentTrackFromAPI = track_id => {
        const URL = `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${track_id}&apikey=${api_key}`;
        fetch(URL)
            .then(response => response.json())
            .then(data => data.message.header.status_code === 200 && setCurrentTrack(data.message.body.track))
    }

    const getLyricFromAPI = track_id => {
        const URL = `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${track_id}&apikey=${api_key}`;
        fetch(URL)
            .then(response => response.json())
            .then(data => data.message.header.status_code === 200 && addLyrics(data.message.body.lyrics))
    }

    const setCurrentTrack = track => {
        dispatch({
            type: SET_CURRENT_TRACK,
            payload: track
        });
    }

    const addLyrics = lyrics => {
        dispatch({
            type: ADD_LYRIC,
            payload: lyrics
        });
    }

    const getSongs = trackList => {
        dispatch({
            type: GET_SONGS,
            payload: trackList
        });
    }

    return (
        <SongContext.Provider
            value={{
                trackList: state.trackList,
                lyrics: state.lyrics,
                currentTrack: state.currentTrack,
                getSongs,
                getLyricFromAPI,
                getCurrentTrackFromAPI
            }}
        >
            {props.children}
        </SongContext.Provider>
    );

}

export default SongState;