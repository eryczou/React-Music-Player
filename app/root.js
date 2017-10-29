import React from 'react'
import Header from './components/header-component/header'
import MusicList from './page/musiclist'
import Player from './page/player'
import {MUSIC_DATA_LIST} from './data/music-data'
import './root.less'

class Root extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            musicList : MUSIC_DATA_LIST,
            currentMusicItem: MUSIC_DATA_LIST[1]
        }
    }

    componentDidMount() {
        $('#player').jPlayer({
            ready: function() {
                $(this).jPlayer('setMedia', {
                    mp3: "http://oj4t8z2d5.bkt.clouddn.com/%E6%88%90%E9%83%BD.mp3"
                }).jPlayer('play');
            },
            supplied: 'mp3',
            wmode: 'window'
        });
    }

    componentWillUnMount() {
    }

    render() {
        return(
            <div>
                <Header />
                <MusicList currentMusicItem = {this.state.currentMusicItem} musicList = {this.state.musicList} />
                {/* <Player currentMusicItem = {this.state.currentMusicItem} /> */}
            </div>
        )
    }
}

export default Root;