import React, {Component} from 'react'
import {connect} from 'react-redux'
import {convertObjectsToArray} from 'ISD_API'
import {updateStateData} from 'actions'

class ReportComponent extends Component{
  render() {
    return <h2>All Chart will show here</h2>
  }
};
export default connect((state) => {
  return {
    mainState: state.main.present,
    uiState: state.ui,
  }
})(ReportComponent);
