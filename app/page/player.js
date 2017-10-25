import React from 'react'
import Progress from '../components/progress-component/progress'
import './player.less'

class Player extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            volume: 0,
            progress: 0,
            isPlay: true,
            remainingTime: '-'
        }
    }

    componentDidMount() {
        $('#player').bind($.jPlayer.event.timeupdate, (e) => {
            this.setState({
                volume: e.jPlayer.options.volume * 100,
                progress: e.jPlayer.status.currentPercentAbsolute,
                remainingTime: (e.jPlayer.status.currentTime) / 60
            })
        })
    }

    componentWillUnMount() {
        $('#player').unbind($.jPlayer.event.timeupdate)
    }

    progressChangeHandler(progress) {
        $('#player').jPlayer("playHead", progress * 100)
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

        this.setState({
            isPlay : !this.state.isPlay
        })
    }

    render() {
        return(
            <div className="player-page">
                <h1 className="caption">我的播放清单</h1>
                <div className="player-wrapper">
                    <div className="control-wrapper">
                        <h2 className="music-title">{this.props.currentMusicItem.title}</h2>
                        <h3 className="music-artist">{this.props.currentMusicItem.artist}</h3>
                        <div className="remaining-time">{this.state.remainingTime}</div>
                        <div className="volume-control">
                            <img src="../../static/img/volume.png" />
                            <div>
                                <Progress progress={this.state.volume} onProgressChange=  {this.volumeChangeHandler} barColor="#aaa">
                                </Progress>
                            </div>
                        </div>
                        <div>
                            <Progress progress={this.state.progress} onProgressChange=  {this.progressChangeHandler} barColor="#ff0000">
                            </Progress>
                        </div>
                        <i className="play-backward fa fa-backward fa-2x" aria-hidden="true"></i>
                        <i className={`fa fa-2x ${this.state.isPlay?'pause fa-pause':'play fa-play'}`} aria-hidden="true" onClick={this.play.bind(this)}></i>
                        <i className="play-forward fa fa-forward fa-2x" aria-hidden="true"></i>
                        <i className="random-play fa fa-random fa-2x" aria-hidden="true"></i>
                        <i className="repeat-play fa fa-repeat fa-2x" aria-hidden="true"></i>
                    </div>
                    <img className="cover" src={this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.title}/>
                </div>
            </div>
        )
    }
}

export default Player;