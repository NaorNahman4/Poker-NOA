import React, { useState, useEffect } from 'react';
import RandomTwoCards from './RandomCard';
import './table.css';
import cards from '../assets/cards.png';
import Card from './Card';
import Timer from '../Animations/AnimatedTimer/Timer';
import AnimatedMessage from '../Animations/AnimatedStart/AnimatedMessage';
import RangeInput from '../RangeInput/RangeInput';

const OurPlayer = (props) => {
    // State to store the generated card
    const [generatedCards, setGeneratedCard] = useState(null);

    /* State of the buttons */
    const [buttonsState, setButtonsState] = useState(0);

    /* The actual buttons */
    const [buttons, setButtons] = useState(<span className='action-container'></span>);

    // State to control Timer visibility
    const [showTimer, setShowTimer] = useState(false);

    // State to control AnimatedMessage visibility
    const [showMessage, setShowMessage] = useState(false);

    // State to store the money to call
    const [moneyToCall, setMoneyToCall] = useState(0);
    /* Socket that tells us it's our turn */
    props.socket.off('yourTurn').on('yourTurn', (moneyToCall) => {
        setMoneyToCall(moneyToCall);
        if (moneyToCall === 0) {
            console.log('Setting buttons to 1 (Can Check)');
            setButtonsState(1); 
        }
        else {
            console.log('Setting buttons to 2 (Cant Check)');
            setButtonsState(2);
        }
        // Show Timer and AnimatedMessage
        setShowTimer(true);
        setShowMessage(true);

        console.log('aaMyTurn');
    }
);

    /* Changing the buttons layout */
    useEffect(() => {
        console.log('In use effect with: ', buttonsState);
        let temp_buttons;
        switch (buttonsState) {
            case 1:
                /* Case where we can check */
                temp_buttons =
                <span className='action-container'>
                    <Timer/>
                    <button className="action-button" onClick={clickCheck}>
                        Check
                    </button>
                    <div className='raise-with-range'>
                        <button className="action-button" onClick={clickRaise}>
                            Raise
                        </button>
                        <RangeInput
                            min={0}
                            max={1000}
                            step={100}
                            initialValue={500}
                            onValueChange={() => {}} /* Empty */
                        />
                    </div>
                    <button className="action-button" onClick={clickFold}>
                        Fold
                    </button>
                </span>;
                break;
            case 2:
                /* Case where we can't check */
                temp_buttons =
                <span className='action-container'>
                    <Timer/>
                    <div className='raise-with-range'>
                        <button className="action-button" onClick={clickRaise}>
                            Raise
                        </button>
                        <RangeInput
                            min={0}
                            max={1000}
                            step={100}
                            initialValue={500}
                            onValueChange={() => {}} /* Empty */
                        />
                    </div>
                    <button className="action-button" onClick={clickCall}>
                        Call {moneyToCall}
                    </button>
                    <button className="action-button" onClick={clickFold}>
                        Fold
                    </button>
                </span>;
                break;
            default:
                temp_buttons = <span className='action-container'></span>;
                break;
        }
        setButtons(temp_buttons);
      }, [buttonsState, moneyToCall]);
    
    //clickRaise function to send 'raise' event to the server
    const clickRaise = () => {
        setShowTimer(false);
        setShowMessage(false);
        props.socket.emit('playerAction',"raise", 100);
    };
    //clickCall function to send 'call' event to the server
    const clickCall = () => {
        setShowTimer(false);
        setShowMessage(false);
        props.socket.emit('playerAction',"call",null);
    };
    const clickCheck = () => {
        setShowTimer(false);
        setShowMessage(false);
        props.socket.emit('playerAction',"check",null);
    };
    const clickFold = () => {
        setShowTimer(false);
        setShowMessage(false);
        props.socket.emit('playerAction',"fold",null);
    };

    /* Get cards from the Server and make it into html */
    props.socket.off('getCards').on('getCards', (cards) => {
        const card1 = GenericDeck.find(card => card.id === cards[0].id);
        const card2 = GenericDeck.find(card => card.id === cards[1].id);
        const generated = 
            <div className="RandomCard">
                {/* Render two random Card components */}
                <div className="right">
                    <Card pic={card1.pic} suit={card1.suit} value={card1.value} />
                </div>
                <div className="left">
                    <Card pic={card2.pic} suit={card2.suit} value={card2.value} />
                </div>
            </div>;
        setGeneratedCard(generated);
    });

    const GenericDeck = [
        { id: 1, pic: require('../assets/cards/10_of_clubs.png'), suit: 'Clubs', value: '10' },
        { id: 2, pic: require('../assets/cards/10_of_diamonds.png'), suit: 'Diamonds', value: '10' },
        { id: 3, pic: require('../assets/cards/10_of_hearts.png'), suit: 'Hearts', value: '10' },
        { id: 4, pic: require('../assets/cards/10_of_spades.png'), suit: 'Spades', value: '10' },
        { id: 5, pic: require('../assets/cards/2_of_clubs.png'), suit: 'Clubs', value: '2' },
        { id: 6, pic: require('../assets/cards/2_of_diamonds.png'), suit: 'Diamonds', value: '2' },
        { id: 7, pic: require('../assets/cards/2_of_hearts.png'), suit: 'Hearts', value: '2' },
        { id: 8, pic: require('../assets/cards/2_of_spades.png'), suit: 'Spades', value: '2' },
        { id: 9, pic: require('../assets/cards/3_of_clubs.png'), suit: 'Clubs', value: '3' },
        { id: 10, pic: require('../assets/cards/3_of_diamonds.png'), suit: 'Diamonds', value: '3' },
        { id: 11, pic: require('../assets/cards/3_of_hearts.png'), suit: 'Hearts', value: '3' },
        { id: 12, pic: require('../assets/cards/3_of_spades.png'), suit: 'Spades', value: '3' },
        { id: 13, pic: require('../assets/cards/4_of_clubs.png'), suit: 'Clubs', value: '4' },
        { id: 14, pic: require('../assets/cards/4_of_diamonds.png'), suit: 'Diamonds', value: '4' },
        { id: 15, pic: require('../assets/cards/4_of_hearts.png'), suit: 'Hearts', value: '4' },
        { id: 16, pic: require('../assets/cards/4_of_spades.png'), suit: 'Spades', value: '4' },
        { id: 17, pic: require('../assets/cards/5_of_clubs.png'), suit: 'Clubs', value: '5' },
        { id: 18, pic: require('../assets/cards/5_of_diamonds.png'), suit: 'Diamonds', value: '5' },
        { id: 19, pic: require('../assets/cards/5_of_hearts.png'), suit: 'Hearts', value: '5' },
        { id: 20, pic: require('../assets/cards/5_of_spades.png'), suit: 'Spades', value: '5' },
        { id: 21, pic: require('../assets/cards/6_of_clubs.png'), suit: 'Clubs', value: '6' },
        { id: 22, pic: require('../assets/cards/6_of_diamonds.png'), suit: 'Diamonds', value: '6' },
        { id: 23, pic: require('../assets/cards/6_of_hearts.png'), suit: 'Hearts', value: '6' },
        { id: 24, pic: require('../assets/cards/6_of_spades.png'), suit: 'Spades', value: '6' },
        { id: 25, pic: require('../assets/cards/7_of_clubs.png'), suit: 'Clubs', value: '7' },
        { id: 26, pic: require('../assets/cards/7_of_diamonds.png'), suit: 'Diamonds', value: '7' },
        { id: 27, pic: require('../assets/cards/7_of_hearts.png'), suit: 'Hearts', value: '7' },
        { id: 28, pic: require('../assets/cards/7_of_spades.png'), suit: 'Spades', value: '7' },
        { id: 29, pic: require('../assets/cards/8_of_clubs.png'), suit: 'Clubs', value: '8' },
        { id: 30, pic: require('../assets/cards/8_of_diamonds.png'), suit: 'Diamonds', value: '8' },
        { id: 31, pic: require('../assets/cards/8_of_hearts.png'), suit: 'Hearts', value: '8' },
        { id: 32, pic: require('../assets/cards/8_of_spades.png'), suit: 'Spades', value: '8' },
        { id: 33, pic: require('../assets/cards/9_of_clubs.png'), suit: 'Clubs', value: '9' },
        { id: 34, pic: require('../assets/cards/9_of_diamonds.png'), suit: 'Diamonds', value: '9' },
        { id: 35, pic: require('../assets/cards/9_of_hearts.png'), suit: 'Hearts', value: '9' },
        { id: 36, pic: require('../assets/cards/9_of_spades.png'), suit: 'Spades', value: '9' },
        { id: 37, pic: require('../assets/cards/ace_of_clubs.png'), suit: 'Clubs', value: 'Ace' },
        { id: 38, pic: require('../assets/cards/ace_of_diamonds.png'), suit: 'Diamonds', value: 'Ace' },
        { id: 39, pic: require('../assets/cards/ace_of_hearts.png'), suit: 'Hearts', value: 'Ace' },
        { id: 40, pic: require('../assets/cards/ace_of_spades.png'), suit: 'Spades', value: 'Ace' },
        { id: 41, pic: require('../assets/cards/king_of_clubs.png'), suit: 'Clubs', value: 'King' },
        { id: 42, pic: require('../assets/cards/king_of_diamonds.png'), suit: 'Diamonds', value: 'King' },
        { id: 43, pic: require('../assets/cards/king_of_hearts.png'), suit: 'Hearts', value: 'King' },
        { id: 44, pic: require('../assets/cards/king_of_spades.png'), suit: 'Spades', value: 'King' },
        { id: 45, pic: require('../assets/cards/queen_of_clubs.png'), suit: 'Clubs', value: 'Queen' },
        { id: 46, pic: require('../assets/cards/queen_of_diamonds.png'), suit: 'Diamonds', value: 'Queen' },
        { id: 47, pic: require('../assets/cards/queen_of_hearts.png'), suit: 'Hearts', value: 'Queen' },
        { id: 48, pic: require('../assets/cards/queen_of_spades.png'), suit: 'Spades', value: 'Queen' },
        { id: 49, pic: require('../assets/cards/jack_of_clubs.png'), suit: 'Clubs', value: 'Jack' },
        { id: 50, pic: require('../assets/cards/jack_of_diamonds.png'), suit: 'Diamonds', value: 'Jack' },
        { id: 51, pic: require('../assets/cards/jack_of_hearts.png'), suit: 'Hearts', value: 'Jack' },
        { id: 52, pic: require('../assets/cards/jack_of_spades.png'), suit: 'Spades', value: 'Jack' }
    ];

    return (
        <>
            <div className="our-player">
                money {props.money} $ <br />
                name {props.name}
                <div className='our-cards'>{generatedCards}</div>
                <span className='action-container'>
                    {buttons}
                </span>
            </div>
        </>
    );
};

export default OurPlayer;
