import React from 'react';
import SongState from './contexts/songs/SongState';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import SongsList from './components/SongsList';
import Lyric from './components/Lyric';
import Footer from './components/Footer';

const App = () => {
    return (
        <SongState>
            <BrowserRouter>
                <Nav />
                <Switch>
                    <Route exact path="/" component={SongsList} />
                    <Route exact path="/track/lyric/:track_id" component={Lyric} />
                </Switch>
                <Footer />
            </BrowserRouter>
        </SongState>
    );
}

export default App;