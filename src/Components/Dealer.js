import React from "react";
import './Dealer.css';


class Dealer extends React.Component {


    translateToPath = (elem) => {
        return "../../assets/" + elem + ".png";
    }

    render() {
        return (
            <div className="container">
                <div className="card-view-area">
                { this.props.dealerObj.cards && this.props.dealerObj.cards.map(function(elem, index) {
                            return <p key={ elem.id }><img src={"./assets/" + elem + ".png"} width="12%"></img></p>;
                        }) }
                </div>
                <div className="dealer-label">
                    <p>Dealer</p>
                </div>
            </div>
        )
    }
}

export default Dealer;