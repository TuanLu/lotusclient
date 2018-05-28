import React from 'react';
import ReactTable from 'react-table'
import StoreForm from './StoreForm'

export default class TableData extends React.Component {
  constructor(props) {
    super(props);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.state = {
      data: this.props.data || [],
      currentStore: {
        store_id: '',
        name: '',
        address: '',
        phone: '',
        owner: '',
        district_id: ''
      },
      showForm: false
    };
  }
  handleRowClick(data) {
    this.setState({
      currentStore: data,
      showForm: true
    });
  }
  updateDataToServer(data) {
    fetch(ISD_BASE_URL + 'updatestore', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((response) => {
      return response.json()
    }).then((json) => {
      //Update table data 
      if(json.data) {
        let newData = this.state.data.map((store) => {
          if(store.store_id == json.data.store_id) {
            return {
              ...store,
              ...json.data,
            }
          }
          return store;
        });
        this.setState({
          data: newData,
          showForm: false,
          store_id: '',
          name: '',
          address: '',
          phone: '',
          owner: '',
          district_id: '',
        });
      } else {
        //Might not update anything
        this.setState({
          showForm: false
        })
      }
      
      
    }).catch((ex) => {
      console.log('parsing failed', ex)
    });
  }
  render() {
    const { data, currentStore} = this.state;
    return (
      <div>
        {this.state.showForm ?
          <StoreForm 
            data={currentStore}
            onSubmit={(data) => {
              this.updateDataToServer(data);
            }}
            onCancel={(e) => {
              this.setState({
                showForm: false,
                store_id: '',
                name: '',
                address: '',
                phone: '',
                owner: '',
                district_id: '',
              })
            }}
          />
          : null}
        <ReactTable
          getTdProps={(state, rowInfo, column, instance) => {
            return {
              onClick: (e, handleOriginal) => {
                // console.log("A Td Element was clicked!");
                // console.log("it produced this event:", e);
                // console.log("It was in this column:", column);
                //console.log("It was in this row:", rowInfo);
                //console.log("It was in this table instance:", instance);
                this.handleRowClick(rowInfo.original);
                // IMPORTANT! React-Table uses onClick internally to trigger
                // events like expanding SubComponents and pivots.
                // By default a custom 'onClick' handler will override this functionality.
                // If you want to fire the original onClick handler, call the
                // 'handleOriginal' function.
                if (handleOriginal) {
                  handleOriginal();
                }
              }
            };
          }}
          filterable
          data={data}
          columns={[
            {
              Header: "Thông tin nhà thuốc",
              columns: [
                {
                  Header: "Mã KH",
                  accessor: "store_id",
                  maxWidth: 100
                },
                {
                  Header: "Tên nhà thuốc",
                  accessor: 'name'
                },
                {
                  Header: "Địa chỉ",
                  accessor: 'address'
                },
                {
                  Header: "Điện thoại",
                  accessor: 'phone'
                },
                {
                  Header: "Chủ",
                  accessor: 'owner'
                },
                {
                  Header: "Mã Quận/Huyện (*)",
                  accessor: 'district_id',
                  filterable: false,
                  Cell: row => (
                    <div className={`${row.original.district_id == 0 ? 'ui warning message' : ''}`} style={{
                      padding: 2
                    }}>
                      {/* <pre>{JSON.stringify(row, null, 2)}</pre> */}
                      {row.original.district_id != 0 ? row.original.huyen : 'Chọn mã quận/huyện'}
                    </div>
                  )
                },
              ]
            },
          ]}
          data={data}
          filterable
          onFilteredChange={(data) => {
            console.log(data);
          }}
          defaultPageSize={20}
          className="-striped -highlight"
        />
      </div>
    );
  }
}