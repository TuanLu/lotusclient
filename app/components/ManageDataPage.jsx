import React, { Component } from 'react'
import { connect } from 'react-redux'
import ManageSidebar from './ManageDataPage/ManageSidebar'
import ManageStores from './ManageDataPage/ManageStores'
import ManageOrders from './ManageDataPage/ManageOrders'
import ManagePlan from './ManageDataPage/ManagePlan'
import ManageProduct from './ManageDataPage/ManageProducts'
import LoginForm from './LoginForm'
import {updateStateData} from 'actions'
import {getTokenHeader} from 'ISD_API'
import UserInfo from './UserInfo';

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
      case 'products':
        return <ManageProduct url={ISD_BASE_URL + 'products'}/>
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
              <UserInfo dispatch={this.props.dispatch} mainState={this.props.mainState}/>
            </div>
          </div>
          <div className="menu menu_active">
            <a href="#"><img width="200" src="images/logo-pharma.png" /></a>
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
