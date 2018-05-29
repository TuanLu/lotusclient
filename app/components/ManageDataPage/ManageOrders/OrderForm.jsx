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
      productIds: [],
      storeIds: [],
      deliveryIds: [],
      units: this.getUnitOptions(),
      unitIds: ['Hộp', 'Vỉ', 'Lọ']
    };
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
        error={row.value == ''? true : false}
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
        error={row.value == ''? true : false}
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
  validDataBeforeSave() {
    let {preOrderData} = this.state;
    //Check store_id,
    let isOk = true;
    if(preOrderData && preOrderData.length) {
      console.log(preOrderData);
      for(let i = 0; i < preOrderData.length; i++) {
        //Valid store ID
        if(this.state.storeIds.indexOf(preOrderData[i].store_id) == -1) {
          alert(`Mã hiệu thuốc [${preOrderData[i].store_id}] chưa tồn tại trong hệ thống! Bạn hãy thêm hiệu thuốc mới hoặc chọn lại mã đúng!`);
          isOk = false;
          break;
        }
        //Valid product ID
        if(this.state.productIds.indexOf(preOrderData[i].product_id) == -1) {
          alert(`Mã sản phẩm [${preOrderData[i].product_id}] chưa tồn tại trong hệ thống! Bạn hãy thêm sản phẩm mới hoặc chọn lại mã sản phẩm đúng!`);
          isOk = false;
          break;
        }
        //Valid Time ID
        if(preOrderData[i].date == '' || !preOrderData[i].date) {
          alert(`Ngày mua không được để trống. Xin hãy nhập theo format ngay/thang/nam: VD: 24/05/2018`);
          isOk = false;
          break;
        }
      }
    }
    //Check new product

    //Check date

    return isOk;
  }
  updateDataToServer() {
    if(!this.validDataBeforeSave()) return false;
    let data = this.state.preOrderData;
    fetch(ISD_BASE_URL + 'addorders', {
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
        this.setState({
          showForm: false,
          preOrderData: []
        });
        alert(`Đã thêm ${json.data} hoá đơn vào cơ sở dữ liệu!`);
      } else {
        //Might not update anything
        alert('Dữ liệu chưa được lưu vào hệ thống. Xin kiểm tra lại');
        // this.setState({
        //   showForm: true
        // })
      }
      
      
    }).catch((ex) => {
      console.log('parsing failed', ex)
    });
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
            //Format data before update to state
            let productIds = [];
            let productList = json.data.products.map((product) => {
              productIds.push(product.product_id);
              return {
                key: product.product_id,
                value: product.product_id,
                text: product.name
              }
            });
            //Delivery 
            let deliveryIds = [];
            let deliverytList = json.data.deliveries.map((delivery) => {
              deliveryIds.push(delivery.delivery_id);
              return {
                key: delivery.delivery_id,
                value: delivery.delivery_id,
                text: delivery.name
              }
            });
            //Stores 
            let storeIds = [];
            let storeList = json.data.stores.map((store) => {
              storeIds.push(store.store_id);
              return store;
            });
            this.setState({
              stores: storeList,
              products: productList,
              deliveries: deliverytList,
              productIds,
              storeIds,
              deliveryIds
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
            <div className="upload-btn primary" style={{position: 'relative'}}>
              <button style={{
                position: 'absolute',
                top: 0,
                left: 0,
                pointerEvents: 'none',
                marginTop: 10,
                zIndex: 1
                
              }} type="button" className="fake-btn button ui primary">Import từ file excel</button>
              <UploadFile 
                url={ISD_BASE_URL + 'upload'}
                done={(response) => {
                  let resJson = JSON.parse(response);
                  if(resJson.status == "success" && resJson.data) {
                    this.setState({
                      preOrderData: resJson.data
                    })
                  }
                }}/>
            </div>
          </div>
          <div className="column right aligned">
            <button
              style={{marginTop: 10}} 
              onClick={() => {
                this.updateDataToServer();
              }} 
              type="button" className="ui button teal">Lưu hoá đơn</button>
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
                        <div 
                          className={this.state.storeIds.indexOf(row.value) == -1 ? 'store-item error' : ''}
                        >
                          {this.state.storeIds.indexOf(row.value) == -1 ? <div>{row.value}</div> : ''}
                          <SearchStore 
                            onResultSelect={(store) => {
                              this.updateRowData(row, store.store_id);
                            }}  
                            storeId={this.state.storeIds.indexOf(row.value) == -1 ? '' : row.value}
                            source={this.state.stores}/>
                        </div>
                    );
                  }
                },
                {
                  Header: "Mã sản phẩm",
                  accessor: "product_id",
                  minWidth: 170,
                  Cell: (row) => {
                    
                    return (
                      <React.Fragment>
                        {this.state.productIds.indexOf(row.value) == -1 ? `SP mới: ${row.value}` : ''}
                        <Dropdown
                          error={this.state.productIds.indexOf(row.value) == -1? true : false}
                          fluid
                          selection
                          style={{zIndex: 100}}
                          search
                          options={this.state.products}
                          value={row.value}
                          onChange={(e, data) => {
                            this.updateRowData(row, data.value);
                          }}
                        />
                      </React.Fragment>
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
                        error={this.state.deliveryIds.indexOf(row.value) == -1? true : false}
                        selection
                        fluid
                        style={{zIndex: 0}}
                        search
                        options={this.state.deliveries}
                        onChange={(e, data) => {
                          this.updateRowData(row, data.value);
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
                        error={this.state.unitIds.indexOf(row.value) == -1? true : false}
                        selection
                        fluid
                        compact
                        style={{zIndex: 0}}
                        options={this.state.units}
                        value={row.value}
                        onChange={(e, data) => {
                          this.updateRowData(row, data.value);
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