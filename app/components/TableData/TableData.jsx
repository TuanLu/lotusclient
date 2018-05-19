import React from 'react';
import ReactTable from 'react-table'
import {convertObjectsToArray, requestData} from 'ISD_API'

export default class TableData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pages: null,
      loading: true
    };
    this.fetchData = this.fetchData.bind(this);
  }
  fetchData(state, instance) {
    // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
    // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
    this.setState({ loading: true });
    // Request the data however you want.  Here, we'll use our mocked service we created earlier
    requestData(
      state.pageSize,
      state.page,
      state.sorted,
      state.filtered
    ).then(res => {
      // Now just get the rows of data to your React Table (and update anything else like total pages or loading)
      this.setState({
        data: res.rows,
        pages: res.pages,
        loading: false
      });
    });
  }
  render() {
    const { data, pages, loading } = this.state;
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
                  accessor: "L"
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
          manual // Forces table not to paginate or sort automatically, so we can handle it server-side
          data={data}
          pages={pages} // Display the total number of pages
          loading={loading} // Display the loading overlay when we need it
          onFetchData={this.fetchData} // Request new data when things change
          filterable
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </div>
    );
  }
}