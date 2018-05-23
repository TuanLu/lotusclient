import React from 'react';
import {Bar, HorizontalBar} from 'react-chartjs-2'
import { Dimmer, Loader} from 'semantic-ui-react'

export default class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.state = {
      data: {},
      options: {},
      legend: {
        
      },
      showChart: false,
      url: this.props.url,
      dataUpToDate: null
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
        this.setState({
          data: json.data,
          options: json.options,
          width: json.width,
          height: json.height,
          showChart: true,
          dataUpToDate: true
        });
      }).catch((error) => {
        console.log('parsing failed', error)
      });
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.url != prevState.url) {
      return {
        url: nextProps.url,
        dataUpToDate: null
      }
    }
    return null;
  }
  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.dataUpToDate === null) {
      this.fetchData();
    }
  }
  render() {
    let {data, options, width, height, legend} = this.state;
    return (
      <div className="ui segment">
        {this.state.dataUpToDate ? 
          <React.Fragment>
          {this.props.type == "horizontalBar" ? 
            <HorizontalBar
              redraw={true}
              legend={legend}
              data={data}
              width={width || 300}
              height={height || 300}
              options={options}
            />
            : 
            <Bar
              redraw={true}
              legend={legend}
              data={data}
              width={width || 300}
              height={height || 300}
              options={options}
            />
          }
          </React.Fragment>
          : 
          <Loader active inline content="Loading"/>
          }
      </div>
    );
  }
}