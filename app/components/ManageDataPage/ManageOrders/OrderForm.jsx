import React from 'react'
import ReactTable from 'react-table'
import { Loader, Input, Segment, Button, Dropdown, Search} from 'semantic-ui-react'
import SearchStore from './SearchStore'

class OrderForm extends React.Component {
  constructor(props) {
    super(props);
    this.renderEditableNumber = this.renderEditableNumber.bind(this);
    this.renderEditableDate = this.renderEditableDate.bind(this);
    this.updateRowData = this.updateRowData.bind(this);
    this.state = {
      preOrderData: this.prepareData(),
      stores: [],
      products: [],
      deliveries: [],
      activeRow: 0
    };
  }
  prepareData() {
    let preOrderData = [];
    for(let i = 0; i < 2; i++) {
      preOrderData.push({
        store_id: i,
        product_id: '',
        delivery_id: '',
        price: 0,
        qty: 0,
        date: '',
        unit: ''
      });
    }
    return preOrderData;
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
        onBlur={e => {
          this.updateRowData(row, e.target.value);
        }}/>
    );
  }
  renderEditableDate(row) {
    return (
      <Input
        type="date"
        required
        fluid
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
  }

  render() {
    let {preOrderData} = this.state;
    return (
      <div className="order-add-form" style={{
        position: 'fixed',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '99%',
        background: '#fff',
        zIndex: 1000
      }}>
        {/* <pre>{JSON.stringify(this.state.preOrderData, null,2)}</pre> */}
        <ReactTable
          getTrProps={(state, rowInfo, column) => {
            return {
              onClick: (e, handleOriginal) => {
                this.setState({
                  activeRow: rowInfo.row.store_id
                });
                if (handleOriginal) {
                  handleOriginal();
                }
              },
              style: {
                height: rowInfo && rowInfo.row.store_id == this.state.activeRow ? 'auto' : 'auto'
              }
            };
          }}
          columns={[
            {
              Header: "Mã hoá đơn",
              columns: [
                {
                  Header: "Mã nhà thuốc",
                  accessor: "store_id",
                  minWidth: 200,
                  Cell: (row) => {
                    return (
                      // <Dropdown
                      //   selection
                      //   fluid
                      //   style={{zIndex: 2000}}
                      //   search
                      //   options={this.getStoreOptions()}
                      // />
                      <SearchStore 
                        onResultSelect={(store) => {
                          this.updateRowData(row, store.store_id);
                        }}  
                        source={this.state.stores}/>
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