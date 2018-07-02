import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';
// import 'react-select/dist/react-select.css';
import '../example.css';
import Button from 'react-bootstrap/lib/Button';
import PanelGroup from  'react-bootstrap/lib/PanelGroup';
import Panel from 'react-bootstrap/lib/Panel';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';

import Calendar from 'rc-calendar';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import 'rc-calendar/assets/index.css';

function choice_data(choices, q_id) {
	var j, Choice_Options = []
	for (j = 0; j < choices.length; j++)
		{if (choices[j].question == q_id)
		Choice_Options.push({ label: choices[j].choice_text, value: choices[j].choice_text})
		}
	return Choice_Options
		}

function subchoice_data(subchoices, subq_id) {
	var j, Sub_Choice_Options = []
	for (j = 0; j < subchoices.length; j++)
		{if (subchoices[j].sub_question == subq_id)
			Sub_Choice_Options.push({ label: subchoices[j].choice_text, value: subchoices[j].choice_text})
		}
	return Sub_Choice_Options
		}
		

const buttonStyle = {marginTop:'10px', float:'right'}



const format = 'YYYY-MM-DD HH:mm:ss';

function getFormat(time) {
  return time ? format : 'YYYY-MM-DD';
}

function onStandaloneSelect(value) {
	console.log('onStandaloneSelect');
	console.log(value && value.format(format));
	}

function onStandaloneSelectRange(value) {
		console.log('onSelect');
		console.log(value[0] && value[0].format(format));
		console.log(value[1] && value[1].format(format));
	}
	  
function changetorange()
{
	this.setState({date_range:1})
}


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
			value: null,
			value2: null,
			compliance_status: [],
			rtl: false,
			questions:[],
			choices:[],
			subquestions: [],
			subchoices: [],
			Choice_Options:[],
			active_Panel: 0,
			date_range:0
		};
	this.handleSelectChange = this.handleSelectChange.bind(this);
	this.handleSelectChangeSub = this.handleSelectChangeSub.bind(this);
	this.clearValue = this.clearValue.bind(this);
	this.onShowTimeChange = this.onShowTimeChange.bind(this)
	}

	handleSelectChange (value) {
		console.log('You\'ve selected:', value);
		this.setState({ value: value });
	}

	handleSelectChangeSub (value) {
		console.log('You\'ve selected:', value);
		this.setState({value2: value})
		console.log(this.state.value2)

	}

	clearValue() {
		this.setState({value2: null})
		// this.setState({active_Panel: j})
		// console.log(active_Panel)
	}

	onShowTimeChange() {
		this.setState({date_range: !this.state.date_range})
		// console.log(this.state.date_range)

		}
	
	// setValueType(choice_type) {
	// 	(choice_type==1) : this.setState({value:''}) ? this.setState({value:null})

	// }

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

		var subquestion_id = subquestions.filter(text => text.question==this.props.q_id).filter(text => text.outcome==outcome).map(text => text.id)
		var subquestion_text = subquestions.filter(text => text.question==this.props.q_id).filter(text => text.outcome==outcome).map(text => text.question_text)
		console.log(subquestion_text)
		var text = questions.filter(text => text.id==this.props.q_id).map(text => text.question_text)

		var choice_type = questions.filter(choice => choice.id==this.props.q_id).map(choice => choice.choice_type)
		var choice_type2 = (choice_type=="1") ? false : true

		const options = choice_data(choices, this.props.q_id)
		

		const { crazy, disabled, stayOpen, value, autoFocus, autosize, type, compliance_status } = this.state;

		var panel=[], j

		if (subquestion_text.length>0)
			{
			for (j = 0; j < subquestion_text.length; j++)
			{
			const sub_options = subchoice_data(subchoices, subquestion_id[j])
			console.log(sub_options)

			// this.props.window['value' + j] = 'oh'+j
			
			panel.push(
			// <PanelGroup>
			<Panel style={{marginTop:'65px', marginLeft:'200px'}} bsStyle="primary"  
					eventKey={j}  >
			<Panel.Heading >
				<Panel.Title toggle>
				{subquestion_text[j]}
				<Glyphicon glyph="chevron-down" style={{float:'right'}} />

				</Panel.Title>
			</Panel.Heading>
			<Panel.Collapse >
				<Panel.Body collapsible>
				<Select
					closeOnSelect={false}
					disabled={disabled}
					multi={choice_type2}
					onChange={this.handleSelectChangeSub}
					options={sub_options}
					// placeholder="Select your answer(s)"
          			removeSelected={true}
					rtl={this.state.rtl}
					simpleValue
					value={this.state.value2}
					autoFocus={!autoFocus}
					autosize={!autosize}
					delimiter='|'
				/>
				<div>
				<Button bsStyle="primary" style={buttonStyle} onClick={this.handleSubmit}> 
				Submit
				</Button>
				</div>

				</Panel.Body>
			</Panel.Collapse>
			</Panel>
			// </PanelGroup>
			)}
			}
		else
			{
			panel = []
			}
		

		var qType = []
		var dateType = []

		if (this.state.date_range==0)
		{
			console.log('test', this.state.date_range)
			dateType.push(
				<div>
				<Calendar
				style={{marginLeft:'150px'}}
				onSelect={onStandaloneSelect}
				// format={formatStr}
			/>
			<label>
			<input
			  type="checkbox"
			//   checked={changetorange}
			  onChange={this.onShowTimeChange}
			/>
          	Date Range
			</label>
			</div>
			)
			}

		else {
			dateType.push(
			<div>
			<RangeCalendar
			onSelect={onStandaloneSelectRange}
			/>
		  <label>
          <input
            type="checkbox"
            // checked={changetorange}
            onChange={this.onShowTimeChange}
          />
          Date Range
		</label>
		</div>
		)
		}
			
	console.log({dateType})

	if (choice_type=="4")
		{		
		qType.push(dateType)
		}

		else
		{
			qType.push(<Select
					closeOnSelect={false}
					disabled={disabled}
					multi={choice_type2}
					onChange={this.handleSelectChange}
					options={options}
					// placeholder="Select your answer(s)"
          			removeSelected={true}
					rtl={this.state.rtl}
					simpleValue
					value={this.state.value}
					autoFocus={!autoFocus}
					autosize={!autosize}
					style={{marginTop:'10px'}}
					delimiter='|'
					// pageSize={2}
				/>)
		}

		return (

			<div className="section">
			
			{/* <Jumbotron style={{padding: '20px', borderRadius:'20px', border:'solid', borderWidth:'1px', borderColor:'grey'}}> */}
			<div >
				<h3 className="section" style={{marginBottom:'20px'}}  > {text} </h3>
				{qType}

			</div>
			<div>
				<Button  bsStyle="primary" style={buttonStyle} onClick={this.handleSubmit}> 
				Submit
				</Button>
			</div>

			<br></br><br></br>
			{/* </Jumbotron> */}

			<div>
			<PanelGroup accordion id="accordion-example" onSelect={this.clearValue} defaultActiveKey={0}
			// accordion={true} defaultActiveKey={0} activeKey={this.state.active_Panel}  
			> 
			{panel}
			</PanelGroup>
			</div>

			</div>

			// {/* <h2 className="section"> {subquestion_text[0]} </h2> */}

			

			// 		{/* <div className="checkbox-list">
			// 		<label className="checkbox">
			// 			<input type="checkbox" className="checkbox-control" name="removeSelected" checked={this.state.removeSelected} onChange={this.toggleCheckbox} />
			// 			<span className="checkbox-label">Remove selected options</span>
			// 		</label>
			// 	</div> */}
		);
	}
}

// module.exports = MultiSelectField;
export default MultiSelectField;
