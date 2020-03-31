import React, { useState, useEffect, useContext } from 'react';
import SongContext from '../contexts/songs/SongContext';
import Song from './Song';
import swal from 'sweetalert';

const SongsList = () => {

    const Context = useContext(SongContext);
    const { trackList, currentSearch, getSearchTrackTitleFromAPI, getPopularTrackListFromAPI, setCurrentSearch } = Context;

    const [search, setSearch] = useState('');

    const handleSearchChange = event => {
        setSearch(event.target.value.trim());
    }

    const handleSearchClick = () => {
        if (search.length > 0) {
            setCurrentSearch(search);
        } else {
            swal({
                title: "Oops!, we are sorry",
                text: "The search can't be empty",
                icon: "warning",
                button: "I get it!",
                closeOnClickOutside: false
            });
        }
    }

    useEffect(() => {
        currentSearch && getSearchTrackTitleFromAPI();
        // eslint-disable-next-line
    }, [currentSearch]);

    useEffect(() => {
        getPopularTrackListFromAPI();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <section className="page-title bg-2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <h3 className="text-white mt-2">Get the lyric for any song</h3>
                            <input className="mb-5 left-rd30" type="text" onChange={handleSearchChange} />
                            <button className="btn btn-outline-danger rigth-rd30" type="button" onClick={handleSearchClick}>search</button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section course">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <div className="section-title">
                                <div className="divider mb-3"></div>
                                <h2>Popular Songs</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {trackList.length > 0 &&
                            trackList.map(element => <Song key={element.track.track_id} element={element.track} />)
                        }
                    </div>
                </div>
            </section>
        </>
    );

}

export default SongsList;