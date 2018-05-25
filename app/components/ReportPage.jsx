import React, { Component } from 'react'
import { connect } from 'react-redux'
import Sidebar from './ReportPage/Sidebar'
import ReportComponent from './ReportPage/ReportComponent'
import ReportByArea from './ReportPage/ReportByArea'

//Global config chart
Chart.defaults.global.hover.mode = 'nearest';
Chart.defaults.global.defaultFontColor = '#000';
Chart.defaults.global.defaultFontFamily = "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
Chart.defaults.global.defaultFontSize = 16;
// Define a plugin to provide data labels
Chart.plugins.register({
  afterDatasetsDraw: function(chart) {
    var ctx = chart.ctx;

    chart.data.datasets.forEach(function(dataset, i) {
      var meta = chart.getDatasetMeta(i);
      if(!chart.config.options.showTooltip) return;
      if (!meta.hidden) {
        meta.data.forEach(function(element, index) {
          // Draw the text in black, with the specified font
          ctx.fillStyle = 'rgb(0, 0, 0)';

          var fontSize = 12;
          var fontStyle = 'normal';
          var fontFamily = 'Helvetica Neue';
          ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

          // Just naively convert to string for now
          var dataString = dataset.data[index].toString();

          // Make sure alignment settings are correct
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          var padding = 5;
          var position = element.tooltipPosition();
          ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);
        });
      }
    });
  }
});

class ReportPage extends Component {
  constructor(props) {
    super(props);
    this.renderReport = this.renderReport.bind(this);
  }
  renderReport() {
    let {reportBy} = this.props.mainState;
    switch (reportBy) {
      case 'theo_mien':
        return <ReportByArea/>
        break;
    
      default:
        return <ReportComponent/>
        break;
    }
  }
  render() {
    let { year, product } = this.props.mainState.filter;
    return (
      <React.Fragment>
        <div className="grid-container">
          <div className="header">
            <div className="header_left">
              <div>Menu</div>
            </div>
            <div className="header_center">
              <h2>BÁO CÁO NỘI BỘ DƯỢC PHẨM TUỆ ĐỨC</h2>
            </div>
            <div className="header_right">Liên Kết</div>
          </div>
          <div className="menu menu_active">
            <a href="#"><img width="200" src="images/logo-pharma.png" /></a>
            <div className="block_ava">
              <a href="#"><img src="images/ava.jpg" /></a>
              <p>Xin chào,<span>Admin!</span></p>
            </div>
            <Sidebar/>
          </div>
          <div className="isd_main">
            <div className="main_content">
              <div className="main_content_left active" page="main">
                <div className="list_infos">
                  {this.renderReport()}
                </div>
              </div>
            </div>
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
})(ReportPage);
