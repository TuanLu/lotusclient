import React from 'react'
import ReactTable from 'react-table'
import { Loader, Input, Segment, Button, Dropdown, Search} from 'semantic-ui-react'
import SearchStore from './SearchStore'
import UploadFile from './../../UploadFile'

class OrderForm extends React.Component {
  constructor(props) {
    super(props);
    this.renderEditableNumber = this.renderEditableNumber.bind(this);
    this.renderEditableDate = this.renderEditableDate.bind(this);
    this.updateRowData = this.updateRowData.bind(this);
    this.state = {
      preOrderData: [],
      stores: [],
      products: [],
      deliveries: [],
      activeRow: 0
    };
  }
  getStoreOptions() { 
    if(this.state.stores.length) {
      return this.state.stores.map((store) => {
        return {
          key: store.store_id,
          value: store.store_id,
          text: `${store.store_id} - ${store.name}`
        }
      });
    } else {
      return [{
        key: 'empty',
        value: '',
        text: 'Chưa có dữ liệu'
      }]
    }
  }
  getProductsOptions() { 
    if(this.state.products.length) {
      return this.state.products.map((product) => {
        return {
          key: product.product_id,
          value: product.product_id,
          text: `${product.product_id} - ${product.name}`
        }
      });
    } else {
      return [{
        key: 'empty',
        value: '',
        text: 'Chưa có dữ liệu'
      }]
    }
  }
  getDeliveryOptions() { 
    if(this.state.deliveries.length) {
      return this.state.deliveries.map((delivery) => {
        return {
          key: delivery.delivery_id,
          value: delivery.delivery_id,
          text: `${delivery.name}`
        }
      });
    } else {
      return [{
        key: 'empty',
        value: '',
        text: 'Chưa có dữ liệu'
      }]
    }
  }
  getUnitOptions() {
    return [
      {key: 'Hộp', value: 'Hộp', text: 'Hộp'},
      {key: 'Vỉ', value: 'Vỉ', text: 'Vỉ'},
      {key: 'Lọ', value: 'Lọ', text: 'Lọ'},
    ];
  }
  renderEditableNumber(row) {
    return (
      <Input
        type="number"
        min={0}
        fluid
        defaultValue={row.value}
        onBlur={e => {
          this.updateRowData(row, e.target.value);
        }}/>
    );
  }
  renderEditableDate(row) {
    return (
      <Input
        type="text"
        required
        fluid
        defaultValue={row.value}
        onBlur={e => {
          this.updateRowData(row, e.target.value);
        }}/>
    );
  }
  updateRowData(row, value) {
    const preOrderData = [...this.state.preOrderData];
    preOrderData[row.index][row.column.id] = value;
    this.setState({ preOrderData });
  }
  convertExcelDataToTableState(data) {
    console.log(data);
    this.setState({
      preOrderData: data
    })
  }
  componentDidMount() {
    fetch(ISD_BASE_URL + 'importOrderData')
      .then((response) => {
        return response.json();
      }).then((json) => {
        if(json.status && json.status == "error") {
          console.warn(json.message);
          return false;
        }
        if(json.data) {
          if(json.data.stores.length && json.data.products.length) {
            this.setState({
              stores: json.data.stores,
              products: json.data.products,
              deliveries: json.data.deliveries
            });
            
          }
        }
      }).catch((error) => {
        console.log('parsing failed', error)
      });

      //test data
      fetch(ISD_BASE_URL)
      .then((response) => {
        return response.json();
      }).then((json) => {
        if(json.status && json.status == "error") {
          console.warn(json.message);
          return false;
        }
        if(json) {
          console.log(json);
          this.setState({
            preOrderData: json
          })
        }
      }).catch((error) => {
        console.log('parsing failed', error)
      });
  }

  render() {
    let {preOrderData} = this.state;
    return (
      <div className="order-add-form" style={{
        position: 'fixed',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '98%',
        background: '#fff',
        zIndex: 1000
      }}>
        {/* <pre>{JSON.stringify(this.state.preOrderData, null,2)}</pre> */}
        <div className="ui grid equal width">
          <div className="column left aligned">
            <h2 style={{textTransform: 'uppercase'}}>Form nhập đơn hàng</h2>
          </div>
          <div className="column right aligned">
            <h3>Import từ file excel</h3>
            <UploadFile 
              url={ISD_BASE_URL + 'upload'}
              done={(response) => {
                let resJson = JSON.parse(response);
                if(resJson.status == "success" && resJson.data) {
                  this.convertExcelDataToTableState(resJson.data);
                }
              }}/>
          </div>
          <div className="column right aligned">
            <button
              style={{marginTop: 10}} 
              onClick={() => {
              this.setState({
                showForm: true,
                currentStore: {
                  ...this.getResetDataField()
                }
              });
            }} type="button" className="ui button primary">Lưu hoá đơn</button>
          </div>
        </div>
        <ReactTable
          columns={[
            {
              Header: "Mã hoá đơn",
              columns: [
                {
                  Header: "Mã nhà thuốc",
                  accessor: "store_id",
                  minWidth: 200,
                  Cell: (row) => {
                    //console.log(row.value);
                    return (
                      <React.Fragment>
                        <span>{row.value != '' ? row.value : ''}</span>
                        <SearchStore 
                          onResultSelect={(store) => {
                            this.updateRowData(row, store.store_id);
                          }}  
                          value={row.value}
                          source={this.state.stores}/>
                      </React.Fragment>  
                    );
                  }
                },
                {
                  Header: "Mã sản phẩm",
                  accessor: "product_id",
                  minWidth: 170,
                  Cell: (row) => {
                    return (
                      <Dropdown
                        fluid
                        selection
                        style={{zIndex: 100}}
                        search
                        options={this.getProductsOptions()}
                        value={row.value}
                        onClick={(e) => {
                          this.setState({
                            activeRow: row.row.store_id
                          });
                        }}
                        onChange={(e, data) => {
                          this.updateRowData(row, data.value);
                        }}
                      />
                      // <SearchStore fluid source={this.state.products}/>
                    );
                  }
                },
                {
                  Header: "Mã NPP",
                  accessor: "delivery_id",
                  minWidth: 100,
                  Cell: (row) => {
                    return (
                      <Dropdown
                        selection
                        fluid
                        style={{zIndex: 0}}
                        search
                        options={this.getDeliveryOptions()}
                        onChange={(e, data) => {
                          this.updateRowData(row, data.value);
                        }}
                        onClick={(e) => {
                          this.setState({
                            activeRow: row.row.store_id
                          });
                        }}
                        value={row.value}
                      />
                    );
                  }
                },
              ]
            },
            {
              Header: "Thông tin đơn hàng",
              columns: [
                {
                  Header: "Ngày bán",
                  accessor: "date",
                  minWidth: 150,
                  Cell: this.renderEditableDate
                },
                {
                  Header: "Số lượng",
                  accessor: "qty",
                  Cell: this.renderEditableNumber
                },
                {
                  Header: "Đơn giá",
                  accessor: "price",
                  Cell: this.renderEditableNumber
                },
                {
                  Header: "Đơn vị",
                  accessor: "unit",
                  Cell: (row) => {
                    return (
                      <Dropdown
                        selection
                        fluid
                        compact
                        style={{zIndex: 0}}
                        options={this.getUnitOptions()}
                        value={row.value}
                        onChange={(e, data) => {
                          this.updateRowData(row, data.value);
                        }}
                        onClick={(e) => {
                          this.setState({
                            activeRow: row.row.store_id
                          });
                        }}
                      />
                    );
                  }
                },
              ]
            },
          ]}
          filterable
          data={preOrderData}
          defaultPageSize={20}
          className="-striped -highlight"
          style={{
            height: "500px" // This will force the table body to overflow and scroll, since there is not enough room
          }}
        />
      </div>
    );
  }
}
export default OrderForm;