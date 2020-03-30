import {
    GET_SONGS,
    ADD_LYRIC,
    SET_CURRENT_TRACK
} from '../../types/songType';

export default (state, action) => {
    switch (action.type) {
        case GET_SONGS:
            return {
                ...state,
                trackList: action.payload,
                currentTrack: {}
            }
        case ADD_LYRIC:
            return {
                ...state,
                lyrics: action.payload
            }
        case SET_CURRENT_TRACK:
            return {
                ...state,
                currentTrack: action.payload
            }

        default:
            return state;
    }
}