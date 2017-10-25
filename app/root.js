import React from 'react'
import Header from './components/header-component/header'
import Player from './page/player'
import {MUSIC_DATA_LIST} from './data/music-data'

class Root extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            currentMusicItem: MUSIC_DATA_LIST[0]
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
                <Player currentMusicItem={this.state.currentMusicItem}/>
            </div>
        )
    }
}

export default Root;