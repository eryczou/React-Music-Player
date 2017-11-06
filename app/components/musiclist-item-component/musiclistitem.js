import './musiclistitem.less'
import React, { Component } from 'react'
import PubSub from 'pubsub-js'

class MusicListItem extends Component {
    playMusic(musicItem) {
        PubSub.publish('PLAY_MUSIC', musicItem)
    }

    deleteMusic(musicItem, e) {
        e.stopPropagation()
        PubSub.publish('DELETE_MUSIC', musicItem)
    }

    render() {
        let deleteStyle = {
            'float':'right'
        }
        let musicItem = this.props.item;
        return (
            <div>
                <li onClick={this.playMusic.bind(this, musicItem)} className={`${this.props.currentItem == musicItem? 'focus':''}`}>
                    <div><strong>{musicItem.title}</strong> - {musicItem.artist}</div>
                    <i onClick={this.deleteMusic.bind(this, musicItem)} style={deleteStyle} className="fa fa-trash fa-lg" aria-hidden="true"></i>
                </li>
            </div>
        )
    }
}

export default MusicListItem