import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';
// import 'react-select/dist/react-select.css';
import '../example.css';
import Button from 'react-bootstrap/lib/Button';

function choice_data(choices, q_id) {
	var j, Choice_Options = []
	for (j = 0; j < choices.length; j++)
		{if (choices[j].question == q_id)
		Choice_Options.push({ label: choices[j].choice_text, value: choices[j].choice_text, question: choices[j].question,
									compliance_status: choices[j].compliance_status})
		}
	return Choice_Options
		}

const buttonStyle = {marginTop:'10px', float:'right'}

class MultiSelectField extends React.Component {

// var MultiSelectField = createClass({
// 	displayName: 'MultiSelectField',
// 	propTypes: {
// 		label: PropTypes.oneOf([PropTypes.object, PropTypes.array, PropTypes.string]),
// 	},

	constructor(props) {
		super(props);

	this.state = 
		 {
			removeSelected: false,
			disabled: false,
			crazy: false,
			stayOpen: false,
			value: [],
			compliance_status: [],
			rtl: false,
			questions:[],
			choices:[],
			subquestions: [],
			subchoices: [],
			Choice_Options:[]
		};
	this.handleSelectChange = this.handleSelectChange.bind(this);

	}

	handleSelectChange (value) {
		console.log('You\'ve selected:', value);
		this.setState({ value });
	}

	
	toggleCheckbox (e) {
		this.setState({
			[e.target.name]: e.target.checked,
		});
	}
	toggleRtl (e) {
		let rtl = e.target.checked;
		this.setState({ rtl });
	}

	componentWillMount() {
		fetch('http://127.0.0.1:8000/api/').then(response => response.json())
		.then(data => this.setState({ questions: data }));
		
		fetch('http://127.0.0.1:8000/api/choice').then(response => response.json())
		.then(data => this.setState({ choices: data }));

		fetch('http://127.0.0.1:8000/api/subquestions').then(response => response.json())
		.then(data => this.setState({ subquestions: data }));

		fetch('http://127.0.0.1:8000/api/subchoices').then(response => response.json())
		.then(data => this.setState({ subchoices: data }));

		  }

	componentWillReceiveProps(newProps) {
			this.setState({value: newProps.value});
		}

	handleSubmit() {
		console.log('submitted')
	}

	
	render () {
	
		const { questions, choices, subquestions, subchoices, Choice_Options } = this.state;
		
		var outcome = choices.filter(choice => choice.question==this.props.q_id).filter(choice => choice.choice_text==this.state.value).map(choice => choice.compliance_status)

		var subquestion_text = subquestions.filter(text => text.question==this.props.q_id).filter(text => text.outcome==outcome).map(text => text.question_text)

		var text = questions.filter(text => text.id==this.props.q_id).map(text => text.question_text)

		var choice_type = questions.filter(choice => choice.id==this.props.q_id).map(choice => choice.choice_type)

		var choice_type2 = (choice_type=="1") ? false : true

		const options = choice_data(choices, this.props.q_id)

		const { crazy, disabled, stayOpen, value, autoFocus, autosize, type, compliance_status } = this.state;

		var question_string = ''
		return (

			<div className="section">
			<div >

				<h3 className="section"> {text} </h3>
				<Select
					closeOnSelect={false}
					disabled={disabled}
					multi={choice_type2}
					onChange={this.handleSelectChange}
					options={options}
					placeholder="Select your answer(s)"
          			removeSelected={true}
					rtl={this.state.rtl}
					simpleValue
					value={value}
					compliance_status={compliance_status}
					autoFocus={!autoFocus}
					autosize={!autosize}
				/>

			</div>
			<div>
				<Button bsStyle="primary" style={buttonStyle} onClick={this.handleSubmit}> 
				Submit
				</Button>
			</div>

					{/* <div className="checkbox-list">
					<label className="checkbox">
						<input type="checkbox" className="checkbox-control" name="removeSelected" checked={this.state.removeSelected} onChange={this.toggleCheckbox} />
						<span className="checkbox-label">Remove selected options</span>
					</label>
				</div> */}
			</div>
		);
	}
}

// module.exports = MultiSelectField;
export default MultiSelectField;
