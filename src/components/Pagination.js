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

import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import Waypoint from 'react-waypoint';

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
          questions_data:[],
          expanded: false,
          q_divs: []
        };
        // this.handleclick = this.handleclick.bind(this);

      }
    
    handleSetActive() {
        console.log('reached')
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
                >
                {/* {number}  */}
                </Pagination.Item>

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
                    {/* {number}  */}
                    </Pagination.Item>
                    </OverlayTrigger>

                )
                })
            this.setState({items: y})
            var id_list = this.state.questions_data.map(text => text.id).sort()
            var question_divs = []
            id_list.forEach(number => {
                var choice_type = this.state.questions_data.filter(choice => choice.id==number).map(choice => choice.choice_type)
                var text = this.state.questions_data.filter(text => text.id==number).map(text => text.question_text)
                var key = number.toString()
                var expand2 = (number==id_list[0]) ? true : false
                var marginTop = (number==id_list[0]) ? '100px' : '20px'
                console.log('expp '+expand2+number)

                question_divs.push(
    
                    <Waypoint
                    topOffset="45%" 
                    bottomOffset="50%"
                    key={number}
                    onEnter={this.onWaypointEnter.bind(this, number)}
                    onLeave={this.onWaypointLeave.bind(this, number)}
                    >
                    <div style={{marginBottom:'100px', marginTop:marginTop}}>
    
                    <div>  
                    <MultiSelectField key={key} q_id={number} value={this.state.selected_value}
                                  q_choice_type={choice_type} text={text} expanded={expand2}
                                          />
                    </div>
                    </div>
                    </Waypoint>
                    )
                })
            this.setState({q_divs : question_divs})
    

            // console.log(y)
            //   this.setState(items:y)

            //   console.log(data);
            } catch (e) {
              console.log("Booo")
            }
          })();
          
        }
    
        componentDidMount() {
        Events.scrollEvent.register('begin', function(to, element) {
            console.log("begin", to, element);
          })
      
          Events.scrollEvent.register('end', function(to, element) {
            console.log("end", to, element);
          });
          scrollSpy.update();
        }
    
        componentWillUnmount() {
            Events.scrollEvent.remove('begin');
            Events.scrollEvent.remove('end');
          }
        
        
        
        onWaypointEnter(num) {

            var images = [
                'https://images.unsplash.com/photo-1534259362708-6d0c72ccdf3e?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=230ae279dbd51cf79fc5664d7033df81',
                'https://images.unsplash.com/photo-1534535091711-71b06c129856?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=87281f428e5bb02cb58585c9d66d7205',
                'https://images.unsplash.com/photo-1534683299359-d2d10dda2d3d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=1b9005722612f839d8edc32af15db814',
                'https://images.unsplash.com/photo-1534422114493-c99b74dceb37?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=30d9fedc797101b9230e3c02d972f4d6',
                'https://images.unsplash.com/photo-1534436828370-d7b0bd2a2360?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=cb77019188640d612fb2777c3139f3d2',
                'https://images.unsplash.com/photo-1534841070059-fac69c75d466?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=4adbf3bc7727b2b2237e8e256102164f',
                'https://images.unsplash.com/photo-1534258698732-f4f27981a92b?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=f26814d262f9b485ac72fbf7beda3a95',
                'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=6663d7c77f9c17c5382310c7bceff5fa'

            ]

            console.log('Hieee '+num)
            //this.setState({expanded: false})
            var id_list = this.state.questions_data.map(text => text.id).sort()
            var question_divs = []
            id_list.forEach(number => {
                var choice_type = this.state.questions_data.filter(choice => choice.id==number).map(choice => choice.choice_type)
                var text = this.state.questions_data.filter(text => text.id==number).map(text => text.question_text)
                var key = number.toString()
                var expand = (num==number) ? true : false
                var marginTop = (number==id_list[0]) ? '100px' : '20px'

                console.log('eee ' +expand)
                question_divs.push(
    
                    <Waypoint 
                    topOffset="45%" 
                    bottomOffset="50%"
                    key={number}
                    onEnter={this.onWaypointEnter.bind(this, number)}
                    onLeave={this.onWaypointLeave.bind(this, number)}
    
                    >
                    <div style={{marginBottom:'0px', marginTop:marginTop}}>
    
                    <div>  
                    <MultiSelectField key={key} q_id={number} value={this.state.selected_value}
                                  q_choice_type={choice_type} text={text} expanded={expand} image={images[number]}
                                          />
                    </div>
                    </div>
                    </Waypoint>
                    )
                })
            this.setState({q_divs : question_divs})
    

          }
        
        onWaypointLeave(number) {
            console.log('Byeee '+number)
            this.setState({expanded: false})
          }


        render() {

        // var choice_type = this.state.questions_data.filter(choice => choice.id==this.state.activeNumber).map(choice => choice.choice_type)
		// var text = this.state.questions_data.filter(text => text.id==this.state.activeNumber).map(text => text.question_text)
        var id_list = this.state.questions_data.map(text => text.id).sort()

        console.log(this.state.items)
        console.log('xx'+this.state.activeNumber)
        // console.log('xx'+choice_type)

        const now = 60;
        const now2 = 30

        // var question_divs = []
        // id_list.forEach(number => {
        //     var choice_type = this.state.questions_data.filter(choice => choice.id==number).map(choice => choice.choice_type)
        //     var text = this.state.questions_data.filter(text => text.id==number).map(text => text.question_text)
        //     var key = number.toString()
        //     question_divs.push(

        //         <Waypoint 
        //         topOffset="45%" 
        //         bottomOffset="50%"
        //         key={number}
        //         onEnter={this.onWaypointEnter.bind(this, number)}
        //         onLeave={this.onWaypointLeave.bind(this, number)}

        //         >
        //         <div style={{marginBottom:'100px'}}>

        //         <div>  
        //         <MultiSelectField key={key} q_id={number} value={this.state.selected_value}
        //                       q_choice_type={choice_type} text={text} expanded={this.state.expanded}
        //                               />
        //         </div>
        //         </div>
        //         </Waypoint>
        //         )
        //     })
        // this.state.q_divs = question_divs

        return (
            <div style={{textAlign:'center'}}>
            <Jumbotron id="containerElement" style={{padding: '20px',paddingBottom:'350px', borderRadius:'20px', 
                                                    maxHeight:'900px', overflowY:'scroll', backgroundColor:'transparent'}}>
            <ProgressBar now={now} label={`${now}%`} />

            <Pagination  bsSize="small" style={{paddingBottom:'120px', color:'green'}} >
            {/* <Pagination.First />
            <Pagination.Prev /> */}
            
            {/* {this.create_item.bind(this, this.state.activePage)} */}
            {this.state.items}
            {/* <Pagination.Next />
            <Pagination.Last /> */}
            </Pagination>
            {/* <br /> */}
            <br/>
            <div >
            {/* <MultiSelectField key={1} q_id={this.state.activeNumber} value={this.state.selected_value}
                              q_choice_type={choice_type} text={text}
                                      /> */}
            {this.state.q_divs}
            </div>
            </Jumbotron>
            </div>

        );
      }
    }
    
export default Pagination_App;
    