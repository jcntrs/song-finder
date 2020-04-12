import React, { useReducer } from 'react';
import SongContext from './SongContext';
import SongReducer from './SongReducer';
import credentials from '../../credentials.json';
import {
    SET_TRACKLIST,
    SET_CURRENT_LYRIC,
    SET_CURRENT_TRACK,
    SET_CURRENT_SEARCH,
    SET_LOADING,
    SET_NOT_FOUND
} from '../../types/songType';

const SongState = props => {

    const { api_key } = credentials;

    const initialState = {
        trackList: [],
        lyrics: {},
        currentTrack: {},
        currentSearch: '',
        loading: false,
        notFound: false
    }

    const [state, dispatch] = useReducer(SongReducer, initialState);

    const getSearchTrackTitleFromAPI = () => {
        setLoading(true);
        const URL = `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${state.currentSearch}&page_size=10&page=1&s_track_rating=desc&apikey=${api_key}`;
        fetch(URL)
            .then(response => response.json())
            .then(data => {
                if (data.message.header.status_code === 200) {
                    if (data.message.body.track_list.length > 0) {
                        setTrackList(data.message.body.track_list)
                        setNotFound(false)
                    } else {
                        setNotFound(true);
                    }
                } else {

                }
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            })
    }

    const getPopularTrackListFromAPI = () => {
        setLoading(true);
        const URL = `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${api_key}`;
        fetch(URL)
            .then(response => response.json())
            .then(data => {
                if (data.message.header.status_code === 200) {
                    setTrackList(data.message.body.track_list);
                } else {

                }
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }

    const getCurrentTrackFromAPI = track_id => {
        const URL = `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${track_id}&apikey=${api_key}`;
        fetch(URL)
            .then(response => response.json())
            .then(data => data.message.header.status_code === 200 && setCurrentTrack(data.message.body.track))
    }

    const getCurrentLyricFromAPI = track_id => {
        const URL = `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${track_id}&apikey=${api_key}`;
        fetch(URL)
            .then(response => response.json())
            .then(data => data.message.header.status_code === 200 && setCurrentLyric(data.message.body.lyrics))
    }

    const setCurrentTrack = track => {
        dispatch({
            type: SET_CURRENT_TRACK,
            payload: track
        });
    }

    const setCurrentLyric = lyric => {
        dispatch({
            type: SET_CURRENT_LYRIC,
            payload: lyric
        });
    }

    const setTrackList = trackList => {
        dispatch({
            type: SET_TRACKLIST,
            payload: trackList
        });
    }

    const setCurrentSearch = search => {
        dispatch({
            type: SET_CURRENT_SEARCH,
            payload: search
        });
    }

    const setLoading = loading => {
        dispatch({
            type: SET_LOADING,
            payload: loading
        });
    }

    const setNotFound = notFound => {
        dispatch({
            type: SET_NOT_FOUND,
            payload: notFound
        });
    }

    return (
        <SongContext.Provider
            value={{
                trackList: state.trackList,
                lyrics: state.lyrics,
                currentTrack: state.currentTrack,
                currentSearch: state.currentSearch,
                loading: state.loading,
                notFound: state.notFound,
                getSearchTrackTitleFromAPI,
                getPopularTrackListFromAPI,
                getCurrentLyricFromAPI,
                getCurrentTrackFromAPI,
                setCurrentSearch,
                setLoading,
                setNotFound
            }}
        >
            {props.children}
        </SongContext.Provider>
    );

}

export default SongState;