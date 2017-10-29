import React from 'react';
import MusicListItem from '../components/musiclist-item-component/musiclistitem'
import './musiclist.less'

class MusicList extends React.Component {
    render() {
        let listEle = null
        listEle = this.props.musicList.map((item) => {
            return <MusicListItem key={item.id} currentItem = {this.props.currentMusicItem} item={item} />
        })
        return (
            <ul>
                {listEle}
            </ul>
        )
    }
}

export default MusicList