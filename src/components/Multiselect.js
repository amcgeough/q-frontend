import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';
// import 'react-select/dist/react-select.css';
import '../example.css';
// import Button from 'react-bootstrap/lib/Button';
import PanelGroup from  'react-bootstrap/lib/PanelGroup';
import Panel from 'react-bootstrap/lib/Panel';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';

import Calendar from 'rc-calendar';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import {  ToggleButtonGroup} from 'react-bootstrap';
import Dropzone from 'react-dropzone'
import Typist from 'react-typist';

import 'rc-calendar/assets/index.css';
import 'rc-checkbox/assets/index.css';



import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
//mport Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
//import FormHelperText from '@material-ui/core/FormHelperText';

import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
//import getMuiTheme from 'material-ui/styles/getMuiTheme';

// import SaveIcon from '@material-ui/icons/Save';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SaveIcon from '@material-ui/icons/Save';


const tooltip = (
	<Tooltip id="tooltip">
	  <strong>GDPR:</strong> This question is related to new GDPR rules which came into force in May 25th.
	</Tooltip>
  );

// function choice_data(choices, q_id, choice_type) {
// 	var j, Choice_Options = []
// 	const Type = (choice_type=="1") ? Radio : Checkbox

// 	for (j = 0; j < choices.length; j++)
// 		{if (choices[j].question == q_id) {
// 		var texting = choices[j].choice_text
// //		Choice_Options.push({ label: choices[j].choice_text, value: choices[j].choice_text})
// 		Choice_Options.push(
// 							<Type style={{padding:'0px 0px 0px 10px', margin:'0px 0px 0px 0px'}} 
// 										validationState={null} value={texting} >
// 							{texting}
// 							</Type>
// 							)

// 		}
// 		}
// 	return Choice_Options
// 		}




function choice_data(choices, q_id, choice_type, handleSelectChange, valuee) {
	var j, Choice_Options = [], texting
	//Choice_Options.push(<RadioGroup name="gender1" value={this.state.value} onChange={(event) => handleSelectChange()}>)
	const numbers = [1, 2, 3, 4, 5];
	if (choice_type=="1") {
	Choice_Options.push(numbers.map(function(j)  {
		//console.log('whaaaaa ' + j)
	
	
		if (choices[j].question == q_id) {
		texting = choices[j].choice_text
		return <FormControlLabel value={texting}  control={<Radio />}  label={texting}/>
		//return <li>{j}</li>
		}}
	))
		
		//<FormControl component="fieldset">
			//<RadioGroup >
	return <FormControl component="fieldset"> <RadioGroup value={valuee}  onChange={(event) => handleSelectChange(event.target.value, event.target.checked)} > 
				{Choice_Options} </RadioGroup> </FormControl>
			//
			//</FormControl>
	}


	else {
		for (j = 0; j < choices.length; j++)
		{if (choices[j].question == q_id) {
		var texting = choices[j].choice_text
//		Choice_Options.push({ label: choices[j].choice_text, value: choices[j].choice_text})
		Choice_Options.push(
							<FormControlLabel
								control={
								<Checkbox value={texting} 
								//checked={checked}
								onChange={(event) => handleSelectChange(event.target.value, event.target.checked)}
					 			/>
								}
								label={texting}
							/>
							)

		}
		}
		return Choice_Options
	}
}



function subchoice_data(subchoices, subq_id, choice_type) {
	var j, Sub_Choice_Options = []
	var type = (choice_type=="1") ? 'Radio' : 'Checkbox'
	for (j = 0; j < subchoices.length; j++)
		{if (subchoices[j].sub_question == subq_id) {
			var subtexting = subchoices[j].choice_text
//			Sub_Choice_Options.push({ label: subchoices[j].choice_text, value: subchoices[j].choice_text})
			Sub_Choice_Options.push(<type validationState="success">{subtexting}</type>)

			}
			}
	return Sub_Choice_Options
		}
		

const buttonStyle = {marginTop:'10px', float:'center', marginBottom:'15px'}



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
			checked: false,
			compliance_status: [],
			rtl: false,
			questions:[],
			choices:[],
			subquestions: [],
			subchoices: [],
			Choice_Options:[],
			active_Panel: 0,
			date_range:0,
			files:[],
			pastChoiceType:[],
			text2:null,
			expanded: false

		};
	this.handleSelectChange = this.handleSelectChange.bind(this);
	this.handleSelectChangeSub = this.handleSelectChangeSub.bind(this);
	this.clearValue = this.clearValue.bind(this);
	this.onShowTimeChange = this.onShowTimeChange.bind(this)
	this.handleSubmitText = this.handleSubmitText.bind(this)
	this.handleExpandClick = this.handleExpandClick.bind(this)

	}
	handleSelectChange (value, checked)  {
		//this.setState({ [name]: event.target.checked });
		if (checked==true) {
		console.log(value)
		this.setState({value: value})
		}
	  };
	// handleSelectChange = name => event => {
	// 	this.setState({ [name]: event.target.checked });
	//   };
			
	handleExpandClick ()  {
		this.setState(state => ({ expanded2: !state.expanded2 }));
	  };
	
	// handleSelectChange (value) {
	// 	console.log('You\'ve selected:', value);
	// 	this.setState({ value: value });
	// }

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
		
		this.setState({text2: this.props.text});

		  }


	handleSubmit() {
		alert('Submitted')
		console.log('submitted')
	}

	handleSubmitText(event) {
		alert('An essay was submitted: ' + this.state.textboxvalue);
		event.preventDefault();
	  }
	
	onDrop(files) {
		this.setState({
		  files
		});
	  }

	componentWillReceiveProps(newProps) {
		this.state.pastChoiceType.push(newProps.q_choice_type)
		this.setState({text2: newProps.text});
		this.setState({expanded: newProps.expanded});

		// if(this.state.pastChoiceType.length>1) 
		console.log('past '+this.state.pastChoiceType[this.state.pastChoiceType.length-2])

		if (this.state.pastChoiceType[this.state.pastChoiceType.length-2]!=5 && 
			this.state.pastChoiceType[this.state.pastChoiceType.length-2]!=6) 
				{
				console.log('ch '+newProps.q_choice_type)
				// this.refs.mySelectList.focus() 
				}
			// this.refs.mySelectList.focus()
			this.setState({value: newProps.value});
			}


	render () {
		console.log('text: ' + this.state.text2)
		
		const { questions, choices, subquestions, subchoices, Choice_Options } = this.state;
		
		var outcome = choices.filter(choice => choice.question==this.props.q_id).filter(choice => choice.choice_text==this.state.value).map(choice => choice.compliance_status)

		var subquestion_id = subquestions.filter(text => text.question==this.props.q_id).filter(text => text.outcome==outcome).map(text => text.id)
		var subquestion_text = subquestions.filter(text => text.question==this.props.q_id).filter(text => text.outcome==outcome).map(text => text.question_text)
		console.log(subquestion_text)
		var subchoice_type = subquestions.filter(text => text.question==this.props.q_id).filter(text => text.outcome==outcome).map(text => text.choice_type)
		var subchoice_type2 = (subchoice_type=="1") ? false : true

		var text = questions.filter(text => text.id==this.props.q_id).map(text => text.question_text)

		var choice_type = questions.filter(choice => choice.id==this.props.q_id).map(choice => choice.choice_type)
		var choice_type2 = (choice_type=="1") ? false : true

		const options = choice_data(choices, this.props.q_id, choice_type, this.handleSelectChange, this.state.value)
		console.log('oops')
		console.log(options)
		console.log(choices)
		const ToggleType = (choice_type=="1") ? 'radio' : 'checkbox'
		console.log(ToggleType)


		const { crazy, disabled, stayOpen, value, autosize, type, compliance_status } = this.state;
		
		var panel=[], j

		if (subquestion_text.length>0)
			{
			for (j = 0; j < subquestion_text.length; j++)
			{
			const sub_options = subchoice_data(subchoices, subquestion_id[j])
			console.log(sub_options)
			var subchoice_type = subquestions.filter(text => text.question==subquestion_id[j]).filter(text => text.outcome==outcome).map(text => text.choice_type)
			var subchoice_type2 = (subchoice_type=="1") ? false : true
	
			// this.props.window['value' + j] = 'oh'+j
			
			panel.push(
			// <PanelGroup>
			<Panel style={{marginTop:'25px', marginLeft:'200px'}} bsStyle="primary"  
					eventKey={j} 
					//onToggle={this.updateFocus}
					>

			<Panel.Heading >
				<Panel.Title toggle >
				<div style={{float:'left'}}>
				<h3 style={{ fontSize:'16px', display:'inline'}}> {this.props.q_id}.{j+1} </h3>
				</div>
				<h3 style={{fontSize:'17px', display:'inline'}}> {subquestion_text[j]} </h3>
				<Glyphicon glyph="chevron-down" style={{float:'right', display:'inline'}} />
				</Panel.Title>
			</Panel.Heading>
			
			<Panel.Collapse >
				<Panel.Body collapsible>
				{/* <Select
					style={{textAlign:'left', width:'300px', marginRight:'auto', marginLeft:'auto'}}
					// ref="mySelectList"
					closeOnSelect={false}
					disabled={disabled}
					multi={subchoice_type2}
					onChange={this.handleSelectChangeSub}
					options={sub_options}
					placeholder={(subchoice_type=="1") ? "Select your answer" : "Select your answer(s)"}
          			removeSelected={true}
					rtl={this.state.rtl}
					simpleValue
					value={this.state.value2}
					autoFocus
					autosize={!autosize}
					delimiter='|'
				/> */}
				{sub_options}
				<div>
				<Button bsStyle="primary" style={buttonStyle} onClick={this.handleSubmit}> 
				Submit
				</Button>
				</div>

				<OverlayTrigger placement="left" overlay={tooltip}  >
				<Glyphicon glyph="info-sign" style={{ display:'inline'}} />
				</OverlayTrigger>

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
				<div>
				<Calendar
				ref="mySelectList"
				style={{display:'inline-block', marginTop:'20px'}}
				onSelect={onStandaloneSelect}
				// format={formatStr}
			/>
			</div>
			<br/>
			<div style={{textAlign:'left'}}>
			<label>
			{/* <input */}
			<Checkbox
			//   type="checkbox"
			style={{display:'inline-block'}}
			onChange={this.onShowTimeChange}
			/>
          	&nbsp; Date Range
			</label>
			</div>
			</div>
			)
			}

		else {
			dateType.push(
			<div>
			<div>
			<RangeCalendar
			ref="mySelectList"
			style={{display:'inline-block', marginTop:'20px'}}
			onSelect={onStandaloneSelectRange}
			/>
			</div>
			<br/>
			<div style={{textAlign:'left'}}>
		  <label>
          {/* <input
			type="checkbox" */}
			<Checkbox
			style={{display:'inline-block'}}
			onChange={this.onShowTimeChange}
          />
		  &nbsp; Date Range
		  </label>
		</div>
		</div>
		)
		}
			






	console.log({dateType})
	//Question Type displayed
	if (choice_type=="4")
		{		
		qType.push(dateType)
		}
	
	else if (choice_type=="3")
		{
		qType.push(
			
			<form  style={{marginTop:'20px', marginRight:'20px'}}
			// onSubmit={this.handleSubmitText}
			>
			<label>
			  <textarea
			  ref="mySelectList"
			  value={this.state.value}
			  rows={9}
			  cols={60}
			  autoFocus
		  
			//   onChange={this.handleChange} 
			  />
			</label>
			{/* <input type="submit" value="Submit" /> */}
		  </form>
	)
		}

		else if (choice_type=="5" || choice_type=="6")
		{
		qType.push(
			
		<section >
        <div className="dropzone"  style={{display:'inline-block', marginTop:'20px'}}>
		  <Dropzone
		  	// ref="mySelectList"
			onDrop={this.onDrop.bind(this)}  
			>  
            <p style={{fontSize:'16px', padding:'5px 5px 5px 5px'}}>
			Drop files here or click to select files to upload.</p>

          </Dropzone>
        </div>
		<br/>
        <aside>
          {/* <h2>Dropped files</h2> */}
          <ul>
            {
              this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
        </aside>
      </section>
	)
		}


	else if (choice_type=="1" || choice_type=="2")
		{
			qType.push(<div 
			// style={{textAlign:'left', overflowY:'scroll', maxHeight:'100px', 
			// 	marginLeft:'255px', marginRight:'auto'}}
			>
			{/* <ToggleButtonGroup block vertical
			type={ToggleType} 
			name={ToggleType} 
			> */}
			{options}
			{/* </ToggleButtonGroup> */}
			</div>
					// <Select
					// ref="mySelectList"
					// closeOnSelect={false}
					// disabled={disabled}
					// multi={choice_type2}
					// onChange={this.handleSelectChange}
					// options={options}
					// placeholder={(choice_type=="1") ? "Select your answer" : "Select your answer(s)"}
          			// removeSelected={true}
					// rtl={this.state.rtl}
					// simpleValue
					// value={this.state.value}
					// autosize={!autosize}
					// style={{marginTop:'10px', textAlign:'left', width:'400px', marginRight:'auto', marginLeft:'auto'}}
					// delimiter='|'
					// autoFocus
					// // pageSize={2}
					// />
			)
		}
		

		return (

			<div className="section">
			
			{/* <Jumbotron style={{padding: '20px', borderRadius:'20px', border:'solid', borderWidth:'1px', borderColor:'grey'}}> */}
			<Card >
      {/* <CardActionArea style={{width:'100%'}}> */}
        <CardMedia
          style={{height:140, width:'100%'}}
		  //image="src/images/para.jpg"
		  image={this.props.image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
		  {this.props.text}

          </Typography>
		</CardContent>


          <IconButton
            // className={classnames(classes.expand, {
            //   [classes.expandOpen]: this.state.expanded2,
            // })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded2}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>

		<Collapse in={this.state.expanded} timeout="auto" unmountOnExit style={{ transitionDelay: 500 }}>
		<CardContent style={{ width:'100%', margin:'10px'}}>
          {/* <Typography component="p"> */}
		  {qType}
          {/* </Typography> */}
		</CardContent>

		<CardActions>
		<Button variant="contained" size="small" style={{fontSize:'14px'}}>
			<SaveIcon  style={{marginRight:'7px'}}/>
			Save
		</Button>
      </CardActions>

		</Collapse>

      {/* </CardActionArea> */}

    </Card>


			<br></br><br></br>

			<div>
			<PanelGroup accordion id="accordion-example" onSelect={this.clearValue} defaultActiveKey={0}
			> 
			{panel}
			</PanelGroup>
			</div>

			</div>

			

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
