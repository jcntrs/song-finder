import React, { useEffect, useContext } from 'react';
import SongContext from '../contexts/songs/SongContext';
import { Link } from 'react-router-dom';

const Lyric = props => {

    const Context = useContext(SongContext);
    const { lyrics, currentTrack, getLyricFromAPI, getCurrentTrackFromAPI } = Context;

    const track_id = props.match.params.track_id;

    console.log(currentTrack)

    useEffect(() => {
        getLyricFromAPI(track_id);
        getCurrentTrackFromAPI(track_id);
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <section className="page-title bg-2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <Link to="/" className="btn btn-danger left-rd30 rigth-rd30" type="button"><span className="white-hover">go back</span></Link>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container">
                <div className="card mt-5">
                    <div className="card-header card-header-orange">
                        {currentTrack && <b>{currentTrack.track_name} By {currentTrack.artist_name}</b>}
                    </div>
                    <div className="card-body">
                        <p className="card-text">{lyrics.lyrics_body}</p>
                    </div>
                </div>
                <blockquote className="blockquote p-4 bg-white text-black font-italic mb-80 mt-3">
                    <dl className="row">
                        <dt className="col-sm-3">Album ID:</dt>
                        <dd className="col-sm-9">{currentTrack.album_id}</dd>
                        <dt className="col-sm-3">Album Name:</dt>
                        <dd className="col-sm-9">{currentTrack.album_name}</dd>
                        <dt className="col-sm-3">Explicit Worlds:</dt>
                        <dd className="col-sm-9">{lyrics.explicit === 0 ? 'No' : 'Si'}</dd>
                        <dt className="col-sm-3">Update Date:</dt>
                        <dd className="col-sm-9">{lyrics.updated_time && new Date(lyrics.updated_time).toDateString()}</dd>
                    </dl>
                </blockquote>
            </div>
        </>
    );
}

export default Lyric;