import React from "react";
import ConcludeCard from "./conclude/ConcludeCard";
import BorrowTable from "./borrow/BorrowTable";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { db } from "../../api/firebase";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      itemsMove: [],
      itemsImove: [],
      itemBorrow: [],

      ready1: false,
      ready2: false,
      ready3: false,
      ready4: false,
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getUser();
    this._isMounted && this.getitemMovable();
    this._isMounted && this.getitemImovable();

    this._isMounted && this.getBorrow();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getUser() {
    db.collection("staffs")
      .get()
      .then((snapshot) => {
        let users = [];
        snapshot.forEach((doc) => {
          users.push(doc.data());
        });
        this._isMounted && this.setState({ users, ready1: true });
      })
      .catch((error) => console.log(error));
  }

  getitemMovable() {
    db.collection("itemMovable")
      .orderBy("itemCode")
      .get()
      .then((snapshot) => {
        let itemsMove = [];
        snapshot.forEach((doc) => {
          itemsMove.push(doc);
        });
        this._isMounted && this.setState({ itemsMove, ready2: true });
      })
      .catch((error) => console.log(error));
  }

  getitemImovable() {
    db.collection("itemImovable")
      .orderBy("itemCode")
      .get()
      .then((snapshot) => {
        let itemsImove = [];
        snapshot.forEach((doc) => {
          itemsImove.push(doc);
        });
        this._isMounted && this.setState({ itemsImove, ready3: true });
      })
      .catch((error) => console.log(error));
  }

  getBorrow() {
    db.collection("borrowList")
      .orderBy("mustReturnDate") //เรียงจากน้อยไปมาก
      .limit(5)
      .get()
      .then((snapshot) => {
        let itemBorrow = [];
        snapshot.forEach((doc) => {
          itemBorrow.push(doc);
        });
        this._isMounted && this.setState({ itemBorrow, ready4: true });
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { ready1, ready2, ready3, ready4 } = this.state;
    const { users, itemsMove, itemsImove } = this.state;
    const { itemBorrow } = this.state;
    return ready1 && ready2 && ready3 && ready4 ? (
      <>
        <div className="content regular-th">
          <ConcludeCard
            MoveSum={itemsMove.length}
            ImoveSum={itemsImove.length}
            usersSum={users.length}
          />
          <BorrowTable itemBorrow={itemBorrow} />
          
        </div>
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
