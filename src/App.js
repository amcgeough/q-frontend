import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import MultiSelectField from './components/Multiselect.js'
import Creatable from './components/Creatable.js'
import CitiesField from './components/Virtualized.js'
import Pagination_App from './components/Pagination.js'
import Navigation_App from './components/NavigationApp.js';
import Typist from 'react-typist';
import {Tabs, Tab} from 'react-bootstrap';
import Infinite from 'react-infinite'

// import './example.less';



const Choice = [
	{ label: 'Chocolate', value: 'chocolate' },
	{ label: 'Vanilla', value: 'vanilla' },
	{ label: 'Strawberry', value: 'strawberry' },
	{ label: 'Caramel', value: 'caramel' },
	{ label: 'Cookies and Cream', value: 'cookiescream' },
	{ label: 'Peppermint', value: 'peppermint' },
];


const SelectStyle = {width:'50%', padding:'30px', width: '700px',
marginLeft: 'auto',
marginRight: 'auto'}


class App extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      scroll_div: 'h1',
      isInfiniteLoading: false,
      elements: this.buildElements(0, 15)
    }
    this.buildElements = this.buildElements.bind(this)
    this.handleScroll = this.handleScroll.bind(this)

  }


buildElements(start, end) {
  var x = [];
  for (var i = start; i < end; i++) {
      x.push(
      <div style={{background:'red', color:'white'}} key={i}>   {i}  </div>
    )
  }
  return x;
}


handleScroll() {
  this.setState({isInfiniteLoading: true});
  
  setTimeout( function() {
    var elemLength = this.state.elements.length
    var newelements = this.buildElements(elemLength, elemLength+1)
    this.setState({
      isInfiniteLoading: false,
      elements: this.state.elements.concat(newelements)
      })
    }.bind(this), 2500)

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
      <div>
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
        <Tabs defaultActiveKey={1} id="uncontrolled-tab-example" bsStyle="tabs" style={{marginBottom:'20px'}}>
  <Tab eventKey={1} title="GDPR">
  {/* <div>
  <Pagination_App key={1.5}/>
  </div> */}
  </Tab>
  <Tab eventKey={2} title="AML">

  </Tab>
  <Tab eventKey={3} title="AFC">

  </Tab>
</Tabs>

        <Pagination_App key={1.5}/>
        {/* <MultiSelectField example={text}/> */}
        

        {/* <Creatable/>
        <CitiesField/> */}
      </div>

      <div>
      <Infinite elementHeight={20}
                containerHeight={200}
                infiniteLoadBeginEdgeOffset={1}
                // useWindowAsScrollContainer={false} 
                // displayBottomUpwards={false}
                // handleScroll={this.handleScroll}
                onInfiniteLoad={this.handleScroll}
                isInfiniteLoading={this.state.isInfiniteLoading}
                loadingSpinnerDelegate={this.elementInfiniteLoad()}

      >

      {this.state.elements}

      </Infinite>
      </div>

      </div>


    );
  }
}

export default App;
