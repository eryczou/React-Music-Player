import React, {Component} from 'react';
import MusicListItem from '../components/musiclist-item-component/musiclistitem'
import { Link } from 'react-router-dom'
import './musiclist.less'

class MusicList extends Component {
    render() {
        let listEle = null
        listEle = this.props.musicList.map((item) => {
            return <MusicListItem key={item.id} currentItem = {this.props.currentMusicItem} item={item} />
        })
        return (
            <div>
                <Link style={{textDecoration:'none'}} to="/">
                    <button className="btnClass">返回</button>
                </Link>
                <ul>
                    {listEle}
                </ul>
            </div>
        )
    }
}

export default MusicList