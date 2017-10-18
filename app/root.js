import React from 'react'
import Header from './components/header-component/header'
import Progress from './components/progress-component/progress'
import {MUSIC_DATA_LIST} from './data/music-data'

class Root extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            progress: '-'
        }
    }

    componentDidMount() {
        $('#player').jPlayer({
            ready: function() {
                $(this).jPlayer('setMedia', {
                    mp3: MUSIC_DATA_LIST[0].file
                }).jPlayer('play');
            },
            supplied: 'mp3',
            wmode: 'window'
        });
        $('#player').bind($.jPlayer.event.timeupdate, (e) => {
            this.setState({
                progress: e.jPlayer.status.currentPercentAbsolute
            })
        })
    }

    componentWillUnMount() {
        $('#player').unbind($.jPlayer.event.timeupdate)
    }

    progressChangeHandler(progress) {
        $('#player').jPlayer("playHead", progress * 100)
    }

    render() {
        return(
            <div>
                <Header />
                <Progress progress={this.state.progress} onProgressChange={this.progressChangeHandler} barColor="#ff0000">
                </Progress>
            </div>
        )
    }
}

export default Root;