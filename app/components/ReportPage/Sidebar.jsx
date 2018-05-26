import React, { Component } from 'react'
import {updateStateData} from 'actions'
import {connect} from 'react-redux'
class SidebarComponent extends Component {
  constructor(props) {
    super(props);
    this.showReportBy = this.showReportBy.bind(this);
    this.showMenu = this.showMenu.bind(this);
  }
  showReportBy(type) {
    this.props.dispatch(updateStateData({
      reportBy: type
    }));
  }
  showMenu() {
    let {reportBy} = this.props.mainState;
    let menus = [
      {
        reportBy: 'doanh_thu_tong',
        title: 'Doanh thu theo năm'
      },
      {
        reportBy: 'theo_mien',
        title: 'Doanh thu theo miền'
      },
      {
        reportBy: 'theo_tinh',
        title: 'Doanh thu theo tỉnh'
      },
    ];
    return menus.map((menu, index) => {
      return (
        <div 
          onClick={() => {
            this.props.dispatch(updateStateData({
              reportBy: menu.reportBy
            }));
          }}
          key={index} 
          className={`menu_item ${reportBy == menu.reportBy ? 'active': ''}`}>
          <div className="info">{menu.title}</div>
        </div>
      );
    });
  }
  render() {
    return (
      <React.Fragment>
        <div className="main_menu">
          {this.showMenu()}
          <div className="menu_item">
            <div className="info">Quản lý kế hoạch</div>
          </div>
          <div className="menu_item">
            <div className="info">Quy đổi đơn vị tính</div>
          </div>
          <div className="menu_item">
            <div className="info">Tất cả biểu đồ</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
};
export default connect((state) => {
  return {
    mainState: state.main.present,
  }
})(SidebarComponent);