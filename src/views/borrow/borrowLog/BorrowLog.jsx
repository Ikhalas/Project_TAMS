import React, { Component } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import LogModal from "./LogModal";
import { db } from "../../../api/firebase";
import { Card, CardHeader, CardTitle, CardBody, Table } from "reactstrap";

export default class BorrowLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logList: "", //store data from firebase
      readyToRender: false, //loading skeleton
      logModal: false, //toggle log modal
      logDetail: "", //detail to show in modal
      logHeader: "", //detail to show in modal
      logTimestamp: "", //detail to show in modal
    };

    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getLogList();
  }

  componentWillUnmount() {
    //cancel subscriptions and asynchronous tasks
    this._isMounted = false;
  }

  getLogList() {
    db.collection("borrowLog")
      .orderBy("timestamp") //เรียงจากน้อยไปมาก
      .get()
      .then((snapshot) => {
        let logList = [];
        snapshot.forEach((doc) => {
          logList.push(doc);
        });
        this._isMounted && this.setState({ logList, readyToRender: true });
        //console.log(this.state.logList);
      })
      .catch((error) => console.log(error));
  }

  convertDate(date) {
    let month = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ];
    //console.log(month[new Date(date.seconds * 1000).getMonth() + 1]);
    return (
      <>
        {" "}
        {new Date(date.seconds * 1000).getDate() +
          " " +
          month[new Date(date.seconds * 1000).getMonth()] +
          " " +
          (new Date(date.seconds * 1000).getFullYear() + 543)}
      </>
    );
  }

  convertTime(time) {
    //console.log(new Date(time.seconds * 1000).getSeconds().toString().length);
    if (new Date(time.seconds * 1000).getSeconds().toString().length === 1) {
      return (
        <>
          {new Date(time.seconds * 1000).getHours() +
            ":" +
            new Date(time.seconds * 1000).getMinutes() +
            ":" +
            "0" +
            new Date(time.seconds * 1000).getSeconds()}
          &nbsp;น.
        </>
      );
    } else {
      return (
        <>
          {new Date(time.seconds * 1000).getHours() +
            ":" +
            new Date(time.seconds * 1000).getMinutes() +
            ":" +
            new Date(time.seconds * 1000).getSeconds()}
          &nbsp;น.
        </>
      );
    }
  }

  genLogRow() {
    if (this.state.logList) {
      return this.state.logList.map((item) => (
        <tr
          key={item.id}
          style={{ cursor: "pointer" }}
          onClick={() =>
            this.setState({
              logModal: !this.state.retModal,
              logDetail: item.data().borDetail,
              logHeader: item.data().header,
              logTimestamp: item.data().timestamp,
              returnDate: item.data().returnDate,
              returner: item.data().returner,
              overdue: item.data().overdue,
            })
          }
        >
          <td style={{ fontSize: 20 }}>
            &nbsp;
            {this.convertDate(item.data().timestamp)}, &nbsp;
            {this.convertTime(item.data().timestamp)}
          </td>
          <td style={{ fontSize: 20 }}>{item.data().borDetail.itemCode}</td>
          <td style={{ fontSize: 20 }}>{item.data().borDetail.itemName}</td>
          <td className="text-right" style={{ paddingRight: "45px" }}>
            <b
              className={
                item.data().header === "ยืม" ? "text-warning" : "text-success"
              }
              style={{ fontSize: 25 }}
            >
              {item.data().header}
            </b>
          </td>
        </tr>
      ));
    }
  }

  toggleLogModal = () => {
    this.setState({ logModal: !this.state.logModal });
  };

  render() {
    const { readyToRender } = this.state;
    return readyToRender ? (
      <>
        <div className="content regular-th">
          <Card>
            <button
              onClick={this.props.togglePageFn}
              className="pl-2 pt-2 button-like-a text-left"
            >
              <i
                style={{ fontSize: "15px", color: "black" }}
                className="nc-icon nc-minimal-left"
              />
              <span
                className="regular-th"
                style={{
                  fontSize: "25px",
                  color: "gray",
                  fontWeight: "normal",
                }}
              >
                {" "}
                ย้อนกลับ
              </span>
            </button>

            <CardHeader>
              <CardTitle tag="h5" style={{ color: "#66615b" }}>
                ประวัติการยืม-คืนครุภัณฑ์
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Table responsive hover size="sm">
                <thead className="text-primary">
                  <tr>
                    <th
                      className="table-header"
                      style={{ fontWeight: "normal" }}
                    >
                      <b style={{ fontSize: "23px", paddingLeft: "40px" }}>
                        วัน-เวลา
                      </b>
                    </th>
                    <th
                      className="table-header"
                      style={{ fontWeight: "normal" }}
                    >
                      <b style={{ fontSize: "23px", textAlign: "center" }}>
                        รหัสครุภัณฑ์
                      </b>
                    </th>
                    <th
                      className="table-header"
                      style={{ fontWeight: "normal" }}
                    >
                      <b style={{ fontSize: "23px", textAlign: "center" }}>
                        ชื่อพัสดุ
                      </b>
                    </th>
                    <th
                      className="table-header text-right pr-3"
                      style={{ fontWeight: "normal" }}
                    >
                      <b style={{ fontSize: "23px" }}>การกระทำ</b>
                    </th>
                  </tr>
                </thead>
                <tbody>{this.genLogRow()}</tbody>
              </Table>
            </CardBody>
          </Card>
        </div>

        {this.state.logModal && (
          <LogModal
            logModal={this.state.logModal}
            toggleFn={this.toggleLogModal}
            logDetail={this.state.logDetail}
            header={this.state.logHeader}
            logTimestamp={this.state.logTimestamp}
            returnDate={this.state.returnDate}
            returner={this.state.returner}
            overdue={this.state.overdue}
          />
        )}
      </>
    ) : (
      <div className="content">
        <SkeletonTheme color="#fafafa">
          <p>
            <Skeleton height={600} />
          </p>
        </SkeletonTheme>
      </div>
    );
  }
}
