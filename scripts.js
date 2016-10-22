//Creates the general form for the shelter. Keeps track of the shelter's name, number of beds
var ShelterForm = React.createClass({

	//Initializes variables as empty
	getInitialState: function(){
		return{
			numBeds: 0,
			shelterName: ''
		}
	},

	//Subtracts one bed, as long as there are beds to subtract (you can't have negative beds)
	lessBeds: function(){
		if(this.state.numBeds>0){
			var newNumBeds = this.state.numBeds - 1
			this.setState({numBeds: newNumBeds})
		}
	},

	//Adds one bed
	moreBeds: function(){
		var newNumBeds = this.state.numBeds + 1
		this.setState({numBeds: newNumBeds})
	},

	//Stores the user input (event) in shelterName
	shelterNameChange: function(event){
		this.setState({shelterName: event.target.value})
	},

	//When the user clicks the submit button, pass the current value of shelterName, numBeds to whenSubmitClicked 
	//Sub points to the sub in the ShelterForm tag
	submitShelter: function(){
		this.props.sub(this.state.shelterName, this.state.numBeds)
	},

	render: function(){
		return(
			<div>
				Enter name of Shelter: 
				<input onChange={this.shelterNameChange} />

				<br />
				<button onClick={this.lessBeds}>-</button>
				You have {this.state.numBeds} beds.
				<button onClick={this.moreBeds}>+</button>

				<br />
				<button onClick={this.submitShelter}>Submit</button>
			</div>
		)
	}
})


var Page = React.createClass({

	//This is redundant, but required to access these variables
	getInitialState: function(){
		return {
			submitClicked: false,
			shelterName: "",
			numBeds: 0,
		}
	},

	//When the user has clicked submit, store the passed values
	whenSubmitClicked: function(shelterName, numBeds){
		this.setState({
			submitClicked: true,
			shelterName: shelterName,
			numBeds: numBeds,
		})
	},

	render: function(){
		if(!this.state.submitClicked){
			return(
				<ShelterForm sub={this.whenSubmitClicked} />
			)
		} 
		// When the user has clicked the submit button, print out the final number of beds
		else {
			return(
				<div>
					Submitted.
					<br />
					{(this.state.shelterName.length > 0) ? this.state.shelterName: "Unnamed shelter"} has {this.state.numBeds} beds.
				</div>
			)
		}
	}
})

ReactDOM.render(<Page />, document.getElementById('container'))