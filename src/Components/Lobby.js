import React from 'react';
import './Lobby.css';
import {REQUEST_JOIN_TABLE} from '../Event';

class Lobby extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputValue: "",
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    
    handleSubmit(event) {
        let request = {
            "event": REQUEST_JOIN_TABLE,
            "data": {
                "name": this.state.inputValue,
            }
        }
        this.props.ws.send(JSON.stringify(request));
        //this.props.redirect();
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({inputValue: event.target.value});
    }

    render() {
        return (
            <div className="container">
                <h1 className="banner">Welcome To Black Jack Game!!!</h1>
                
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Enter Your Name Here:&nbsp;
                        <input type="text" value={this.state.inputValue} onChange={this.handleChange}></input>
                    </label>
                    <input className="submitBtn" type="submit" value="Join Table" required minLength="1" pattern=".+"></input>
                </form>
            </div>            
        );
    }
}

export default Lobby;