import React from 'react';
import { Link } from 'react-router-dom';

const Song = ({ element }) => (
    <div className="col-lg-6 col-md-6">
        <div className="card rounded-0 p-0 mb-5">
            <div className="card-body">
                <h4 className="mt-3 mb-3 orange-hover">{element.artist_name}</h4>
                <ul className="list-inline mb-0">
                    <li className="list-inline-item">
                        <i className="ti-music-alt mr-2 text-color"></i>Track :
						</li>
                    <li className="list-inline-item text-black">
                        <strong>{element.track_name}</strong>
                    </li>
                </ul>
                <ul className="list-inline">
                    <li className="list-inline-item">
                        <i className="ti-world mr-2 text-color"></i>Album :
						</li>
                    <li className="list-inline-item text-black">
                        <strong>{element.album_name}</strong>
                    </li>
                </ul>
                <div className="text-center">
                    <Link to={`/track/lyric/${element.track_id}`} className="btn btn-outline-danger left-rd30 rigth-rd30"><i className="ti-control-play mr-2 text-color"></i><span className=" white-hover">View Lyric</span></Link>
                </div>
            </div>
        </div>
    </div>
);

export default Song;