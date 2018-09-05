import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import MultiSelectField from './components/Multiselect.js'
import Creatable from './components/Creatable.js'
import CitiesField from './components/Virtualized.js'
import Pagination_App from './components/Pagination.js'
import Navigation_App from './components/NavigationApp.js';
import Typist from 'react-typist';
import {Tabs, Tab, Radio, Checkbox} from 'react-bootstrap';
import Infinite from 'react-infinite'

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
                  marginLeft: 'auto', marginRight: 'auto', background: 'white', borderRadius:'20px'}


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
    // const { questions } = this.state;
    // console.log(questions)
    // var text = questions.filter(text => text.id==3).map(text => text.question_text)
    // console.log(text)
    return (
      <div style={{backgroundImage: `url(${Background})`}}> 
      <Navigation_App />

      <div style = {SelectStyle} >
      
        {/* <h1>First Compliance</h1> */}
        
        {/* <div>
          {questions.map(data =>
          <div key={data.id}>
            <a>{data.question_text}</a>
          </div>
          )}
        </div> */}
  {/* <Tabs ref='tabs' defaultActiveKey={1} id="uncontrolled-tab-example" bsStyle="tabs" style={{marginBottom:'20px'}}>
  <Tab eventKey={1} title="GDPR">
  </Tab>
  <Tab eventKey={2} title="AML">

  </Tab>
  <Tab eventKey={3} title="AFC">

  </Tab>
</Tabs> */}

        <Pagination_App ref='pagination' key={1.5}/>
        {/* <MultiSelectField example={text}/> */}
        



        {/* <Creatable/>
        <CitiesField/> */}
      </div>

      {/* <div style={{background: this.state.color, color:'white', width:'20%', padding:'0px 0px 0px 10px'}}>

      <Infinite 
                id='scroll'
                ref='scroll'
                elementHeight={20}
                containerHeight={200}
                infiniteLoadBeginEdgeOffset={1}
                useWindowAsScrollContainer={true} 
                // displayBottomUpwards={false}
                handleScroll={this.onScroll}
                onInfiniteLoad={this.handleScroll}
                isInfiniteLoading={this.state.isInfiniteLoading}
                loadingSpinnerDelegate={this.elementInfiniteLoad()}
                style={{width:'20%'}}
      >

      {this.state.elements}

      </Infinite>
      </div> */}
      </div>


    );
  }
}

export default App;
