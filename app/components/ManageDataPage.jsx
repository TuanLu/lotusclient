import React, { Component } from 'react'
import { connect } from 'react-redux'
import ManageSidebar from './ManageDataPage/ManageSidebar'
import ManageStores from './ManageDataPage/ManageStores'

class ManageDataPage extends Component {
  constructor(props) {
    super(props);
    this.renderManagePage = this.renderManagePage.bind(this);
  }
  renderManagePage() {
    let {pageId} = this.props.mainState;
    switch (pageId) {
      case 'stores':
        return <ManageStores url={ISD_BASE_URL + 'stores'}/>
        break;
      default:
        return <h1>Render {pageId} page</h1>
        break;
    }
  }
  render() {
    let { pageId } = this.props.mainState;
    return (
      <React.Fragment>
        <div className="grid-container">
          <div className="header">
            <div className="header_left">
              
            </div>
            <div className="header_center">
              <h2>Quản lý dữ liệu nhà thuốc, đơn hàng, sản phẩm</h2>
            </div>
            <div className="header_right">Liên Kết</div>
          </div>
          <div className="menu menu_active">
            <a href="#"><img width="200" src="images/logo-pharma.png" /></a>
            <div className="block_ava">
              <a href="#"><img src="images/ava.jpg" /></a>
              <p>Xin chào,<span>Admin!</span></p>
            </div>
            <ManageSidebar/>
          </div>
          <div className="isd_main">
            <div className="main_content">
              <div className="main_content_left active" page="main">
                <div className="list_infos">
                  {this.renderManagePage()}
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
})(ManageDataPage);