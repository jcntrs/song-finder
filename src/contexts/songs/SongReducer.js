import {
    SET_TRACKLIST,
    SET_CURRENT_LYRIC,
    SET_CURRENT_TRACK,
    SET_CURRENT_SEARCH,
    SET_LOADING,
    SET_NOT_FOUND
} from '../../types/songType';

export default (state, action) => {
    switch (action.type) {
        case SET_TRACKLIST:
            return {
                ...state,
                trackList: action.payload,
                lyrics: {},
                currentTrack: {}
            }
        case SET_CURRENT_LYRIC:
            return {
                ...state,
                lyrics: action.payload,
                currentSearch: ''
            }
        case SET_CURRENT_TRACK:
            return {
                ...state,
                currentTrack: action.payload
            }

        case SET_CURRENT_SEARCH:
            return {
                ...state,
                currentSearch: action.payload
            }
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case SET_NOT_FOUND:
            return {
                ...state,
                notFound: action.payload
            }

        default:
            return state;
    }
}