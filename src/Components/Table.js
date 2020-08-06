import React from 'react';
import './Table.css';
import Player from './Player';
import Dealer from './Dealer';
import { JOIN_TABLE_RESPONSE, JOIN_TABLE_BROADCAST_RESPONSE, REQUEST_TO_PLAY, PLAY_HIT, PLAY_STAY, UPDATE_TABLE_STATE_BROADCAST_RESPONSE } from '../Event';

class Table extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            update: false,
        }

        this.handleSendRequest = this.handleSendRequest.bind(this);

        this.websocket = props.ws;

        this.playerAtPos1 = {};
        this.playerAtPos2 = {};  // main player
        this.playerAtPos3 = {};

        this.playerAtPos1_ID = "";
        this.playerAtPos2_ID = "";
        this.playerAtPos3_ID = "";

        this.dealerObj = {};
    }
    
    componentDidMount() {
        this.websocket.onmessage = (e) => {
            let response = JSON.parse(e.data);

            if ( response.event === JOIN_TABLE_RESPONSE ) {

                this.playerAtPos2 = response.data;

            } else if ( response.event === JOIN_TABLE_BROADCAST_RESPONSE ) {
                
                response.data.players.forEach(obj => {
                    if( obj.type === "player") {
                        if ( obj.id !== this.playerAtPos2.id ) {
                            if ( Object.keys(this.playerAtPos1).length === 0 ) {
                                
                                this.playerAtPos1 = obj;

                            } else if ( obj.id !== this.playerAtPos1.id) {
                                this.playerAtPos3 = obj;
                            }
                        } 
                    }
                });

                // this.setPlayerID();

            } else if (  response.event === UPDATE_TABLE_STATE_BROADCAST_RESPONSE ) {
                // Using stored ID for each player to update each playerObj
                // Including update the dealer Object
                localStorage.setItem("players", JSON.stringify(response.data.players));


                response.data.players.forEach(obj => {
                    if ( obj.id === this.playerAtPos2_ID ) {
                        this.playerAtPos2 = obj;
                    }
                });

                response.data.players.forEach(obj => {
                    if ( obj.type === "dealer" ) {
                        this.dealerObj = obj;
                    }
                });
                

                if ( this.playerAtPos1_ID !== undefined ) {
                    localStorage.setItem("set player 1", "yes")
                    response.data.players.forEach(obj => {
                        if ( obj.id === this.playerAtPos1_ID ) {
                            this.playerAtPos1 = obj;
                        }
                    });
                }

                if ( this.playerAtPos3_ID !== undefined ) {
                    localStorage.setItem("set player 3", "yes")
                    response.data.players.forEach(obj => {
                        if ( obj.id === this.playerAtPos3_ID ) {
                            this.playerAtPos3 = obj;
                        }
                    });
                }

                localStorage.setItem("1", JSON.stringify(this.playerAtPos1.cards));
                localStorage.setItem("2", JSON.stringify(this.playerAtPos2.cards));
                localStorage.setItem("3", JSON.stringify(this.playerAtPos3.cards));
            }
            
            // get call after every received JOIN_TABLE_RESPONSE
            // or every time a new user join the table
            this.setPlayerID();
            
            

            // localStorage.setItem("1ID", JSON.stringify(this.playerAtPos1_ID));
            // localStorage.setItem("2ID", JSON.stringify(this.playerAtPos2_ID));
            // localStorage.setItem("3ID", JSON.stringify(this.playerAtPos3_ID));

            this.setState({
                update: true,
            })
        }
    }

    // After user join the room, capture their ID cuz it is 
    // likely to change unless the user disconnect from the server
    setPlayerID() {
        if ( this.playerAtPos1 !== {} ) {
            
            this.playerAtPos1_ID = this.playerAtPos1.id;            
            
        }

        if ( this.playerAtPos2 !== {} ) {

            this.playerAtPos2_ID = this.playerAtPos2.id;
        
        }
        
        if ( this.playerAtPos3 !== {} ) {

            this.playerAtPos3_ID = this.playerAtPos3.id;

        }
    }

    handleSendRequest(request) {
        let requestJSONString = "";

        // request to set the player to ready to play stay
        if ( request === REQUEST_TO_PLAY ) {
            
            requestJSONString = this.sendReady();
            this.websocket.send(requestJSONString)

        } else {
            
            requestJSONString = this.buildRequest(request);

            // Test if the player is current or not
            if ( this.playerAtPos2.isCurrent === true ) {
                this.websocket.send(requestJSONString);
            }

        }
    }

    buildRequest(request) {
        if ( request === PLAY_HIT ) {
            
            return JSON.stringify({
                event: PLAY_HIT,
                data: {
                    id: this.playerAtPos2_ID,
                }
            })
        
        } else if ( request === PLAY_STAY ) {
            
            return JSON.stringify({
                event: PLAY_STAY,
                data: {
                    id: this.playerAtPos2_ID,
                }
            })

        }
    }

    sendReady() {
        console.log("send a request to play!")

        return JSON.stringify({
            event: REQUEST_TO_PLAY,
            data: {
                id: this.playerAtPos2_ID,
            }
        })
    }



    render() {
        return (
            <div className="container">
                <div className="dealer"> 
                    <Dealer dealerObj={ this.dealerObj} />
                </div>

                <div className="player-area">
                    <Player playerObj={ this.playerAtPos1 } mainPlayer="false" />
                    <Player playerObj={ this.playerAtPos2 } mainPlayer="true"  handleSendRequest={ this.handleSendRequest } />
                    <Player playerObj={ this.playerAtPos3 } mainPlayer="false" />
                </div>
            </div>
        )
    }
}


export default Table;