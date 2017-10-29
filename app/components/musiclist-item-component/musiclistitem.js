import React from 'react'
import './musiclistitem.less'

const MusicListItem = (props) => {
    let item = props.item
    return (
        <li className={`${props.currentItem == item? 'focus':''}`}><strong>{item.title}</strong> - {item.artist}</li>
    )
}

export default MusicListItem