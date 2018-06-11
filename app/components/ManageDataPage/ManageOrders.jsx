import React from 'react';
import {Loader} from 'semantic-ui-react'
import OrdersTableData from './ManageOrders/OrdersTableData'
import { getTokenHeader } from '../../api/api';

export default class ManageOrders extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="ui segment">
         <OrdersTableData url={this.props.url}/>
      </div>
    );
  }
}