import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import {updateStateData} from 'actions'
import FilterByYear from './Filter/FilterByYear'
import FilterByProduct from './Filter/FilterByProduct'

export default class Filter extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    
    return (
      <div className="ui segment ui grid equal width">
        <div className="column">
          <FilterByYear/>
          {" | "}
          <FilterByProduct/>
        </div>
      </div>
    );
  }
}