import React ,{Component} from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ChipInput from 'material-ui-chip-input'
import { creatTodoActions,getTasks} from '../components/tododucks';
import {constants} from '../constants';
import './Graph.css';
import CanvasJSReact from "./canvasjs.react";
import {
Alert
} from "reactstrap";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var chart;
export class PieChart extends Component {
  constructor(props) 
  {
    super(props);
    this.props.addTodo();
    this.state = {
      showError:false
    };
  }

  //get labels for charts
  getLablels= (task) =>{
    const labels = [];
    task.elements.forEach((element,index) => {
      labels.push({ label: `${constants.value}${index+1}`,  y: Number(element)  });
    });
    console.log(labels);
    return labels;
  };
  
//get random colours for charts
  getBGColor= (task) =>{
    const bgColour = [];
    task.elements.forEach((element,index) => {
      bgColour.push(constants.hash + ((1<<24)*Math.random() | 0).toString(16));
    });
    return bgColour;
  };

//check for adding chips 
  handleChips=(chips,index)=>{
    const re = /^[0-9\b]+$/;
    const result = chips.some(function(arrVal) {
    return !re.test(arrVal);
     });
      if (result) { 
        this.setState({showError: true});
        window.scrollTo(0,0);
      }
      else{
      this.props.updateChartData(chips,index,this.props.IsTasks);
      }
  }

   render(){ 
    const data = this.props.IsTasks;
   return(<>
    <Alert color="info"  isOpen={this.state.showError} toggle={(e) => this.setState({showError: false})} >
         Please Enter Numbers Only
         </Alert>
       {  data.map((task, index) => {
          const options = {
            theme: "light2", // "light1", "dark1", "dark2"
            animationEnabled: true, //Change to false
            animationDuration: 1200, //Change it to 2000		
            title:{
              text: task.type === constants.pie? "Pie Chart":"Bar Graph"
            },
            data: [
            {
              //Change type to "line", "bar", "area", "pie", etc.
              type: task.type === constants.pie?"pie": "column",
              dataPoints: this.getLablels(task)
            }
            ]
          },
          
          //Styling Chart Container
          containerProps = {
            width: "100%",
            height: "300px",
            border: "1px solid black"
          };
        
           return ( <div className='cardClass'>
               <CanvasJSChart
          options={options}
          onRef={ref => (chart = ref)} //Reference to the chart-instance
          containerProps={containerProps}
        />
     <ChipInput
  defaultValue={task.elements}
  onChange={(chips) => this.handleChips(chips,index)}
/>
               </div>)
         }
   )}
</>
);
}
}
  export default compose(
    connect(
      state => ({
        IsTasks: getTasks(state)
    }),
        { ...creatTodoActions }
    )
  )(PieChart);