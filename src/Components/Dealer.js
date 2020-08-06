import React from "react";
import './Dealer.css';


class Dealer extends React.Component {

    render() {

        if (this.props.dealerObj.reveal === true) {
            return (
                <div className="container">
                    <div className="card-view-area">
                    { this.props.dealerObj.cards && this.props.dealerObj.cards.map(function(elem, index) {
                                return <div className="card-wrapper" key={ elem.id }><img alt="#" src={"./assets/" + elem + ".png"} width="80px"></img></div>;
                            }) }
                    </div>
                    <div className="dealer-label">
                        <p>Dealer</p>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="container">
                    <div className="card-view-area">
                    {/* { this.props.dealerObj.cards && this.props.dealerObj.cards.map(function(elem, index) {
                                return <div className="card-wrapper" key={ elem.id }><img src={"./assets/" + elem + ".png"} width="80px"></img></div>;
                            }) } */}
                        
                        { this.props.dealerObj.cards && this.props.dealerObj.cards.map(function(elem, index) {
                            if (index === 0) {
                                return <div className="card-wrapper" key={ elem.id }><img alt="#" src={"./assets/" + elem + ".png"} width="80px"></img></div>;
                            }    
                        }) }
                        <div className="card-wrapper" ><img src={"./assets/gray_back.png"} width="80px"></img></div>
                    </div>
                    <div className="dealer-label">
                        <p>Dealer</p>
                    </div>
                </div>
            )
        }
        
    }
}

export default Dealer;