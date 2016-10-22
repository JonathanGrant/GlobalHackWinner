//Creates the general form for the shelter. Keeps track of the shelter's name, number of beds
var ShelterForm = React.createClass({

	//Initializes variables as empty
	getInitialState: function(){
		return{
			occupiedBeds: 0,
			maxBedCapacity: 0,
			shelterName: '',
			editMode: true,
            programTypes: [{text: 'Permanent Supportive Housing', value: 'permanent'}, {text: 'Rapid Rehousing', value: 'rapid'}],
            peopleTypes: [{text: 'Everyone', value: 'e'}, {text: 'Adult Men', value: 'm'}, {text: 'Youth', value: 'y'}, {text: 'Abused Women', value: 'w'}]
		}
	},

	//Subtracts one bed, as long as there are beds to subtract (you can't have negative beds)
	addOccupant: function(){
		if(this.state.occupiedBeds>0){
			var newOccupiedBeds = this.state.occupiedBeds - 1
			this.setState({occupiedBeds: newOccupiedBeds})
		}
	},

	//Adds one bed
	removeOccupant: function(){
		var newOccupiedBeds = this.state.occupiedBeds + 1
		this.setState({occupiedBeds: newOccupiedBeds})
	},

	//Stores the user input (event) in shelterName
	shelterNameChange: function(event){
		this.setState({shelterName: event.target.value})
	},

	//Stores the max bed capacity
	shelterMaxCapacity: function(event){
		this.setState({maxBedCapacity: event.target.value})
	},

	//When the user clicks the submit button, pass the current values
	//Sub points to the sub in the ShelterForm tag
	submitShelter: function(){
		this.setState({editMode: false})
		this.props.sub(this.state.shelterName, this.state.occupiedBeds, this.state.maxBedCapacity)
	},

    drawOption: function(x) {
        return (<option key={x.value} value={x.value}>{x.text}</option>)
    },

    setEditMode: function(){
    	this.setState({editMode: true})
    },

	render: function(){
		return(
			<div>
				Enter name of Shelter: 
				<input onChange={this.shelterNameChange} />
				<br />

				Enter max occupancy of Shelter:
				<input onChange={this.shelterMaxCapacity} />
				<br />

                Choose type of Shelter:
                <select>
                    {_.map(this.state.programTypes, this.drawOption)}
                </select>

                <br />
                Who is allowed in your Shelter?
                <select>
                    {_.map(this.state.peopleTypes, this.drawOption)}
                </select>

                <br />
				<button onClick={this.addOccupant}>-</button>
				You have {this.state.occupiedBeds} beds and {this.state.maxBedCapacity-this.state.occupiedBeds} available beds.
				<button onClick={this.removeOccupant}>+</button>

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
			editMode: true,
			shelterName: "",
			occupiedBeds: 0,
			maxBedCapacity: 0,
		}
	},

	//When the user has clicked submit, store the passed values
	whenSubmitClicked: function(shelterName, occupiedBeds, maxBedCapacity){
		this.setState({
			submitClicked: true,
			editMode: false;
			shelterName: shelterName,
			occupiedBeds: occupiedBeds,
			maxBedCapacity: maxBedCapacity,
		})
	},

	render: function(){
		if(!this.state.submitClicked || this.state.editMode){
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
					{(this.state.shelterName.length > 0) ? this.state.shelterName: "Unnamed shelter"} has {this.state.occupiedBeds}/{this.state.maxBedCapacity} beds.

					<button onClick={this.setEditMode}>Edit</button>
				</div>
			)
		}
	}
})

ReactDOM.render(<Page />, document.getElementById('container'))