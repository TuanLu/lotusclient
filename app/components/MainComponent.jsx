import React, {Component} from 'react'
import {connect} from 'react-redux'
//import Bar from './Chart/Bar'
import TableData from './TableData/TableData'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'
import {convertObjectsToArray} from 'ISD_API'

class MainComponent extends Component{
  render() {
    const orderData = this.props.mainState.orderData || {};
    let orderDataArr = convertObjectsToArray(orderData);
    return (
      <div id="main" className="container ui">
        <div className="ui message info">Will Be more</div>
        {orderDataArr.length ? 
        <TableData orderData={orderDataArr}/> 
        : 
        <Loader active>Đang xử lý dữ liệu</Loader>
        }
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
