import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import MultiSelectField from './components/Multiselect.js'
import Creatable from './components/Creatable.js'
import CitiesField from './components/Virtualized.js'
import Pagination_App from './components/Pagination.js'

// import './example.less';



const Choice = [
	{ label: 'Chocolate', value: 'chocolate' },
	{ label: 'Vanilla', value: 'vanilla' },
	{ label: 'Strawberry', value: 'strawberry' },
	{ label: 'Caramel', value: 'caramel' },
	{ label: 'Cookies and Cream', value: 'cookiescream' },
	{ label: 'Peppermint', value: 'peppermint' },
];


const SelectStyle = {width:'50%', padding:'30px'}


class App extends Component {
  constructor() {
    super();
    this.state = {
      questions: []
    }
  }


//   componentWillMount() {
// fetch('http://127.0.0.1:8000/api/').then(response => response.json())
// .then(data => this.setState({ questions: data }));
//   }

  render() {
    // const { questions } = this.state;
    // console.log(questions)
    // var text = questions.filter(text => text.id==3).map(text => text.question_text)
    // console.log(text)
    return (
      <div style = {SelectStyle} >
      
        {/* <h1>First Compliance</h1> */}
        
        {/* <div>
          {questions.map(data =>
          <div key={data.id}>
            <a>{data.question_text}</a>
          </div>
          )}
        </div> */}

        <Pagination_App />
        {/* <MultiSelectField example={text}/> */}
        

        {/* <Creatable/>
        <CitiesField/> */}
      </div>
    );
  }
}

export default App;
