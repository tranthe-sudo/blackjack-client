import React from 'react';
import './Player.css';
import { PLAY_HIT, PLAY_STAY, REQUEST_TO_PLAY } from '../Event';
import { NULL, WIN, LOSE } from '../State';



class Player extends React.Component {

    render() {

        var statusDiv;
        if (this.props.playerObj.state === NULL) {
            statusDiv = <p>  </p>
        } else if (this.props.playerObj.state === WIN) {
            statusDiv = <p>Win</p>
        } else if (this.props.playerObj.state === LOSE) {
            statusDiv = <p>Lost</p>
        }

        var controlBtn;
        if (this.props.playerObj.isReady === true) {
            controlBtn = <div className="control-btn">
            <button className="hit-btn" onClick={ () => this.props.handleSendRequest(PLAY_HIT) }>Hit</button>
            <button className="stay-btn" onClick={ () => this.props.handleSendRequest(PLAY_STAY) }>Stay</button>
        </div>
        } else {
            controlBtn = <button className="ready-btn" onClick={ () => this.props.handleSendRequest(REQUEST_TO_PLAY) }>Ready</button>
        }

        if (this.props.mainPlayer === "false") {
            return (
                <div className="player-container" key={ this.props.playerObj } >
                    <div className="card-view-area">
                    { this.props.playerObj.cards && this.props.playerObj.cards.map(function(elem, index) {
                            return <div className="card-wrapper" key={ elem.id }><img alt="#" src={"./assets/" + elem + ".png"} width="80px"></img></div>;
                    }) }
                    </div>
                    { statusDiv }
                    <div className="player-name" style={{color: this.props.playerObj.isCurrent ? "red" : "white"}}>
                        <p>{ this.props.playerObj.name }</p>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="player-container" key={ this.props.playerObj } >
                    <div className="card-view-area">
                        { this.props.playerObj.cards && this.props.playerObj.cards.map(function(elem, index) {
                            return <div className="card-wrapper" key={ elem.id }><img alt="#" src={"./assets/" + elem + ".png"} width="80px"></img></div>;
                        }) }
                    </div>
                    { statusDiv }
                    <div className="player-name" style={{color: this.props.playerObj.isCurrent ? "red" : "white"}}>
                        <p>{ this.props.playerObj.name }</p>
                    </div>

                    { controlBtn }
                    
                </div>
            )
        }
    }
}

export default Player;