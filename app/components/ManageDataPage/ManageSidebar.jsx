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
      pageId: type
    }));
  }
  showMenu() {
    let {pageId} = this.props.mainState;
    let menus = [
      {
        pageId: 'orders',
        title: 'Quản lý đơn hàng'
      },
      {
        pageId: 'stores',
        title: 'Quản lý nhà thuốc',
      },
      // {
      //   pageId: 'products',
      //   title: 'Quản lý sản phẩm',
      // },
      {
        pageId: 'plan',
        title: 'Quản lý kế hoạch',
      },
    ];
    return menus.map((menu, index) => {
      return (
        <div 
          onClick={() => {
            let updateData = {
              pageId: menu.pageId
            };
            this.props.dispatch(updateStateData(updateData));
          }}
          key={index} 
          className={`menu_item ${pageId == menu.pageId ? 'active': ''}`}>
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