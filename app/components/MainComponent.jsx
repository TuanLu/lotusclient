import React, {Component} from 'react'
import {connect} from 'react-redux'
//import Bar from './Chart/Bar'
import TableData from './TableData/TableData'

class MainComponent extends Component{
  render() {
    return (
      <div id="main" className="container ui">
        <div className="ui message info">Will Be more</div>
        <TableData/>
      </div>
    );
  }
};
export default connect((state) => {
  return {
    mainState: state.main.present,
    uiState: state.ui,
  }
})(MainComponent);
