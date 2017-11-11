import React, {Component} from 'react'
import Progress from '../components/progress-component/progress'
import { Link } from 'react-router-dom'
import PubSub from 'pubsub-js'
import './player.less'

class Player extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            volume: 0,
            progress: 0,
            isPlay: true,
            remainingTime: '-',
            playMode: 'REPEAT',
            isMute: false
        }
    }

    componentDidMount() {
        $('#player').bind($.jPlayer.event.timeupdate, (e) => {
            let duration = e.jPlayer.status.duration;
            this.setState({
                volume: e.jPlayer.options.volume * 100,
                progress: e.jPlayer.status.currentPercentAbsolute,
                remainingTime: this.formatTime(duration * (1 - e.jPlayer.status.currentPercentAbsolute/100))
            })
        })
    }

    formatTime(time) {
        let minute = Math.floor( time / 60 );
        let second = Math.floor( time % 60 );
        second = second < 10 ? `0${second}` : second;
        return `${minute}:${second}`
    }

    componentWillUnMount() {
        $('#player').unbind($.jPlayer.event.timeupdate)
    }

    progressChangeHandler(progress) {
        $('#player').jPlayer("playHead", progress * 100)
    }

    toggleMute() {
        if (this.state.isMute) {
            $('#player').jPlayer("unmute")
        } else {
            $('#player').jPlayer("mute")
        }
        this.setState((prevState) => {
            return { isMute : !prevState.isMute }
        })
    }

    volumeChangeHandler(progress) {
        $('#player').jPlayer("volume", progress)
    }

    play() {
        if (this.state.isPlay) {
            $('#player').jPlayer("pause")  
        } else {
            $('#player').jPlayer("play")  
        }

        this.setState((prevState) => {
            return { isPlay : !prevState.isPlay }
        })
    }

    playNext(type = 'next') {
        if (type === 'next') {
            PubSub.publish('PLAY_NEXT_MUSIC')
        } else if (type === 'prev' ){
            PubSub.publish('PLAY_PREV_MUSIC')
        } else {
            console.log('error on playnext')
        }
    }

    togglePlayMode() {
        if (this.state.playMode === 'RANDOM') {
            PubSub.publish('REPEAT_PLAY')
            this.setState((prevState) => {
                return {playMode:'REPEAT'}
            })
        } else {
            PubSub.publish('RANDOM_PLAY')
            this.setState((prevState) => {
                return {playMode:'RANDOM'}
            })
        }
    }

    render() {
        return(
            <div className="player-page">
                <h1 className="caption"><Link to="/list">我的歌曲播放清单</Link></h1>
                <div className="player-wrapper">
                    <div className="control-wrapper">
                        <h2 className="music-title">{this.props.currentMusicItem.title}</h2>
                        <h3 className="music-artist">{this.props.currentMusicItem.artist}</h3>
                        <div className="remaining-time">-{this.state.remainingTime}</div>
                        <div className="volume-control">
                            <i className={`fa fa-2x ${this.state.isMute?'fa-volume-off':'fa-volume-up'}`} aria-hidden="true" onClick={this.toggleMute.bind(this)}/>
                            <div>
                                <Progress progress={this.state.volume} onProgressChange=  {this.volumeChangeHandler} barColor="#aaa">
                                </Progress>
                            </div>
                        </div>
                        <div>
                            <Progress progress={this.state.progress} onProgressChange=  {this.progressChangeHandler} barColor="#ff0000">
                            </Progress>
                        </div>
                        <i onClick={this.playNext.bind(this, 'prev')} className="play-backward fa fa-backward fa-2x" aria-hidden="true"></i>
                        <i className={`fa fa-2x ${this.state.isPlay?'pause fa-pause':'play fa-play'}`} aria-hidden="true" onClick={this.play.bind(this)}></i>
                        <i onClick={this.playNext.bind(this, 'next')} className="play-forward fa fa-forward fa-2x" aria-hidden="true"></i>
                        <i onClick={this.togglePlayMode.bind(this)} className={`play-mode fa fa-2x ${this.state.playMode == 'REPEAT' ? 'fa-repeat' : 'fa-random'}`} aria-hidden="true"></i>
                    </div>
                    <img className="cover" src={this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.title}/>
                </div>
            </div>
        )
    }
}

export default Player;