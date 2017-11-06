import React, {Component} from 'react'
import './progress.less'

class Progress extends Component {
    changeProgressBar(e) {
        let progressBar = this.refs.progressBar;
        let playedProgressLength = e.clientX - progressBar.getBoundingClientRect().left
        let wholeProgressLength = progressBar.clientWidth
        let percentage = playedProgressLength / wholeProgressLength
        
        this.props.onProgressChange(percentage)
    }

    render() {
        return (
            <div className="component-progress" ref="progressBar" onClick={this.changeProgressBar.bind(this)}>
                    <div className="current-progress" 
                        style={{width: `${this.props.progress}%`, background: this.props.barColor}}>
                    </div>
            </div>
        )
    }
}

Progress.defaultProps = { 
    barColor: '#2f9842'
}

export default Progress