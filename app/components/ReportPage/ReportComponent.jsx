import React, {Component} from 'react'
import {connect} from 'react-redux'
import Bar from './Chart/Bar'
import FilterByYear from './Filter/FilterByYear'
import FilterByProduct from './Filter/FilterByProduct'
import FilterLabel from './Filter/FilterLabel'
import {updateStateData} from 'actions'

class ReportComponent extends Component{
  render() {
    let {year, product} = this.props.mainState.filter;
    return (
      <React.Fragment>
        <div className="ui grid padded equal width">
          <div className="column">
            <div className="ui segment">
             <FilterLabel/>
              <FilterByYear/>
              {" | "}
              <FilterByProduct/>
            </div>
          </div>
        </div>
        <div className="grid ui padded equal width">
          <div className="column">
            <Bar 
              url={`http://erpapp/report?year=${year}&type=year&product-id=${product}`}/>
          </div>
          <div className="column">
            <Bar
              url={`http://erpapp/report?year=${year}&type=quarter&product-id=${product}`}/>
          </div>
        </div>
        <div className="ui grid padded equal width">
          <div className="column">
            <Bar
               url={`http://erpapp/report?year=${year}&type=month&product-id=${product}`}
            />
          </div>
        </div>
        <div className="ui grid padded equal width">
          <div className="column">
            <Bar
              url={`http://erpapp/report?year=${year}&type=weekofyear&product-id=${product}`}
            />
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
})(ReportComponent);
