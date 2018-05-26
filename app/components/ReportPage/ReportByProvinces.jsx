import React, {Component} from 'react'
import {connect} from 'react-redux'
import Bar from './Chart/Bar'
//import ProvinceChart from './Chart/ProvinceChart'
//import ProvinceChartQuarter from './Chart/ProvinceChartQuarter'
import {updateStateData} from 'actions'
import FilterByYear from './Filter/FilterByYear'
import FilterByQuarter from './Filter/FilterByQuarter'
import FilterByProduct from './Filter/FilterByProduct'
import FilterByArea from './Filter/FilterByArea'
import FilterLabel from './Filter/FilterLabel'

class ReportByProvinces extends Component{
  render() {
    let {year, product, area, quarter} = this.props.mainState.filter;
    return (
      <React.Fragment>
        <div className="ui grid padded equal width">
          <div className="column">
            <div className="ui segment">
              <FilterLabel/>
              <FilterByArea/>
              {" | "}
              <FilterByProduct/>
              {" | "}
              <FilterByYear/>
              {" | "}
              <FilterByQuarter/>
            </div>
          </div>
        </div>
        <div className="grid ui padded equal width">
          <div className="column">
            <Bar 
              type="horizontalBar"
              url={`http://erpapp/reportbyprovince?year=${year}&type=provinces&product-id=${product}&area=${area}`}/>
          </div>
        </div>
        <div className="grid ui padded equal width">
          <div className="column">
            <Bar
              type="horizontalBar"
              url={`http://erpapp/reportbyprovince?year=${year}&type=provinces_quarter&product-id=${product}&area=${area}&quarter=${quarter}`}/>
          </div>
        </div>
        <div className="ui grid padded equal width">
          <div className="column">
            {/* <Bar
               url={`http://erpapp/reportbyprovince?year=${year}&type=provinces_month&product-id=${product}&area=${area}`}
            /> */}
          </div>
        </div>
        <div className="ui grid padded equal width">
          <div className="column">
            {/* <Bar
              url={`http://erpapp/reportbyprovince?year=${year}&type=provinces_week&product-id=${product}&area=${area}`}
            /> */}
          </div>
        </div>      
      </React.Fragment>
    );
  }
};
export default connect((state) => {
  return {
    mainState: state.main.present,
    uiState: state.ui,
  }
})(ReportByProvinces);
