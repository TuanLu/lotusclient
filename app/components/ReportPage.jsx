import React, { Component } from 'react'
import { connect } from 'react-redux'
import Sidebar from './ReportPage/Sidebar'
import ReportComponent from './ReportPage/ReportComponent'

class ReportPage extends Component {
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
                  <ReportComponent/>
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
