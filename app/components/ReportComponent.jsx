import React, {Component} from 'react'
import {connect} from 'react-redux'
import Bar from './Chart/Bar'
import Filter from './Chart/Filter'
import {updateStateData} from 'actions'

Chart.defaults.global.hover.mode = 'nearest';
Chart.defaults.global.defaultFontColor = '#000';
Chart.defaults.global.defaultFontFamily = "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
Chart.defaults.global.defaultFontSize = 16;

class ReportComponent extends Component{
  render() {
    let {year, product} = this.props.mainState.filter;
    return (
      <div className="ui container">  
        <h1 style={{textAlign: 'center'}}>Các biểu đồ báo cáo theo thời gian</h1>
        <div className="ui grid equal width">
          <div className="column">
            <Filter dispatch={this.props.dispatch} mainState={this.props.mainState}/>
          </div>
        </div>
        <div className="grid ui equal width">
          <div className="column">
            <Bar 
              url={`http://erpapp/report?year=${year}&product-id=${product}`}/>
          </div>
          <div className="column">
            <Bar
              url={`http://erpapp/report?year=${year}&type=month&product-id=${product}`}
            />
          </div>
        </div>
        <div className="ui grid equal width">
          <div className="column">
            <Bar
              url={`http://erpapp/report?year=${year}&type=weekofyear&product-id=${product}`}
            />
          </div>
        </div>
        <div className="ui grid equal width">
          <div className="column">
            <Bar
              type="horizontalBar"
              url={`http://erpapp/report?year=${year}&type=products`}
            />
          </div>
        </div>
      </div>
    );
  }
};
export default connect((state) => {
  return {
    mainState: state.main.present,
    uiState: state.ui,
  }
})(ReportComponent);
