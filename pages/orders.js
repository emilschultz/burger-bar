import React, { useState, useEffect } from "react";
import firebase from "../config/firebase";

export default function Orders() {
  const [orderList, setOrderList] = useState();

  useEffect(() => {
    firebase
      .database()
      .ref("orders")
      .on("value", (snapshot) => {
        let orderList = [];
        snapshot.forEach((snap) => {
          orderList.push(snap.val());
        });
        setOrderList(orderList);
      });
  }, []);
  console.log("ORDERLIST:", orderList);

  // const allOrders = orderList.forEach((array) => {
  //   array.forEach((data) => {
  //     console.log("DATA:", data);
  //     // return (
  //     //   <div>
  //     //     <p>{data.title}</p>
  //     //     <p>{data.price}</p>
  //     //     <button>Order ready</button>
  //     //   </div>
  //     // );
  //   });
  // });
  // console.log("ALLLL", allOrders);

  // const allOrders = orderList.map((order) => {
  //   return (
  //     <div>
  //       <p>{order.title}</p>
  //       <p>{order.price}</p>
  //       <button>Order ready</button>
  //     </div>
  //   );
  // });

  // for (var i = 0, l1 = orderList.length; i < l1; i++) {
  //   for (var j = 0, l2 = orderList[i].length; j < l2; j++) {
  //     console.log(orderList[i][j]);
  //   }
  // }

  // const currentOrders = orderList.map((neworder) => {
  //   return (
  //     <div>
  //       <h1>{neworder.order.title}</h1>

  //       <button>Order Ready</button>
  //     </div>
  //   );
  // });

  return (
    <>
      <p>Kitchen screen</p>
      <h1>Orders:</h1>
    </>
  );
}

// useEffect(() => {
//   firebase
//     .database()
//     .ref("orders")
//     .on("value", (snapshot) => {
//       const data = snapshot.val();
//       const allOrders = [];
//       for (let title in data) {
//         allOrders.push(data[title]);
//       }
//       setOrderList(orderList);
//     });
// }, []);
// console.log("ORDERLIST:", orderList);

// const orderList = [];

// useEffect(() => {
//   let ordersFromDatabase = firebase.database().ref("orders");
//   ordersFromDatabase.on("value", (snapshot) => {
//     snapshot.forEach((order) => {
//       const id = order.key;
//       const newOrder = order.val();
//       orderList.push(id, newOrder);
//     });
//   });
// }, []);
// console.log("ORDERLIST:", orderList);

// useEffect(() => {
//   let ordersFromDatabase = firebase.database().ref("orders");
//   ordersFromDatabase.on("value", (snapshot) => {
//     const newOrder = snapshot.val();
//     const orderList = [];
//     orderList.forEach(() => {
//       orderList.push(newOrder);
//     }, setOrderList(orderList));
//   });
// }, []);
// console.log("ORDERLIST:", orderList);

//----------------------------------------------------------
// useEffect(() => {
//   let ordersFromDatabase = firebase.database().ref("orders");
//   ordersFromDatabase.on("value", (snapshot) => {
//     snapshot.forEach((userSnapshot) => {
//       const data = userSnapshot.val();
//       orderList.push(data);
//     });
//   });
// }, []);
// console.log("ORDERLIST:", orderList);

// GØR OBJECTS TIL ARRAY
// const currentOrders = Object.entries(orderList).map((order) => {
//   return (
//     <div>
//       <p>{order}</p>
//       <button>Order ready</button>
//     </div>
//   );
// });
// console.log("CURRENTORDERS:", currentOrders);

// const allOrders = async () => {
//   try {
//     await firebase
//       .database()
//       .ref("orders")
//       .map((order) => {
//         return (
//           <div>
//             <p>{order[0].title}</p>
//             <button>Order ready</button>
//           </div>
//         );
//       });
//   } catch (error) {
//     setError(error.message);
//     console.log("Noget gik galt med bestillilngen");
//   }
// };
