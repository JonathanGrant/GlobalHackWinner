var ShelterForm = React.createClass({
    getInitialState() {
        return {
            numBeds: 0,
            numChairs: 0,
            shelterName: ""
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
    onShelterNameChange: function(event) {
        this.setState({shelterName: event.target.value})
    },
    submitShelter: function() {
        this.props.sub(this.state.shelterName, this.state.numBeds, this.state.numChairs)
    },
    render: function() {
        return (
            <div>
                Enter name of Shelter: <input onChange={this.onShelterNameChange}></input>
                <br/>
                <button onClick={this.lessBeds}>-</button>
                You have {this.state.numBeds} beds.
                <button onClick={this.moreBeds}>+</button>
                <br/>
                <button onClick={this.lessChairs}>-</button>
                You have {this.state.numChairs} chairs.
                <button onClick={this.moreChairs}>+</button>
                <br/>
                <button onClick={this.submitShelter}>Submit</button>
            </div>
            )
    }
});
var Page = React.createClass({
    getInitialState() {
        return {
            clickedSubmit: false,
            shelterName: "",
            numBeds: 0,
            numChairs: 0
        }
    },
    whenSubmitClicked: function(shelterName, numBeds, numChairs) {
        this.setState({
            clickedSubmit: true,
            shelterName: shelterName,
            numBeds: numBeds,
            numChairs: numChairs
        })
    },
    render: function() {
        if(!this.state.clickedSubmit) {
            return (
                <ShelterForm sub={this.whenSubmitClicked} />
                )
        } else {
            return (
                <div>
                    Submitted! Thank you :) {(this.state.shelterName != "") ? this.state.shelterName : "unknown shelter"} with {this.state.numBeds} beds and {this.state.numChairs} chairs.
                </div>
                )
        }
    }
});

ReactDOM.render(<Page />, document.getElementById('container'));