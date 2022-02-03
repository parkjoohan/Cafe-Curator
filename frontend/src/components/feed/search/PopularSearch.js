import React from 'react';
import './css/Popular.css'
import Feed from '../main/Feed';

export default function PopularSearch(props) {
    return (
        
            <Feed setFootershow={props.setFootershow}/>
        
    );
}
