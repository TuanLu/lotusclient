import React from 'react';
import {Loader} from 'semantic-ui-react'
import StoresTableData from './ManageStores/StoresTableData'

export default class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.state = {
      dataUpToDate: null,
      url: this.props.url,
      stores: []
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
            stores: json.data
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
            <StoresTableData data={this.state.stores}/>
          </React.Fragment>
          : 
          <Loader active inline content="Loading"/>
          }
      </div>
    );
  }
}