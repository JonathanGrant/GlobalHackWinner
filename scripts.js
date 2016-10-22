var ShelterForm = React.createClass({
    getInitialState() {
        return {
            myBeds: 0,
            myChair: 0
        }
    },
    lessBeds: function() {
        var newNumBeds = this.state.numBeds - 1
        this.setState({numBeds: newNumBeds})
    },
    moreBeds: function() {
        var newNumBeds = this.state.numBeds + 1
        this.setState({numBeds: newNumBeds})
    },
    lessChairs: function() {
        var newNumChairs = this.state.numChairs - 1
        this.setState({numChairs: newNumChairs})
    },
    moreChairs: function() {
        var newNumChairs = this.state.numChairs + 1
        this.setState({numChairs: newNumChairs})
    },
    render: function() {
        return (
            <div>
                Enter name of Shelter: <input></input>
                <br/>
                <button onClick={this.lessBeds}>-</button>
                You have {this.state.numBeds} beds.
                <button onClick={this.moreBeds}>+</button>
                <br/>
                <button onClick={this.lessChairs}>-</button>
                You have {this.state.numChairs} chairs.
                <button onClick={this.moreChairs}>+</button>
                <br/>
                <button onClick={this.props.sub}>Submit</button>
            </div>
            )
    }
});
var Page = React.createClass({
    getInitialState() {
        return {
            clickedSubmit: false
        }
    },
    whenSubmitClicked: function() {
        this.setState({clickedSubmit: true})
    },
    render: function() {
        if(!this.state.clickedSubmit) {
            return (
                <ShelterForm sub={this.whenSubmitClicked} />
                )
        } else {
            return (
                <div>
                    Submitted! Thank you :)
                </div>
                )
        }
    }
});

ReactDOM.render(<Page />, document.getElementById('container'));