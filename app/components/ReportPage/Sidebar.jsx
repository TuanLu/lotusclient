import React, { Component } from 'react'
class SidebarComponent extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="main_menu">
          <div className="menu_item active">
            <div className="info">Doanh thu theo năm</div>
          </div>
          <div className="menu_item">
            <div className="info">Doanh thu theo miền</div>
          </div>
          <div className="menu_item">
            <div className="info">Biểu đồ Sản Phẩm</div>
          </div>
          <div className="menu_item">
            <div className="info">Biểu đồ địa lý</div>
          </div>
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
export default SidebarComponent