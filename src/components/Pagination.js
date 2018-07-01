import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Pagination from 'react-bootstrap/lib/Pagination';
import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap-theme.css';
import MultiSelectField from './Multiselect.js'
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import ProgressBar from 'react-bootstrap/lib/ProgressBar';

class Pagination_App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          activeNumber: 2,
          items: [],
          selected_value: null,
          questions: []
        };
        // this.handleclick = this.handleclick.bind(this);

      }
    
    create_item(active_num) {
        this.setState({activeNumber: active_num})
        console.log(active_num)
        this.setState({selected_value: null})
        var x = this.state.questions
        var new_items = []
        // for (let number = 2; number <= 4; number++) {
        x.forEach(number => {
            new_items.push(
                <Pagination.Item
                    active={number===active_num}
                    onClick={this.create_item.bind(this, number)}            
                >{number} </Pagination.Item>
                )
      
        });    
          this.setState({items: new_items})
          }
        
    

    componentWillMount() {
        for (let number = 2; number <= 4; number++) {    
            this.state.items.push(
            <Pagination.Item 
                active={number===this.state.activeNumber} 
                onClick={this.create_item.bind(this, number)}
            >{number} </Pagination.Item>
        );
        }
    
        fetch('http://127.0.0.1:8000/api').then(response => response.json())
        .then(data => this.setState({ questions: data.map(text => text.id).sort() }));
        
        }
        
  
    render() {
        const now = 60;
        const now2 = 30
        // var question_ids = this.state.questions.map(text => text.id)
        // console.log(question_ids.sort())
        console.log(this.state.questions)

        return (
            <div>
            <ProgressBar now={now} label={`${now}%`} />
            <Jumbotron style={{padding: '20px', borderRadius:'20px'}}>
            <Pagination  bsSize="small" style={{width: '400px', float:'right'}}>
            <Pagination.First />
            <Pagination.Prev />
            
            {/* {this.create_item.bind(this, this.state.activePage)} */}
            {this.state.items}
            <Pagination.Next />
            <Pagination.Last />
            </Pagination>
            {/* <br /> */}
            <br/><br/><br/>
            <div>
            <MultiSelectField key={1} q_id={this.state.activeNumber} value={this.state.selected_value}/>
            </div>
            </Jumbotron>
            </div>

        );
      }
    }
    
export default Pagination_App;
    