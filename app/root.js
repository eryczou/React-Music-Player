import React, {Component} from 'react'
import Header from './components/header-component/header'
import MusicList from './page/musiclist'
import Player from './page/player'
import {MUSIC_DATA_LIST} from './data/music-data'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import PubSub from 'pubsub-js'

class Root extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            musicList : MUSIC_DATA_LIST,
            currentMusicItem: MUSIC_DATA_LIST[0]
        }
    }

    playMusic(item) {
        $('#player').jPlayer('setMedia', {
            mp3: item.file
        }).jPlayer('play');
        document.title = `${item.title} - ${item.artist}`
        this.setState({
            currentMusicItem:item
        })
    }

    playNext(type="next") {
        let index = this.findMusicIndex(this.state.currentMusicItem);
        let newIndex = null;
        let musicListLength = this.state.musicList.length;

        if (type === 'next') {
            newIndex = (index + 1) % musicListLength;
        } else if (type === 'prev') {
            newIndex = (index + musicListLength -1) % musicListLength;
        } else {
            throw new Error('Wrong input playnext')
        }
        this.playMusic(this.state.musicList[newIndex]);
    }

    findMusicIndex(musicItem) {
        return this.state.musicList.indexOf(musicItem)
    }

    componentDidMount() {
        $('#player').jPlayer({ 
            supplied: 'mp3',
            wmode: 'window'
        });
        this.playMusic(this.state.currentMusicItem)
        $('#player').bind($.jPlayer.event.ended, (e) => {
            this.playNext()
        })
        PubSub.subscribe('PLAY_MUSIC', (msg, musicItem) => {
            this.playMusic(musicItem)
        });
        PubSub.subscribe('PLAY_NEXT_MUSIC', (msg) => {
            this.playNext()
        });
        PubSub.subscribe('PLAY_PREV_MUSIC', (msg) => {
            this.playNext('prev')
        });
        PubSub.subscribe('DELETE_MUSIC', (msg, musicItem) => {
            this.setState((prevState) => {
                return  {
                    musicList: prevState.musicList.filter(item => {
                        return item != musicItem
                    })
                }
            })
        });
    }

    componentWillUnMount() {
        PubSub.unSubscribe('PLAY_MUSIC');
        PubSub.unSubscribe('DELETE_MUSIC');
        PubSub.unSubscribe('PLAY_NEXT_MUSIC');
        PubSub.unSubscribe('PLAY_PREV_MUSIC');
        $('#player').unbind($.jPlayer.event.ended);
    }

    render() {
        const MyPlayer = (props) => {
            return (
                <Player currentMusicItem = {this.state.currentMusicItem} />
            )
        }

        const MyMusicList = (props) => {
            return (
                <MusicList currentMusicItem = {this.state.currentMusicItem} musicList = {this.state.musicList} />
            )
        }

        return(
            <Router>
                <div>
                    <Header />  
                    <Route exact path="/" render={MyPlayer} />
                    <Route path="/list" render={MyMusicList} />
                </div>
            </Router>
        )
    }
}

export default Root;