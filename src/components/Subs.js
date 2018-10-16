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

var api_host = 'http://54.72.140.182:3000'



function subchoice_data(subchoices, subq_id, subchoice_type, handleSelectChangeSub, value, sub_disabled, 
						subfiles, subonDrop, subdate_range, SubonShowTimeChange
						) {

	var j, Sub_Choice_Options = []
		
		if (subchoice_type=='1') {
			Sub_Choice_Options.push(subchoices.map(function(sub_question, j)  {
			
			
				if (subchoices[j].sub_question_id == subq_id) {
				subtexting = subchoices[j].choice_text
				return <FormControlLabel value={subtexting}  control={<Radio />}  label={subtexting} disabled={sub_disabled}/>
				}}
			))
				
			return <FormControl component="fieldset"> <RadioGroup value={value}  onChange={(event) => handleSelectChangeSub(event.target.value, event.target.checked)} > 
						{Sub_Choice_Options} </RadioGroup> </FormControl>
			}
		
		
		else if (subchoice_type=='2') {
				console.log('tie '+subchoice_type)
				for (j = 0; j < subchoices.length; j++)
				{if (subchoices[j].sub_question_id == subq_id) {
				var subtexting = subchoices[j].choice_text
				Sub_Choice_Options.push(
									<FormControlLabel
										control={
										<Checkbox value={subtexting}
										disabled={sub_disabled}
										//checked={checked}
										onChange={(event) => handleSelectChangeSub(event.target.value, event.target.checked)}
										 />
										}
										label={subtexting}
									/>
									)
		
				}
				}
				return Sub_Choice_Options
			}
		

		else if (subchoice_type=="3")
		{
		Sub_Choice_Options.push(
			
			<form  style={{marginTop:'20px', marginRight:'20px'}}
			>
			<label>
			  <textarea
			  ref="mySelectList"
			  value={value}
			  rows={5}
			  cols={30}
			  autoFocus
		  
			  />
			</label>
		  </form>
			)
		return Sub_Choice_Options
		}


		else if (subchoice_type=="5" || subchoice_type=="6")
			{
			Sub_Choice_Options.push(
				
			<section >
			<div className="dropzone"  style={{display:'inline-block', marginTop:'20px'}}>
			  <Dropzone
				onDrop={subonDrop}  
				>  
				<p style={{fontSize:'16px', padding:'5px 5px 5px 5px'}}>
				Drop files here or click to select files to upload.</p>
	
			  </Dropzone>
			</div>
			<br/>
			<aside>
			  <ul>
				{
				  subfiles.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
				}
			  </ul>
			</aside>
		  </section>
		)
		return Sub_Choice_Options
			}

	else if (subchoice_type=="4") {
		var Sub_Choice_Options = []

		if (subdate_range==0)
		{
			console.log('subdaterange', subdate_range)
			Sub_Choice_Options.push(
				<div>
				<div>
				<Calendar
				ref="mySelectList"
				style={{display:'inline-block', marginTop:'20px'}}
				onSelect={onStandaloneSelect}
				// disabled={sub_disabled}
			/>
			</div>
			<br/>
			<div style={{textAlign:'left'}}>
			<label>
			<Checkbox
			style={{display:'inline-block'}}
			onChange={SubonShowTimeChange}
			/>
          	&nbsp; Date Range
			</label>
			</div>
			</div>
			)
			}

		else {
			Sub_Choice_Options.push(
			<div>
			<div>
			<RangeCalendar
			ref="mySelectList"
			style={{display:'inline-block', marginTop:'20px'}}
			onSelect={onStandaloneSelectRange}
			// disabled={sub_disabled}
			/>
			</div>
			<br/>
			<div style={{textAlign:'left'}}>
		  <label>
			<Checkbox
			style={{display:'inline-block'}}
			onChange={SubonShowTimeChange}
          />
		  &nbsp; Date Range
		  </label>
		</div>
		</div>
		)
		}
	return Sub_Choice_Options
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

  
class Subs extends React.Component {


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
			sub_checked_save:false
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
	this.SubHandleChange = this.SubHandleChange.bind(this)
	this.undo = this.undo.bind(this)
	this.subonDrop = this.subonDrop(this)

	}



	  SubHandleChange (sub_outcome, subquestion_id)  {
		console.log('postingppppppppppppppppppppppppppppppppppppppppp')
		var date = new Date(); 
		console.log(date)
		console.log(this.props.audit)

		fetch(api_host+'/questions_subquestion_answer', {
			method: 'POST',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json',
			  "Access-Control-Allow-Origin" : "*", 
			},
			body: JSON.stringify({
								"compliance_status": sub_outcome, 
								"question_id_id": subquestion_id,
								"audit": this.props.audit,
								"date": date
								})
		  }).then(response => response.json())
		  .then(data => console.log(data));

		this.setState(state => ({ sub_checked_save: !this.state.sub_checked_save }));
		
		//All or nothing!
		this.setState({sub_disabled: true });

	  };


	  undo ()  {
		this.setState(state => ({ sub_checked_save: !this.state.sub_checked_save }));
		this.setState({sub_disabled: false });

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

		// fetch(api_host+'/questions_choice').then(response => response.json())
		// .then(data => this.setState({ choices: data }))
		

		// fetch(api_host+'/questions_subquestion').then(response => response.json())
		// .then(data => this.setState({ subquestions: data }));

		// fetch(api_host+'/questions_subchoice').then(response => response.json())
		// .then(data => this.setState({ subchoices: data }));

		// this.setState({text2: this.props.text});
		  
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

	// componentWillReceiveProps(newProps) {
	// 	this.setState({text2: newProps.text});
	// 	this.setState({expanded: newProps.expanded});

	// 		}


	render () {
		
		var outcome = this.props.outcome

		// var subquestion_id = this.props.subquestions.filter(text => text.question_id==this.props.q_id).filter(text => text.outcome==outcome).map(text => text.id)
		var subquestion_text = this.props.subquestions.filter(text => text.id==this.props.subquestion_id).map(text => text.question_text)

		var text = this.props.questions.filter(text => text.id==this.props.q_id).map(text => text.question_text)

		var choice_type = this.props.questions.filter(choice => choice.id==this.props.q_id).map(choice => choice.choice_type)
		var choice_type2 = (choice_type=="1") ? false : true
		const ToggleType = (choice_type=="1") ? 'radio' : 'checkbox'

		const { crazy, disabled, stayOpen, value, autosize, type, compliance_status } = this.state;
		
		var subexpand_icon=[]
		if (this.state.subexpanded==false)
		{subexpand_icon.push(<ExpandMoreIcon />)}
		else {subexpand_icon.push(<ExpandLessIcon />)}
	
		var undo = []
		if (this.state.sub_disabled==true)
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

		var panel=[], j

		// if (subquestion_text.length>0 && this.state.checked_save==true)
		// 	{

		// 	for (j = 0; j < subquestion_text.length; j++)
		// 	{
			var subchoice_type = this.props.subquestions.filter(text => text.id==this.props.subquestion_id).filter(text => text.outcome==outcome).map(text => text.choice_type)
			var subchoice_type2 = (subchoice_type=="1") ? false : true

			const sub_options = subchoice_data(this.props.subchoices, this.props.subquestion_id, subchoice_type, 
												this.handleSelectChangeSub, this.state.value2, this.state.sub_disabled, 
												this.state.subfiles, this.state.subonDrop, this.state.subdate_range,
												this.SubonShowTimeChange)
			var sub_outcome = this.props.subchoices.filter(choice => choice.sub_question_id==this.props.subquestion_id).filter(choice => choice.choice_text==this.state.value2).map(choice => choice.compliance_status)
			sub_outcome = (subchoice_type=='5' || subchoice_type=='6' || subchoice_type=='3' || subchoice_type=='4') ? '1' : sub_outcome
			

		panel.push(
	<div>
	{/* <Switch checked={this.state.checked} onChange={this.handleChange}  /> */}
	<Slide direction="right" in={true} mountOnEnter unmountOnExit> 

		<Card style={{margin:'10px 10px 20px 10px'}}>
      {/* <CardActionArea style={{width:'100%'}}> */}
        {/* <CardMedia
          style={{height:140, width:'100%'}}
		  //image="src/images/para.jpg"
		  image={this.props.image}
          title="Contemplative Reptile"
        /> */}
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
		  {subquestion_text}

          </Typography>

		</CardContent>


          <IconButton
            onClick={this.handleSubExpandClick}
            // aria-expanded={this.state.subexpanded}
            // aria-label="Show more"
          >
            {subexpand_icon}
          </IconButton>


		<Collapse in={this.state.subexpanded} timeout="auto" unmountOnExit style={{ transitionDelay: 500 }}>

			<CardActions style={{float: 'right', marginRight:'0px'}}>
			{undo}
			</CardActions>

		<CardContent style={{ width:'100%', margin:'10px'}}>
		  {/* <Typography component="p"> */}
		  <div>
		  {sub_options}
		  </div>
          {/* </Typography> */}
		</CardContent>

		<CardActions >
		<Button variant="contained" size="small" style={{fontSize:'14px'}}
									onClick={this.SubHandleChange.bind(this, sub_outcome[0], this.props.subquestion_id)} 
									disabled={this.state.sub_disabled}
		>
			<SaveIcon  style={{marginRight:'7px'}}/>
			Save
		</Button>
      </CardActions>
	  </Collapse>
	  </Card>

		</Slide>
		</div>

			)
		// }
	//}
		// else
		// 	{
		// 	panel = []
		// 	}
		




	return (
		<div>
			{panel}
		</div>
		);
	}}
  
// module.exports = MultiSelectField;
export default Subs;
