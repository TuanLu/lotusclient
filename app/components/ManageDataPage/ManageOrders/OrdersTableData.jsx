import React from 'react';
import ReactTable from 'react-table'
import OrderForm from './OrderForm'

export default class TableData extends React.Component {
  constructor(props) {
    super(props);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.refreshOrderData = this.refreshOrderData.bind(this);
    this.state = {
      data: this.props.data || [],
      currentStore: {
        ...this.getResetDataField()
      },
      showForm: false
    };
  }
  getResetDataField() {
    return {
      store_id: '',
      name: '',
      address: '',
      phone: '',
      owner: '',
      district_id: ''
    }
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
        let newData;
        if(json.newRecord) {
          newData = this.state.data.concat(json.data);
        } else {
          newData = this.state.data.map((store) => {
            if(store.store_id == json.data.store_id) {
              return {
                ...store,
                ...json.data,
              }
            }
            return store;
          });
        }
        
        this.setState({
          data: newData,
          showForm: false,
          currentStore: {
            ...this.getResetDataField()
          }
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
  deleteStore(storeId) {
    fetch(ISD_BASE_URL + `deletestore/${storeId}`, {
      method: 'DELETE',
    })
    .then((response) => {
      return response.json()
    }).then((json) => {
      //Update table data 
      if(json.data) {
        let newData = this.state.data.filter((store) => store.store_id != json.data);
        this.setState({
          data: newData,
          showForm: false,
          currentStore: {
            ...this.getResetDataField()
          }
        });
      }
      
    }).catch((ex) => {
      console.log('parsing failed', ex)
    });
  }
  customFilter(filter, row) {
    if(row[filter.id] && row[filter.id] != '' && filter.value != '') {
      return row[filter.id].toLowerCase().includes(filter.value.toLowerCase());
    }
    return false;
  }
  customFilterDistrict(filter, row) {
    if(row[filter.id] && row[filter.id] != '' && filter.value != '') {
      return row[filter.id].toLowerCase().includes(filter.value.toLowerCase());
    }
    return false;
  }
  refreshOrderData() {
    fetch(ISD_BASE_URL + 'orders')
    .then((response) => {
      return response.json();
    }).then((json) => {
      if(json.status && json.status == "error") {
        console.warn(json.message);
        return false;
      }
      if(json.data && json.data.length) {
        this.setState({
          data: json.data
        });
      }
    }).catch((error) => {
      console.log('parsing failed', error)
    });
  }
  render() {
    const { data, currentStore} = this.state;
    return (
      <div>
        <div className="ui grid equal width">
          <div className="column left aligned">
            <h2 style={{textTransform: 'uppercase'}}>Danh sách hoá đơn</h2>
          </div>
          <div className="column right aligned">
            <button onClick={() => {
              this.setState({
                showForm: true,
                currentStore: {
                  ...this.getResetDataField()
                }
              });
            }} type="button" className="ui button primary">Nhập hoá đơn</button>
          </div>
        </div>
        {this.state.showForm ?
          <OrderForm 
            data={currentStore}
            onAddOrderComplete={() => {
              this.setState({
                showForm: false
              });
              //Refresh Table Data
              this.refreshOrderData();
            }}
            onCancel={(e) => {
              this.setState({
                showForm: false,
              })
            }}
            onDelete={(storeId) => {
              this.deleteStore(storeId);
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
              Header: "Mã hoá đơn",
              columns: [
                {
                  Header: "Mã nhà thuốc",
                  accessor: "store_id",
                  maxWidth: 100
                },
                {
                  Header: "Mã sản phẩm",
                  accessor: "product_id",
                  maxWidth: 100
                },
                {
                  Header: "Mã NPP",
                  accessor: "delivery_id",
                  maxWidth: 100
                },
              ]
            },
            {
              Header: "Thông tin đơn hàng",
              columns: [
                {
                  Header: "Ngày bán",
                  accessor: "date",
                },
                {
                  Header: "Số lượng",
                  accessor: "qty",
                },
                {
                  Header: "Đơn vị",
                  accessor: "unit",
                },
                {
                  Header: "Đơn giá",
                  accessor: "price",
                },
              ]
            },
          ]}
          data={data}
          filterable
          defaultPageSize={20}
          className="-striped -highlight"
        />
      </div>
    );
  }
}