import React from 'react';
import './App.css';
import Lobby from './Components/Lobby';
import Table from './Components/Table';
import { REQUEST_ACCEPTED } from './Event';


const URL = "ws://localhost:8080/ws";

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            redirectToTable: false,
        }

    }

    // instance of websocket connection as a class property
    ws = new WebSocket(URL);

    componentDidMount() {
        this.ws.onopen = (e) => {
            console.log("Connected");
        }

        this.ws.onerror = (err) => {
            console.log("Error: ", err.message);
        }

        this.ws.onclose = (e) => {
            console.log("Disconnected");
        }

        this.ws.onmessage = (event) => {

            let response = JSON.parse(event.data);
            if ( response.event === REQUEST_ACCEPTED ) {
                this.setState({
                    redirectToTable: true,
                })
            }
        }
    }

    render() {
        if (this.state.redirectToTable === false) {
            return (
                <Lobby ws={ this.ws } />
            );
        } else {
            return (
                <Table ws={ this.ws } />
            )
        }
    }
}

export default App;
