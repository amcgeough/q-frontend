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
import Switch from '@material-ui/core/Switch';
import Slide from '@material-ui/core/Slide';

// import SaveIcon from '@material-ui/icons/Save';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import SaveIcon from '@material-ui/icons/Save';
import UndoIcon from '@material-ui/icons/Undo';

import Subs from './Subs.js'


var api_host = 'http://54.72.140.182:3000'

const tooltip = (
	<Tooltip id="tooltip">
	  <strong>GDPR:</strong> This question is related to new GDPR rules which came into force in May 25th.
	</Tooltip>
  );



function choice_data(choices, q_id, choice_type, handleSelectChange, handleSelectChangeRadio, value, disabled) {
	var j, Choice_Options = [], texting
	//Choice_Options.push(<RadioGroup name="gender1" value={this.state.value} onChange={(event) => handleSelectChange()}>)
	//const numbers = [1, 2, 3, 4, 5];
	if (choice_type=="1") {
	Choice_Options.push(choices.map(function(question, j)  {
		//console.log('whaaaaa ' + j)
	
	
		if (choices[j].question_id == q_id) {
		texting = choices[j].choice_text
		return <FormControlLabel value={texting}  control={<Radio />}  label={texting} disabled={disabled}/>
		//return <li>{j}</li>
		}}
	))

		//<FormControl component="fieldset">
			//<RadioGroup >
	return <FormControl component="fieldset"> 
				<RadioGroup 
					value={value}  
					onChange={(event) => handleSelectChangeRadio(event.target.value, event.target.checked)} 
					> 
					{Choice_Options} 
				</RadioGroup> 
			</FormControl>
			//
			//</FormControl>
	}


	else {
		for (j = 0; j < choices.length; j++)
		{if (choices[j].question_id == q_id) {
		var texting = choices[j].choice_text
//		Choice_Options.push({ label: choices[j].choice_text, value: choices[j].choice_text})
		Choice_Options.push(
							<FormControlLabel
								control={
								<Checkbox value={texting} 
								//checked={checked}
								onChange={(event) => handleSelectChange(event.target.value, event.target.checked)}
								disabled={disabled}
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
			crazy: false,
			stayOpen: false,
			value: null,
			value2: null,
			checked: false,
			compliance_status: [],
			rtl: false,
			questions:[],
			choices:[],
			choices3000:[],
			subquestions: [],
			subchoices: [],
			Choice_Options:[],
			Sub_Choice_Options:[],
			active_Panel: 0,
			date_range:0,
			subdate_range:0,
			files:[],
			subfiles:[],
			pastChoiceType:[],
			text2:null,
			expanded: false,
			subexpanded: false,
			checked_save: false,
			disabled:false,
			sub_disabled:false,
			insert:[],
			// outcome:1

		};
	this.handleSelectChange = this.handleSelectChange.bind(this);
	this.handleSelectChangeRadio = this.handleSelectChangeRadio.bind(this);
	this.handleSelectChangeSub = this.handleSelectChangeSub.bind(this);
	this.clearValue = this.clearValue.bind(this);
	this.onShowTimeChange = this.onShowTimeChange.bind(this)
	this.SubonShowTimeChange = this.SubonShowTimeChange.bind(this)
	this.handleSubmitText = this.handleSubmitText.bind(this)
	this.handleExpandClick = this.handleExpandClick.bind(this)
	this.handleSubExpandClick = this.handleSubExpandClick.bind(this)
	this.handleChange = this.handleChange.bind(this)
	this.undo = this.undo.bind(this)
	this.subonDrop = this.subonDrop(this)

	}

	handleChange (outcome)  {
		console.log('postingppppppppppppppppppppppppppppppppppppppppp')
		var date = new Date(); 
		console.log(date)
		console.log(this.props.audit)


		fetch(api_host+'/questions_question_answer', {
			method: 'POST',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json',
			  "Access-Control-Allow-Origin" : "*", 
			},
			body: JSON.stringify({
			"compliance_status": outcome, 
			"question_id_id": this.props.q_id,
			"audit":this.props.audit,
			"date": date
			})
		  }).then(response => response.json())
		  .then(data => console.log(data));

		this.setState(state => ({ checked_save: !this.state.checked_save }));
		this.setState({disabled: true });

	  };



	  undo ()  {
		this.setState(state => ({ checked_save: !this.state.checked_save }));
		this.setState({disabled: false });

	  };

	
	handleSelectChange (value, checked)  {
		//this.setState({ [name]: event.target.checked });
		//if (checked==true) {
		console.log(value)
		console.log(checked)
		this.setState({value: value})
		//}
		this.setState(state => ({ checked: !this.state.checked }));
	  };

	  handleSelectChangeRadio (value, checked)  {
		//this.setState({ [name]: event.target.checked });
		//if (checked==true) {
		console.log(value)
		console.log(checked)
		this.setState({value: value})
		//}
		this.setState(state => ({ checked: !this.state.checked }));
	  };


	  handleSelectChangeSub (value) {
		console.log('You\'ve selected:', value);
		this.setState({value2: value})
		console.log(this.state.value2)
	}
			
	handleExpandClick ()  {
		this.setState(state => ({ expanded2: !state.expanded2 }));
		this.setState(state => ({ expanded: !state.expanded }));

	};

	handleSubExpandClick ()  {
		this.setState(state => ({ subexpanded: !state.subexpanded }));
	  };

	// handleSelectChange (value) {
	// 	console.log('You\'ve selected:', value);
	// 	this.setState({ value: value });
	// }


	clearValue() {
		this.setState({value2: null})
		// this.setState({active_Panel: j})
		// console.log(active_Panel)
	}

	onShowTimeChange() {
		this.setState({date_range: !this.state.date_range})
		// console.log(this.state.date_range)
		}

	SubonShowTimeChange() {
		this.setState({subdate_range: !this.state.subdate_range})
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
	
		// fetch(api_host+'/questions_question', {method: 'get'}).then(response => response.json())
		// .then(data => this.setState({ questions: data }));
		this.setState({ questions: this.props.questions })
		this.setState({ choices: this.props.choices })
		this.setState({ subquestions: this.props.subquestions })
		this.setState({ subchoices: this.props.subchoices })

		// fetch(api_host+'/questions_choice').then(response => response.json())
		// .then(data => this.setState({ choices: data }))
		

		// fetch(api_host+'/questions_subquestion').then(response => response.json())
		// .then(data => this.setState({ subquestions: data }));

		// fetch(api_host+'/questions_subchoice').then(response => response.json())
		// .then(data => this.setState({ subchoices: data }));

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

	subonDrop(subfiles) {
		this.setState({
		  subfiles
		});
	  }

	componentWillReceiveProps(newProps) {
		this.state.pastChoiceType.push(newProps.q_choice_type)
		this.setState({text2: newProps.text});
		this.setState({expanded: newProps.expanded});

		// if(this.state.pastChoiceType.length>1) 
		// console.log('past '+this.state.pastChoiceType[this.state.pastChoiceType.length-2])

		// if (this.state.pastChoiceType[this.state.pastChoiceType.length-2]!=5 && 
		// 	this.state.pastChoiceType[this.state.pastChoiceType.length-2]!=6) 
		// 		{
		// 		console.log('ch '+newProps.q_choice_type)
		// 		// this.refs.mySelectList.focus() 
		// 		}
		// 	// this.refs.mySelectList.focus()
		// 	this.setState({value: newProps.value});
			}


	render () {
		
		const { questions, choices, subquestions, subchoices, Choice_Options , Sub_Choice_Options} = this.state;
		var choice_type = questions.filter(choice => choice.id==this.props.q_id).map(choice => choice.choice_type)
		var choice_type2 = (choice_type=="1") ? false : true

		var outcome = this.state.choices.filter(choice => choice.question_id==this.props.q_id).filter(choice => choice.choice_text==this.state.value).map(choice => choice.compliance_status)
		outcome = (choice_type=='5' || choice_type=='6' || choice_type=='3' || choice_type=='4') ? '1' : outcome

		var subquestion_id = subquestions.filter(text => text.question_id==this.props.q_id).filter(text => text.outcome==outcome).map(text => text.id)
		var subquestion_text = subquestions.filter(text => text.question_id==this.props.q_id).filter(text => text.outcome==outcome).map(text => text.question_text)

		var text = questions.filter(text => text.id==this.props.q_id).map(text => text.question_text)

		const options = choice_data(choices, this.props.q_id, choice_type, this.handleSelectChange, this.handleSelectChangeRadio, this.state.value, this.state.disabled)
		const ToggleType = (choice_type=="1") ? 'radio' : 'checkbox'

		const { crazy, disabled, stayOpen, value, autosize, type, compliance_status } = this.state;
		
		var subexpand_icon=[]
		if (this.state.subexpanded==false)
		{subexpand_icon.push(<ExpandMoreIcon />)}
		else {subexpand_icon.push(<ExpandLessIcon />)}
	
		var panel=[], j

		if (subquestion_text.length>0 && this.state.checked_save==true)
			{

			for (j = 0; j < subquestion_text.length; j++)
			{

				panel.push(
							<Subs
							questions= {this.state.questions }
							choices= {this.state.choices }
							subquestions= {this.state.subquestions }
							subchoices= {this.state.subchoices }
							outcome={outcome}
							q_id={this.props.q_id}
							subquestion_id={subquestion_id[j]}
							audit={this.props.audit}
							/>
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
			>

			{options}
			</div>
			)
		}



	var undo = []
	if (this.state.disabled==true)
	{undo.push(
		<Button  size="small" style={{fontSize:'10px'}} onClick={this.undo}>
		<UndoIcon  style={{marginRight:'0px'}}/>
		</Button>
	)
	}
	else
	{
	undo = []	
	}

	var expand_icon=[]
	if (this.state.expanded==false)
	{expand_icon.push(<ExpandMoreIcon style={{marginLeft:'auto', marginRight:'10px'}}/>)}
	else {expand_icon.push(<ExpandLessIcon style={{marginLeft:'auto', marginRight:'10px'}}/>)}



	return (

			<div className="section">

	<Card style={{minWidth:'500px', marginLeft:'auto', marginRight:'auto', textAlign:'center'}}>
      {/* <CardActionArea style={{width:'100%'}}> */}
        <CardMedia
          style={{height:110, width:'100%'}}
		  //image="src/images/para.jpg"
		  image={this.props.image}
          title={this.props.text}
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2" style={{fontSize:"22px"}}>
		  {this.props.text}
          </Typography>

		</CardContent>


          <IconButton
		  	style={{marginLeft:'auto', marginRight:'10px'}}
            onClick={this.handleExpandClick}
          >
            {expand_icon}
          </IconButton>
		  

		<Collapse in={this.state.expanded} timeout="auto" unmountOnExit style={{ transitionDelay: 5000 }}>

			<CardActions style={{float: 'right', marginRight:'0px'}}>
			{undo}
			</CardActions>

		<CardContent style={{ width:'100%', margin:'10px', display:'inline-block'}}>

		  {qType}
		</CardContent>

		<CardActions>
		<Button variant="contained" size="small" style={{fontSize:'14px'}} 
				onClick={this.handleChange.bind(this, outcome[0])} disabled={this.state.disabled}
				>
			<SaveIcon  style={{marginRight:'7px'}}/>
			Save
		</Button>
      </CardActions>



	<div style={{width:'66%',float:'right', margin:'10px 10px 10px 10px'}}>
	  {panel}
	</div>


	</Collapse>
    </Card>


			<br></br><br></br>

			</div>

		);
	}
}
  
// module.exports = MultiSelectField;
export default MultiSelectField;
