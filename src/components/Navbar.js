import React ,{Component} from 'react';
import FaList from 'react-icons/lib/fa/list';
import './Navbar.css';
class Navbar extends Component {
  render(){  
      return(
        <div>
          <div class="flex-container">
              <div class="icon"><FaList/></div>
              <div >Chart Dashboard</div>
            </div >
        </div>       
      );
  }
}
 export default Navbar;