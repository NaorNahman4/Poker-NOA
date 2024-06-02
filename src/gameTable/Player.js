import React, { useState } from 'react';
import RandomTwoCards from './RandomCard';
import './table.css';
import cards from '../assets/cards.png';
import Timer from '../Animations/AnimatedTimer/Timer';

const Player = (props) => {
    
    return (
        <div className={props.className}>
            {props.timer ? <Timer /> : null}
            <span className="player-name">{props.name}</span>
            <div className="player-cards">
                    <img className="hidden-cards" src={cards} alt="Player Cards" />
            </div>
        </div>
    );
};

export default Player;
