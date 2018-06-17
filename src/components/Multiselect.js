import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

async function question_request() {
	try {
	  const question_result =  await fetch('http://127.0.0.1:8000/api/');
  //    const choice =  await fetch('http://127.0.0.1:8000/api/choice');
	  return await question_result.json();
  //    var quizChoice1 =  await choice.json();
	}
	catch (rejectedValue) {
	}
  }
  
async function choice_request() {
	try {
  //    const res =  await fetch('http://127.0.0.1:8000/api/');
	  const choice =  await fetch('http://127.0.0.1:8000/api/choice');
	  return await choice.json();
  //    var quizChoice1 =  await choice.json();
	}
	catch (rejectedValue) {
	}
  }

//Questions
var i, Questions_List=[]
function question_data(questions) {
	for (i = 0; i < questions.length; i++)
		{if  (questions[i].id == 3)
		Questions_List.push({id: questions[i].id, question: questions[i].question_text, type: questions[i].choice_type })
		}
	
	console.log(Questions_List)
	// console.log(Questions_List[0].question)
	// return ((Questions_List))
}

function Questions() { return question_request().then(function(result) {

	question_data(result)
	// console.log(Questions_List[0].question)
	return Questions_List[0].question
 })}
 
Questions();

function Questions2() { return question_request().then(function(result) {
	return Questions_List[0].question
 })}

console.log(Questions2())
//  console.log("test" + Questions_List)


//Choices
var j, Choice_Options=[]
function choice_data(choices) {
		for (j = 0; j < choices.length; j++)
			{if (choices[j].question == 3)
			Choice_Options.push({ label: choices[j].choice_text, value: choices[j].choice_text, question: choices[j].question})
			}
	 console.log(Choice_Options)
}

function Choices() { return choice_request().then(function(result1) {

	choice_data(result1)
 })}

Choices();



const WHY_WOULD_YOU = [
	{ label: 'Chocolate (are you crazy?)', value: 'Switch', disabled: true },
].concat(Choice_Options.slice(1));


var MultiSelectField = createClass({
	displayName: 'MultiSelectField',
	propTypes: {
		label: PropTypes.oneOf([PropTypes.object, PropTypes.array, PropTypes.string]),
	},

	getInitialState () {
		return {
			removeSelected: true,
			disabled: false,
			crazy: false,
			stayOpen: false,
			value: [],
			rtl: false,
		};
	},
	handleSelectChange (value) {
		console.log('You\'ve selected:', value);
		this.setState({ value });
	},
	toggleCheckbox (e) {
		this.setState({
			[e.target.name]: e.target.checked,
		});
	},
	toggleRtl (e) {
		let rtl = e.target.checked;
		this.setState({ rtl });
	},

	render () {
		const { crazy, disabled, stayOpen, value, autoFocus } = this.state;
		const options = crazy ? WHY_WOULD_YOU : Choice_Options;
		// var question_string = Questions()
		var question_string = ''
		return (
			<div className="section">
				<h3 className="section"> {this.props.example} </h3>
				<Select
					closeOnSelect={!stayOpen}
					disabled={disabled}
					multi
					onChange={this.handleSelectChange}
					options={options}
					placeholder="Select your answer(s)"
          			removeSelected={this.state.removeSelected}
					rtl={this.state.rtl}
					simpleValue
					value={value}
					autoFocus={!autoFocus}
				/>

				<div className="checkbox-list">
					<label className="checkbox">
						<input type="checkbox" className="checkbox-control" name="removeSelected" checked={this.state.removeSelected} onChange={this.toggleCheckbox} />
						<span className="checkbox-label">Remove selected options</span>
					</label>
					<label className="checkbox">
						<input type="checkbox" className="checkbox-control" name="disabled" checked={this.state.disabled} onChange={this.toggleCheckbox} />
						<span className="checkbox-label">Disable the control</span>
					</label>
					<label className="checkbox">
						<input type="checkbox" className="checkbox-control" name="crazy" checked={crazy} onChange={this.toggleCheckbox} />
						<span className="checkbox-label">I don't like Chocolate (disabled the option)</span>
					</label>
					<label className="checkbox">
						<input type="checkbox" className="checkbox-control" name="stayOpen" checked={stayOpen} onChange={this.toggleCheckbox}/>
						<span className="checkbox-label">Stay open when an Option is selected</span>
					</label>
					<label className="checkbox">
						<input type="checkbox" className="checkbox-control" name="rtl" checked={this.state.rtl} onChange={this.toggleCheckbox} />
						<span className="checkbox-label">rtl</span>
					</label>
				</div>
			</div>
		);
	}
})

module.exports = MultiSelectField;
