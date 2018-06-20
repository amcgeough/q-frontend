import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Pagination from 'react-bootstrap/lib/Pagination';
import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap-theme.css';
import MultiSelectField from './Multiselect.js'


class Pagination_App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          activeNumber: 2,
          items: []
        };
        // this.handleclick = this.handleclick.bind(this);

      }
    
    create_item(active_num) {
        this.setState({activeNumber: active_num})
        console.log(active_num)
        var new_items = []
        for (let number = 2; number <= 4; number++) {    
            new_items.push(
          <Pagination.Item 
              active={number===active_num}
              onClick={this.create_item.bind(this, number)}            
          >{number} </Pagination.Item>
          )
          this.setState({items: new_items})
          }
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
        }  
  
    render() {
        
        return (
          <div>
            
            <div>
            <Pagination bsSize="small">
            <Pagination.First />
            <Pagination.Prev />
            
            {/* {this.create_item.bind(this, this.state.activePage)} */}
            {this.state.items}
            <Pagination.Next />
            <Pagination.Last />
            </Pagination>
            {/* <br /> */}

            <MultiSelectField q_id={this.state.activeNumber}/>
            </div>
            <div><h1> {this.state.activeNumber} </h1></div>
    
          </div>
        );
      }
    }
    
export default Pagination_App;
    