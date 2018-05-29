import React from 'react';
import {Loader} from 'semantic-ui-react'
import OrdersTableData from './ManageOrders/OrdersTableData'

export default class ManageOrders extends React.Component {
  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.state = {
      dataUpToDate: null,
      url: this.props.url,
      datasource: []
    }
  }
  fetchData() {
    let {url} = this.state;
    if(!url) return false;
    fetch(url)
      .then((response) => {
        return response.json();
      }).then((json) => {
        if(json.status && json.status == "error") {
          console.warn(json.message);
          return false;
        }
        if(json.data && json.data.length) {
          this.setState({
            dataUpToDate: true,
            datasource: json.data
          });
        }
      }).catch((error) => {
        console.log('parsing failed', error)
      });
  }
  
  componentDidMount() {
    this.fetchData();
  }
  render() {
    return (
      <div className="ui segment">
        {this.state.dataUpToDate ? 
          <React.Fragment>
            <OrdersTableData data={this.state.datasource}/>
          </React.Fragment>
          : 
          <Loader active inline content="Loading"/>
          }
      </div>
    );
  }
}