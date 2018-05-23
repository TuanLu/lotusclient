import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import {updateStateData} from 'actions'

const range = (start, end) => (
  Array.from(Array(end - start + 1).keys()).map(i => i + start)
);

let dynamicsYear = range(2016, (new Date()).getFullYear());

let yearOptions = dynamicsYear.map((year) => {
  return {
    key: year,
    value: year,
    text: 'Năm ' + year
  }
});

export default class Filter extends React.Component {
  constructor(props) {
    super(props);
    let dynamicsYear = range(2016, (new Date()).getFullYear());
    
    this.state = {
      yearOptions : yearOptions,
      productOptions: [
        {
          key: 'all',
          value: 'all',
          text: 'Tất cả sản phẩm'
        },
        {
          key: 'hnc',
          value: 'hnc',
          text: 'Hoàn Nguyên Cốt'
        },
        {
          key: 'tdk',
          value: 'tdk',
          text: 'Tuệ Đức Kids'
        },
      ]
    }
  }
  
  render() {
    
    return (
      <div className="ui segment ui grid equal width">
        <div className="column">
          <Dropdown 
            onChange={(event, data) => {
              this.props.dispatch(updateStateData({
                filter: {
                  ...this.props.mainState.filter,
                  year: data.value
                }
              }));
            }}
            placeholder='Chọn Năm' 
            selection 
            defaultValue={2017}//(new Date).getFullYear()}
            options={this.state.yearOptions} />
          {" | "}
          <Dropdown 
            onChange={(event, data) => {
              this.props.dispatch(updateStateData({
                filter: {
                  ...this.props.mainState.filter,
                  product: data.value
                }
              }));
            }}
            placeholder='Chọn Sản Phẩm' 
            search 
            selection 
            options={this.state.productOptions} />
        </div>
      </div>
    );
  }
}