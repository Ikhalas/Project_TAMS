import React, { Component } from "react";
//import { db } from "../../../api/firebase";
import { Modal } from "reactstrap";

export default class AddSubDepartment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      note: "",
      nameCheck: true,
      inProgress: false
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    const { subDepModal } = this.props;
    return (
      <>
        {" "}
        <Modal
          className="add-modal regular-th"
          isOpen={subDepModal}
          toggle={this.props.toggleFn}
          unmountOnClose={true}
          backdrop="static"
          keyboard={false}
        ></Modal>
      </>
    );
  }
}
