import React from "react";

function PaymentItem({ item, setItemChecked, updateStockList, deleteItem }) {
  return (
    <tr style={{ color: item.choosen ? "black" : "gray" }}>
      <td>
        <input
          type="checkbox"
          checked={item.choosen ? true : false}
          onChange={() => {
            setItemChecked(item);
          }}
        />
      </td>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.quantity}</td>
      <td>{item.quantity * item.price} VND</td>
      <td>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => {
            updateStockList(item, 1);
          }}
        >
          +
        </button>
        <button
          type="button"
          className="btn btn-warning"
          onClick={() => {
            if (item.quantity === 1) deleteItem(item);
            else updateStockList(item, -1);
          }}
        >
          -
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => {
            deleteItem(item);
          }}
        >
          x
        </button>
      </td>
    </tr>
  );
}

export default PaymentItem;
