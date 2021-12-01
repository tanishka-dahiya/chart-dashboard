import React ,{Component} from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { compose } from 'redux';
//import ChipInput from 'material-ui-chip-input';
import { creatTodoActions,getTasks} from '../components/tododucks';
import {constants} from '../constants';
import {
  Card,CardHeader,CardBody,CardFooter,Alert
} from "reactstrap";
import './Graph.css';

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
      labels.push(`${constants.value}${index+1}`)
    });
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
          {data.map((task, index) => {
            if(task.type === constants.pie) {
              const data = {
              labels: this.getLablels(task),
              datasets: [{
              data:task.elements,
              backgroundColor: this.getBGColor(task),
              }]
              };
              return (<div className='cardClass'> 
                <Card >
                <CardHeader tag="h3">
                  Pie Chart
                 </CardHeader>
                  <CardBody>
                   <Doughnut data={data}height={50} /> 
                    </CardBody>
                     <CardBody>
                   {/* <ChipInput
                   defaultValue={task.elements}
                   onChange={(chips) => this.handleChips(chips,index)}/> */}
                    </CardBody> <CardFooter className="text-muted">
                   </CardFooter>
                </Card></div>
              )
            }
            else{
               const data = {
                labels: this.getLablels(task),
                datasets: [{
                label: constants.value,
                data: task.elements,
                backgroundColor:this.getBGColor(task),
                borderWidth: 1
                }]
                };
              return ( <div className='cardClass'><Card>
                <CardHeader tag="h3">
                 Bar Graph
                 </CardHeader>
                  <CardBody>
                 <Bar data={data}  height = {90} /> 
                  </CardBody>
                   <CardBody>
                 {/* <ChipInput
                 defaultValue={task.elements}
                 onChange={(chips) => this.handleChips(chips,index)} /> */}
                 </CardBody> <CardFooter className="text-muted">
    </CardFooter> </Card>
    </div>)
            }
      })
    }
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