import React, {Component} from 'react'
import {connect} from 'react-redux'
//import Bar from './Chart/Bar'
import TableData from './TableData/TableData'
import UploadFile from './UploadFile'
import { Dimmer, Segment } from 'semantic-ui-react'
import {convertObjectsToArray} from 'ISD_API'
import {updateStateData} from 'actions'

class MainComponent extends Component{
  render() {
    const orderData = this.props.mainState.orderData || {};
    let orderDataArr = convertObjectsToArray(orderData);
    return (
      <div id="main" className="container ui">
        {orderDataArr.length ? 
        <TableData orderData={orderDataArr}/> 
        : 
        <div className="ui segment padded">
          <h1>Chọn file excel</h1>
          <UploadFile 
            url="http://erpapp/upload"
            done={(response) => {
              let resJson = JSON.parse(response);
              if(resJson.status == "success" && resJson.data) {
                this.props.dispatch(updateStateData({
                  orderData: resJson.data
                }));
              }
            }}/>
        </div>
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
