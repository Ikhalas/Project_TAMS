import React, { Component } from "react";
import QRCode from "qrcode.react";
import { Link } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default class QRCodeModal extends Component {
  downloadQR = () => {
    const canvas = document.getElementById(this.props.url);
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = this.props.itemCode + ".png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  render() {
    return (
      <>
        <Modal
          backdrop="static"
          keyboard={false}
          size="lg"
          className="add-modal regular-th"
          isOpen={this.props.qrModal}
          toggle={this.props.toggleFn}
        >
          <ModalHeader style={{ color: "white" }}>
            QR-Code สำหรับครุภัณฑ์
          </ModalHeader>
          <ModalBody>
            <div style={{ textAlign: "center" }}>
              <a href={"https://tams-psu.firebaseapp.com" + this.props.url}>
                {"https://tams-psu.firebaseapp.com" + this.props.url}
              </a>
              <br />
              <QRCode
                id={this.props.url}
                value={"https://tams-psu.firebaseapp.com" + this.props.url}
                size={290}
                level={"H"}
                includeMargin={true}
              />
              <br />
              <Link style={{ fontSize: "25px" }} onClick={this.downloadQR}>
                {" "}
                Download QR-Code{" "}
              </Link>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              className="btn-round regular-th"
              size="sm"
              color="info"
              onClick={this.props.toggleFn}
              style={{
                fontSize: "25px",
                fontWeight: "normal",
              }}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;ตกลง&nbsp;&nbsp;&nbsp;&nbsp;
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
