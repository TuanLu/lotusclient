import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import {updateStateData} from 'actions'
import {connect} from 'react-redux'

const areaOptions = [
  {
    key: 'all',
    value: 'all',
    text: 'Tất cả vùng miền'
  },
  {
    key: 'b',
    value: 'b',
    text: 'Bắc'
  },
  {
    key: 't',
    value: 't',
    text: 'Trung'
  },
  {
    key: 'n',
    value: 'n',
    text: 'Nam'
  },
  {
    key: 'cod',
    value: 'cod',
    text: 'Cash On Delivery'
  },
]

class FilterByArea extends React.Component {  
  render() {
    return (
      <Dropdown 
        onChange={(event, data) => {
          if(this.props.mainState.filter.area == data.value) return false;
          this.props.dispatch(updateStateData({
            filter: {
              ...this.props.mainState.filter,
              area: data.value
            }
          }));
        }}
        placeholder='Chọn Vùng Miền' 
        selection 
        defaultValue={ISD_CONFIG.defaultArea}
        options={areaOptions} />
    );
  }
}
export default connect((state) => {
  return {
    mainState: state.main.present,
  }
})(FilterByArea);