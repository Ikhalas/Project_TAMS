import React, { Component } from "react";
import Department from "./departments/Departments";
import Types from "./types/Types";
import ItemCode from "./itemCode/ItemCode";
import NotificationAlert from "react-notification-alert";

import "../../assets/css/Settings.css";

var optionsDep = {
  place: "tc",
  message: (
    <div>
      <div style={{ fontSize: "22px" }}>
        เพิ่มรายการ <b style={{ color: "white" }}>หน่วยงาน</b> สำเร็จ
      </div>
    </div>
  ),
  type: "success",
  icon: "nc-icon nc-cloud-upload-94",
  autoDismiss: 3
};

var optionsType = {
  place: "tc",
  message: (
    <div>
      <div style={{ fontSize: "22px" }}>
        เพิ่มรายการ <b style={{ color: "white" }}>ประเภทครุภัณฑ์</b> สำเร็จ
      </div>
    </div>
  ),
  type: "success",
  icon: "nc-icon nc-cloud-upload-94",
  autoDismiss: 3
};

var optionsCode = {
  place: "tc",
  message: (
    <div>
      <div style={{ fontSize: "22px" }}>
        เพิ่มรายการ <b style={{ color: "white" }}>ชื่อและรหัสครุภัณฑ์</b> สำเร็จ
      </div>
    </div>
  ),
  type: "success",
  icon: "nc-icon nc-cloud-upload-94",
  autoDismiss: 3
};

export default class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: true
    };
  }

  toggleAlert = res => {
    if (res === "department") {
      this.refs.notify.notificationAlert(optionsDep);
      this.setState({ refresh: !this.state.refresh });
    } else if (res === "types") {
      this.refs.notify.notificationAlert(optionsType);
      this.setState({ refresh: !this.state.refresh });
    } else if (res === "itemsCode") {
      this.refs.notify.notificationAlert(optionsCode);
      this.setState({ refresh: !this.state.refresh });
    } else {
      //console.log("shit");
    }
  };

  render() {
    return (
      <>
        <div className="content regular-th">
          <NotificationAlert ref="notify" />
          <Department
            refresher={this.state.refresh}
            toggleAlert={this.toggleAlert}
          />
          <br />
          <br />
          <Types
            refresher={this.state.refresh}
            toggleAlert={this.toggleAlert}
          />
          <br />
          <br />
          <ItemCode
            refresher={this.state.refresh}
            toggleAlert={this.toggleAlert}
          />
        </div>
      </>
    );
  }
}
