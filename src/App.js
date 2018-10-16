import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Select from 'react-select';
import MultiSelectField from './components/Multiselect.js'
import Creatable from './components/Creatable.js'
import CitiesField from './components/Virtualized.js'
import Pagination_App from './components/Pagination.js'
import Navigation_App from './components/NavigationApp.js';
import Typist from 'react-typist';
import {Tabs, Tab, Radio, Checkbox} from 'react-bootstrap';
import Infinite from 'react-infinite'

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';


// import RadioGroup from 'wix-style-react/RadioGroup';

// import './example.less';
import Background from './images/dotted.jpg';

var api_host = 'http://54.72.140.182:3000'


const Choice = [
	{ label: 'Chocolate', value: 'chocolate' },
	{ label: 'Vanilla', value: 'vanilla' },
	{ label: 'Strawberry', value: 'strawberry' },
	{ label: 'Caramel', value: 'caramel' },
	{ label: 'Cookies and Cream', value: 'cookiescream' },
	{ label: 'Peppermint', value: 'peppermint' },
];


const SelectStyle = {width:'70%', padding:'0px', width: '900px',height:'90%',
                  marginLeft: 'auto', marginRight: 'auto', background: 'white', borderRadius:'20px',
                  backgroundImage: `url(${Background})`
                }

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 2,
  },
  padding: {
    padding: `0 ${theme.spacing.unit * 2}px`,
  },
});

                

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      questions: [],
      scroll_div: 'h1',
      isInfiniteLoading: false,
      elements: this.buildElements(0, 20),
      scroll_y: 0,
      color: 'grey',
      audits:[],
      questions_answer:[]
    }
    this.buildElements = this.buildElements.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    this.onScroll = this.onScroll.bind(this)

  }

componentWillMount() {
		fetch(api_host+'/questions_audit').then(response => response.json())
		.then(data => this.setState({ audits: data }))

		fetch(api_host+'/questions_question').then(response => response.json())
		.then(data => this.setState({ questions: data }));
    
		fetch(api_host+'/questions_question_answer').then(response => response.json())
    .then(data => this.setState({ questions_answer: data }));
    

}

componentDidMount() {
    // this.scolling = ReactDOM.findDOMNode(this.refs['scroll']).getBoundingClientRect().y
    // this.pag = ReactDOM.findDOMNode(this.refs['pagination']).getBoundingClientRect().scrollHeight
    //this.tabs = ReactDOM.findDOMNode(this.refs['tabs']).getBoundingClientRect().y
}

onScroll() {
    console.log('Am scrollin here!')
    console.log(window.scrollY)
    console.log(ReactDOM.findDOMNode(this.refs['pagination']).pageYOffset)
    console.log(document.body.scrollHeight)
    console.log('domElem ' + this.scolling + ' ' + this.pag + ' ' + this.tabs)
    var colorx = (window.scrollY > this.scolling && window.scrollY < 700) ? 'red' : 'grey'
    this.setState({color: colorx})

    // console.log(document.getElementById('scroll').offsetHeight)
  
  }
  

buildElements(start, end) {
  var x = [];
  for (var i = start; i < end; i++) {
      x.push(
      <div key={i}>   {i}  </div>
    )
  }
  return x;
}


handleScroll() {
  this.setState({isInfiniteLoading: true});

  setTimeout( function() {
    var elemLength = this.state.elements.length
    var newelements = this.buildElements(elemLength, elemLength+20)
    this.setState({
      isInfiniteLoading: false,
      elements: this.state.elements.concat(newelements)
      })
    }.bind(this), 2000)

  console.log('infinity!')

}
  
elementInfiniteLoad() {
  return <div className="infinite-list-item">
      Loading...
  </div>;
}



  render() {
    console.log(this.state.questions_answer)

    const now = 60;
		var audit_names = this.state.audits.map(text => text.audit_name)
    console.log(audit_names)
		var audit_ids = this.state.audits.map(text => text.id)
    console.log(audit_ids)

    var audit_list=[],j
    for (j = 0; j < audit_names.length; j++)

      {
        var style = (j==audit_names.length-1) ? {marginBottom:'1000px'} : {backgroundColor:'white'}
        var id_list = this.state.questions.filter(text =>
          text.audits_array2.includes(audit_ids[j])).map(text => text.id).sort()

        var answered_id_list = this.state.questions_answer.filter(text => text.audit==audit_names[j]).filter(text =>
            id_list.includes(text.question_id_id)).map(text => text.question_id_id).sort()
        
        function onlyUnique(value, index, self) { 
          return self.indexOf(value) === index;
          }
          
        var answered_id_list = answered_id_list.filter( onlyUnique );
          
        console.log(id_list)
        console.log(id_list.length)
        console.log(answered_id_list)
        console.log(answered_id_list.length)

        audit_list.push(
        <ExpansionPanel 
        style={style}
        //{backgroundColor:'transparent'}
        > 
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon  />} 
         >
          <div style={{margin:'auto -30px auto auto', width:'10px', fontSize:'24px', background:'white' }}>
          {audit_names[j]}
          </div>
          <Badge style={{margin: 'auto 40px auto auto'}} badgeContent={id_list.length-answered_id_list.length} color="error">
            {/* <MailIcon /> */}
          </Badge>
        </ExpansionPanelSummary>
          <ExpansionPanelDetails>

              <Pagination_App ref='pagination' key={1.5} 
                            audit_questions={id_list} answered_id_list={answered_id_list} 
                            audit={audit_names[j]}
                            // style={{marginLeft: 'auto', marginRight: 'auto', maxWidth:'40px'}}
                            />

          </ExpansionPanelDetails>
      </ExpansionPanel>
      )
      }

    return (
      <div style={{backgroundImage: `url(${Background})`, 
                  // backgroundSize:'cover',
                  // backgroundPosition: 'center',
                  // height:'100%',
                  // top:'0',
                  // left:'0',
                  // right:'0',
                  // bottom:'0'
                
                }}> 
      <Navigation_App />

      <div style = {{
                // width:'70%', padding:'0px', width: '800px',
                height:'90%',
                  marginLeft: '100px', marginRight: '100px', background: 'white', borderRadius:'20px',
                  backgroundImage: `url(${Background})`
                }} >
      
      {audit_list}

      </div>
      </div>


    );
  }
}

//export default App;

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
  