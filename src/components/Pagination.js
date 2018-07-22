import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Pagination from 'react-bootstrap/lib/Pagination';
import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap-theme.css';
import MultiSelectField from './Multiselect.js'
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import ProgressBar from 'react-bootstrap/lib/ProgressBar';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';

import {
    CSSTransition,
    TransitionGroup,
  } from 'react-transition-group';
  


class Pagination_App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          activeNumber: 2,
          items: [],
          selected_value: null,
          questions: [],
          questions_data:[]
        };
        // this.handleclick = this.handleclick.bind(this);

      }
    
    create_item(active_num) {
        this.setState({activeNumber: active_num})
        console.log(active_num)

        //Clear the selected values each time new page selected
        this.setState({selected_value: null})
        var new_items = []
        // for (let number = 2; number <= 4; number++) {
        this.state.questions.forEach(number => {
            var text = this.state.questions_data.filter(text => text.id==number).map(text => text.question_text)
            const tooltip = (
                <Tooltip id="tooltip">
                <strong>{number}:</strong> {text}
                </Tooltip>
                );

            new_items.push(
                <OverlayTrigger placement="left" overlay={tooltip}  >
                <Pagination.Item
                    active={number===active_num}
                    onClick={this.create_item.bind(this, number)}            
                >{number} </Pagination.Item>

                </OverlayTrigger>
                )
      
        });    
          this.setState({items: new_items})
          }
        
    

    componentWillMount() {
        
        (async() => {
            try {
              var response = await fetch('http://127.0.0.1:8000/api');
              var data = await response.json();
              this.setState({questions_data: data})
              var x = await data.map(text => text.id).sort()
              this.setState({questions: x})
              console.log(x)
              var y = []
              x.forEach(number => {
                    var text = data.filter(text => text.id==number).map(text => text.question_text)
                    const tooltip = (
                        <Tooltip id="tooltip">
                        <strong>{number}:</strong> {text}
                        </Tooltip>
                        );

                // for (let number = 2; number <= 4; number++) {    
                    y.push(
                    <OverlayTrigger placement="left" overlay={tooltip}  >
        
                    <Pagination.Item 
                        active={number===this.state.activeNumber} 
                        onClick={this.create_item.bind(this, number)}
                    >
                    {number} 
                    </Pagination.Item>
                    </OverlayTrigger>

                )
                })
            this.setState({items: y})

            // console.log(y)
            //   this.setState(items:y)

            //   console.log(data);
            } catch (e) {
              console.log("Booo")
            }
          })();
          
        }
    
    render() {

        var choice_type = this.state.questions_data.filter(choice => choice.id==this.state.activeNumber).map(choice => choice.choice_type)
		var text = this.state.questions_data.filter(text => text.id==this.state.activeNumber).map(text => text.question_text)

        console.log(this.state.items)
        console.log('xx'+this.state.activeNumber)
        console.log('xx'+choice_type)

        const now = 60;
        const now2 = 30

        return (
            <div style={{textAlign:'center'}}>
            <ProgressBar now={now} label={`${now}%`} />
            <Jumbotron style={{padding: '20px', borderRadius:'20px'}}>
            <Pagination  bsSize="small">
            <Pagination.First />
            <Pagination.Prev />
            
            {/* {this.create_item.bind(this, this.state.activePage)} */}
            {this.state.items}
            <Pagination.Next />
            <Pagination.Last />
            </Pagination>
            {/* <br /> */}
            <br/>
            <div>
            <MultiSelectField key={1} q_id={this.state.activeNumber} value={this.state.selected_value}
                              q_choice_type={choice_type} text={text}
                                      />
            </div>
            </Jumbotron>
            </div>

        );
      }
    }
    
export default Pagination_App;
    