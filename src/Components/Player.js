import React from 'react';
import './Player.css';
import { PLAY_HIT, PLAY_STAY, REQUEST_TO_PLAY } from '../Event';
import { NULL, WIN } from '../State';


class Player extends React.Component {

    render() {

        var statusDiv;
        if (this.props.playerObj.state === NULL) {
            statusDiv = <p>Null</p>
        } else if (this.props.playerObj.state === WIN) {
            statusDiv = <p>Win</p>
        } else {
            statusDiv = <p>Lost</p>
        }


        if (this.props.mainPlayer === "false") {
            return (
                <div className="player-container" key={ this.props.playerObj } >
                    <div className="card-view-area">
                    { this.props.playerObj.cards && this.props.playerObj.cards.map(function(elem, index) {
                            return <p key={ elem.id }><img src={"./assets/" + elem + ".png"} width="40%"></img></p>;
                    }) }
                    </div>
                    { statusDiv }
                    <div className="player-name">
                        <p>{ this.props.playerObj.name }</p>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="player-container" key={ this.props.playerObj } >
                    <div className="card-view-area">
                        { this.props.playerObj.cards && this.props.playerObj.cards.map(function(elem, index) {
                            return <p key={ elem.id }><img src={"./assets/" + elem + ".png"} width="40%"></img></p>;
                        }) }
                    </div>
                    { statusDiv }
                    <div className="player-name">
                        <p>{ this.props.playerObj.name }</p>
                    </div>
                    <div className="control-btn">
                        <button className="hit-btn" onClick={ () => this.props.handleSendRequest(PLAY_HIT) }>Hit</button>
                        <button className="stay-btn" onClick={ () => this.props.handleSendRequest(PLAY_STAY) }>Stay</button>
                    </div>
                    <button className="ready-btn" onClick={ () => this.props.handleSendRequest(REQUEST_TO_PLAY) }>Ready</button>
                </div>
            )
        }
    }
}

export default Player;