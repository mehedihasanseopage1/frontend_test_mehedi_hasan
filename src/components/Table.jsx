import React, { useEffect, useState } from "react";
import { Button, Flex, Table } from "antd";
import ReactDragListView from "react-drag-listview";
import axios from 'axios';


export default function Demo(props) {
    const [checkedColumns, setCheckedColumns] = useState([
        {
          title: "ID",
          dataIndex: "id",
          checked: true,
        },
        {
          title: "Name",
          dataIndex: "client_name",
          sorter: (a, b) => a.project_name.length - b.project_name.length,
          checked: true,
        },
        {
          title: "Project Link",
          dataIndex: "project_link",
          key: 'project_link',
          checked: true,
          sorter: (a, b) => a.project_link.length - b.project_link.length
        },
        {
          title: "Project ID",
          dataIndex: "project_id",
          checked: true,
          sorter: (a, b) => a.project_id - b.project_id
        },
        {
          title: "Project Budget",
          dataIndex: "address",
          checked: true,
          sorter: (a, b) => a.name.length - b.name.length
        },
        {
            title: "Bid Value",
            dataIndex: "bid_value",
            checked: true,
            sorter: (a, b) => a.bid_value - b.bid_value
        },
        {
            title: "Created",
            dataIndex: "address",
            checked: true,
            sorter: (a, b) => a.name.length - b.name.length
        },
        {
            title: "Created By",
            dataIndex: "bid_value",
            checked: true,
            sorter: (a, b) => a.bid_value - b.bid_value
        },
        {
            title: "Bidding Delay Time",
            dataIndex: "bidding_minutes",
            checked: true,
            sorter: (a, b) => a.bidding_minutes - b.bidding_minutes
        },
        {
            title: "Status",
            dataIndex: "deal_status",
            checked: true,
            sorter: (a, b) => a.deal_status - b.deal_status,
            render: (_, records) => {
                return records.deal_status ? <span style={{background: "green", whiteSpace: 'nowrap', padding: 4, borderRadius: 5,color: '#fff'}}>Converted to deal</span> :  <span style={{background: 'red', whiteSpace: 'nowrap', padding: 4, borderRadius: 5,color: '#fff'}}>Not converted to deal</span>
            }
        },
        {
            title: "Deal Status",
            dataIndex: "deal_status",
            checked: true,
            sorter: (a, b) => a.deal_status - b.deal_status,
            render: (_, records) => {
                return records.deal_status ? <span style={{background: "brown", whiteSpace: 'nowrap', padding: 4, borderRadius: 5,color: '#fff'}}>No activity yet</span> :  <span >Not Applicable</span>
            }
        },
      ]);


  const [columns, setColumns] = useState([]);

  useEffect(() => {
    setColumns(checkedColumns);
  }, [])

  const [data, setData] = useState([]);

useEffect(() => {
    const getData = async () => {
        const res = await axios.get(`https://erp.seopage1.net/api/leads`);
        setData(res.data.data)
    }
    getData();
}, [])

  const dragProps = {
    onDragEnd(fromIndex, toIndex) {
      console.log(`dragged from ${fromIndex} to ${toIndex}`);
      const newColumns = [...columns];
      const item = newColumns.splice(fromIndex, 1)[0];
      newColumns.splice(toIndex, 0, item);
      setColumns(newColumns);
    },
    nodeSelector: "th"
  };


  const handleCheckboxChange = (index) => {
    const updatedColumns = [...checkedColumns];
    updatedColumns[index].checked = !updatedColumns[index].checked;
    setCheckedColumns(updatedColumns);
  
    const filteredCols = updatedColumns.filter(col => col.checked);
    console.log(filteredCols.length);
    setColumns(filteredCols);
  };
  

  return (
    <div style={{ margin: 20 }}>
      <Flex style={{
        marginBottom: 20,
      }} justify="space-between" align="center">
        <h2>Projects</h2>
        <div className="column-list">
            <Button type="primary">Column List</Button>

            <div className="columns">
                {checkedColumns.map((column, index) => (
                    <div key={index}>
                    <input
                        type="checkbox"
                        checked={column.checked}
                        onChange={() => handleCheckboxChange(index)}
                    />
                    <label>{column.title}</label>
                    </div>
                ))}
            </div>
        </div>
      </Flex>
      <ReactDragListView.DragColumn {...dragProps}>
        <Table
          columns={columns}
          scroll={{x: 1500}}
          dataSource={data}
          bordered
        />
      </ReactDragListView.DragColumn>
    </div>
  );
}