import React from 'react';
import ReactTable from 'react-table'
import {requestData} from 'ISD_API'

export default class TableData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.orderData || [],
    };
  }
  render() {
    const { data} = this.state;
    return (
      <div>
        <ReactTable
          filterable
          data={data}
          columns={[
            {
              Header: "Nhà thuốc",
              columns: [
                {
                  Header: "Mã KH",
                  accessor: "B",
                  maxWidth: 200
                },
                {
                  Header: "Tên nhà thuốc",
                  accessor: 'F'
                }
              ]
            },
            {
              Header: "Đơn Hàng",
              columns: [
                {
                  Header: "Ngày bán",
                  accessor: "A"
                },
                {
                  Header: "Mã Sản Phẩm",
                  accessor: "C"
                },
                {
                  Header: "Số lượng",
                  accessor: "D"
                },
                {
                  Header: "Đơn giá",
                  accessor: "J"
                },
              ]
            },
            {
              Header: "Doanh Thu (triệu)",
              columns: [
                {
                  Header: "Mục tiêu",
                  accessor: "K"
                },
                {
                  Header: "Thực tế",
                  accessor: "L",
                },
              ]
            },
            {
              Header: "Địa chỉ",
              columns: [
                {
                  Header: "Quận/TP/Huyện",
                  accessor: "M"
                },
                {
                  Header: "Tỉnh",
                  accessor: "N"
                },
                {
                  Header: "Miền",
                  accessor: "O"
                },
              ]
            },
            {
              Header: "Thời Gian",
              columns: [
                {
                  Header: "Năm",
                  accessor: "Q"
                },
                {
                  Header: "Quý",
                  accessor: "R"
                },
                {
                  Header: "Tháng",
                  accessor: "S"
                },
                {
                  Header: "Tuần trong năm",
                  accessor: "T"
                },
                {
                  Header: "Tuần trong tháng",
                  accessor: "U"
                },
                {
                  Header: "Ngày trong tháng",
                  accessor: "V"
                },
                {
                  Header: "Thứ trong tuần",
                  accessor: "W"
                },
              ]
            },
          ]}
          data={data}
          filterable
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </div>
    );
  }
}