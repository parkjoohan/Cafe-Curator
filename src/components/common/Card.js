import React from 'react';

export default function card(props) {

    let newClassName = `color_bg ${props.alt}`
    let bg_img = `url(${props.images})`
    let {title, sub_title, alt, images} = props

    return (
        <div className='card'>
            <div className='wrapper'>
                <div className={newClassName}></div>
                <div className="card_img" style={{ "backgroundImage": bg_img }}></div>
                <div className='cardInfo'>
                    <h5>{title}</h5>
                    <h8>{sub_title}</h8>
                </div>
            </div>
        </div>
    )
}