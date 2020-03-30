import React, { useEffect, useContext } from 'react';
import SongContext from '../contexts/songs/SongContext';
import Song from './Song';
import credentials from '../credentials.json';

const SongsList = () => {

    const Context = useContext(SongContext);
    const { trackList, getSongs } = Context;

    const { api_key } = credentials;
    console.log(trackList)

    const getData = () => {
        const URL = `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${api_key}`;
        fetch(URL)
            .then(response => response.json())
            .then(data => getSongs(data.message.body.track_list))
    }

    useEffect(() => {
        getData();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <section className="page-title bg-2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <h3 className="text-white mt-2">Get the lyric for any song</h3>
                            <input className="mb-5 left-rd30" type="text"></input>
                            <button className="btn btn-outline-danger rigth-rd30" type="button">search</button>
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