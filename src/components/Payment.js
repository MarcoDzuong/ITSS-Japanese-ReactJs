import { useState } from "react";
import PaymentItem from "./PaymentItem";
import Bill from "./Bill";
import Filter from "./Filter";
import Header from "./Header";
import useLocalStorage from "../hook/localStorage";
import React from "react";

const productList = [
  { id: 1, name: "牛乳", price: 8000 },
  { id: 2, name: "アイススクリーム", price: 17000 },
  { id: 3, name: "コーヒー", price: 12000 },
  { id: 4, name: "パン", price: 15000 },
  { id: 5, name: "ケーキ", price: 25000 },
  { id: 6, name: "おにぎり", price: 20000 },
  { id: 7, name: "チョコレート", price: 25000 },
];

function Payment() {
  const [stockList, setStockList] = useLocalStorage("stockList", []);

  const statusList = ["全て", "選択", "未選択"];
  const [status, setStatus] = useState(statusList[0]);
  const stockListTmp = stockList.filter((item) => {
    switch (status) {
      case statusList[0]:
        return true;
      case statusList[1]:
        if (item.choosen === true) return true;
        else return false;
      case statusList[2]:
        if (item.choosen === false) return true;
        else return false;
      default:
        return false;
    }
  });

  const filterByStatus = (status) => {
    setStatus(status);
  };

  const setItemChecked = (item) => {
    let newStockList = stockList.slice();
    const itemCheckedIndex = newStockList.findIndex(
      (currentItem) => currentItem.id === item.id
    );
    newStockList[itemCheckedIndex] = { ...item, choosen: !item.choosen };
    setStockList(newStockList);
  };

  const deleteItem = (item) => {
    let newStockList = stockList.filter(
      (currentItem) => currentItem.id !== item.id
    );
    setStockList(newStockList);
  };

  const updateStockList = (item, num) => {
    let newStockList = stockList.slice();
    const itemCheckedIndex = newStockList.findIndex(
      (currentItem) => currentItem.id === item.id
    );

    if (itemCheckedIndex !== -1)
      newStockList[itemCheckedIndex] = {
        ...item,
        quantity: item.quantity + num,
      };
    else newStockList.push(item);

    setStockList(newStockList);
  };

  const resetStock = () => {
    let newStockList = [];
    setStockList(newStockList);
  };

  const calculateTotal = (list) => {
    return list.reduce((totalTmp, currentItem) => {
      return totalTmp + currentItem.price * currentItem.quantity;
    }, 0);
  };

  const addProduct = (id) => {
    let newItem = {};
    const newItemIndexInStock = stockList.findIndex(
      (currentItem) => currentItem.id == id
    );
    if (newItemIndexInStock === -1) {
      const newItemIndexInStore = productList.findIndex(
        (currentItem) => currentItem.id == id
      );
      if (newItemIndexInStore === -1) {
        alert("入力したIDがストアの商品と一致しません");
        return null;
      } else {
        newItem = productList.find((currentItem) => currentItem.id == id);
        newItem.quantity = 1;
        newItem.choosen = true;
      }
    } else {
      newItem = stockList.find((currentItem) => currentItem.id == id);
    }
    updateStockList(newItem, 1);
  };

  return (
    <div className="w-50 mt-3" style={{ margin: "auto" }}>
      <div>ITSS 勘定アプリ</div>
      <Header addProductFunc={addProduct} />
      <Filter currentStatus={status} filterByStatus={filterByStatus} />
      <table className="table mt-2">
        <thead>
          <tr>
            <th></th>
            <th>Idコード</th>
            <th>商品名</th>
            <th>商品の数</th>
            <th>各合計</th>
            <th>アクション</th>
          </tr>
        </thead>

        <tbody>
          {stockListTmp.map((item) => (
            <PaymentItem
              key={item.id}
              item={item}
              setItemChecked={setItemChecked}
              updateStockList={updateStockList}
              deleteItem={deleteItem}
            />
          ))}
        </tbody>
      </table>
      <div>
        <button
          type="button"
          className="btn btn-primary me-5"
          data-bs-toggle="modal"
          data-bs-target="#billModal"
          onClick={() => {
            setStatus(statusList[1]);
          }}
        >
          支払う
        </button>
        <Bill
          stockList={stockListTmp}
          calculateTotal={calculateTotal}
          resetStock={resetStock}
        />
        <span className="text-primary">
          {calculateTotal(stockListTmp).toLocaleString()} VND
        </span>
      </div>
    </div>
  );
}

export default Payment;
