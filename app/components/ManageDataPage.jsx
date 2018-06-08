import React, { Component } from 'react'
import { connect } from 'react-redux'
import ManageSidebar from './ManageDataPage/ManageSidebar'
import ManageStores from './ManageDataPage/ManageStores'
import ManageOrders from './ManageDataPage/ManageOrders'
import ManagePlan from './ManageDataPage/ManagePlan'
import LoginForm from './LoginForm'
import {updateStateData} from 'actions'
import {getTokenHeader} from 'ISD_API'

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
      case 'orders':
        return <ManageOrders url={ISD_BASE_URL + 'orders'}/>
        break;
      case 'plan':
        return <ManagePlan url={ISD_BASE_URL + 'plan'}/>
        break;
      default:
        return <h1>Render {pageId} page</h1>
        break;
    }
  }
  componentWillMount() {
    let {mainState} = this.props;
    if(!mainState.userInfo) {
      let token = sessionStorage.getItem('ISD_TOKEN');
      if(token != "" && token != null) {
        fetch(ISD_BASE_URL + 'fetchRoles', {
          headers: getTokenHeader()   
        })
        .then((response) => response.json())
        .then((json) => {
          if(json.userInfo) {
            this.props.dispatch(updateStateData({
              showLogin: false,
              userRoles: json.scopes,
              defaultRouter: json.scopes[0] && json.scopes[0]['path'] ? json.scopes[0]['path'] : '',
              userInfo: json.userInfo
            }));
          } else if(json.status == "error") {
            alert(json.message);
          }
        })
        .catch((error) => {
          console.warn(error);
        });
      }
    } else {
      this.props.dispatch(updateStateData({
        defaultRouter: mainState.defaultRouter
      }));
    }
  }
  render() {
    let { pageId, showLogin } = this.props.mainState;
    if(showLogin) {
      return (
        <LoginForm dispatch={this.props.dispatch}/>
      );
    }
    return (
      <React.Fragment>
        <div className="grid-container">
          <div className="header">
            <div className="header_left">
              
            </div>
            <div className="header_center">
            <h2>QUẢN TRỊ KHÁCH HÀNG</h2>
            </div>
            <div className="header_right">
              <div className="user-info" style={{margin: 10}}>
                <p>Xin chào,<b>Admin!</b></p>
              </div>
              <button
                onClick={() => {
                  this.props.dispatch(updateStateData({
                    showLogin: true
                  }));
                }} 
                className="ui button primary inverted teal">Đăng xuất</button>
            </div>
          </div>
          <div className="menu menu_active">
            <a href="#"><img width="200" src="images/logo-pharma.png" /></a>
            <div className="block_ava">
              {/* <a href="#"><img src="images/ava.jpg" /></a>
              <p>Xin chào,<span>Admin!</span></p> */}
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
