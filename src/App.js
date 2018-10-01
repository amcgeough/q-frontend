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



const Choice = [
	{ label: 'Chocolate', value: 'chocolate' },
	{ label: 'Vanilla', value: 'vanilla' },
	{ label: 'Strawberry', value: 'strawberry' },
	{ label: 'Caramel', value: 'caramel' },
	{ label: 'Cookies and Cream', value: 'cookiescream' },
	{ label: 'Peppermint', value: 'peppermint' },
];


const SelectStyle = {width:'50%', padding:'30px', width: '700px',
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
      color: 'grey'
    }
    this.buildElements = this.buildElements.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    this.onScroll = this.onScroll.bind(this)

  }

componentDidMount() {
    // this.scolling = ReactDOM.findDOMNode(this.refs['scroll']).getBoundingClientRect().y
    this.pag = ReactDOM.findDOMNode(this.refs['pagination']).getBoundingClientRect().scrollHeight
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


    return (
      <div style={{backgroundImage: `url(${Background})`}}> 
      <Navigation_App />

      <div style = {SelectStyle} >
      

    <ExpansionPanel>

      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      GDPR
      <Badge style={{margin: 'auto 40px auto auto'}} badgeContent={10} color="error">
          {/* <MailIcon /> */}
        </Badge>
      </ExpansionPanelSummary>

      <ExpansionPanelDetails>

      <Pagination_App ref='pagination' key={1.5}/>
      
      </ExpansionPanelDetails>
    
    </ExpansionPanel>

    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      AML 
      <Badge style={{margin: 'auto 40px auto auto'}} badgeContent={6} color="error">
          {/* <MailIcon /> */}
        </Badge>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        AML Questions
      </ExpansionPanelDetails>
    </ExpansionPanel>

    <ExpansionPanel style={{marginBottom:'100%'}}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      AFC
      <Badge style={{margin: 'auto 40px auto auto'}} badgeContent={3} color="error">
          {/* <MailIcon /> */}
        </Badge>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        AFC Questions
      </ExpansionPanelDetails>
    </ExpansionPanel>


        {/* <Creatable/>
        <CitiesField/> */}
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
  