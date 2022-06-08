import { useState } from 'react';
import PaymentItem from './PaymentItem';
import Bill from './Bill';
import Filter from './Filter';

  // const productList = [
  //   {id: 1, name: "milk", price: 8000},
  //   {id: 2, name: "ice scream", price: 17000},
  //   {id: 3, name: "yakult", price: 10000},
  //   {id: 4, name: "bread", price: 15000},
  //   {id: 5, name: "snack", price: 5000},
  //   {id: 6, name: "candy", price: 12000},
  //   {id: 7, name: "chocolate", price: 25000},
  // ];  

function Payment() {

  const [stockList, setStockList] = useState([
    {id: 1, name: "milk", price: 8000, quantity: 1, choosen: true},
    {id: 2, name: "ice scream", price: 17000, quantity: 1, choosen: true},
    {id: 3, name: "yakult", price: 10000, quantity: 2, choosen: false},
    {id: 4, name: "bread", price: 15000, quantity: 1, choosen: true},
    {id: 5, name: "snack", price: 5000, quantity: 1, choosen: false},
    {id: 6, name: "candy", price: 12000, quantity: 1, choosen: true},
    {id: 7, name: "chocolate", price: 25000, quantity: 1, choosen: false},
  ]);

  const statusList = ["全て", "選択", "未選択"];
  const [status, setStatus] = useState(statusList[0]);
  const stockListTmp = stockList.filter(item => {
        switch(status){
          case statusList[0]:
            return true;
          case statusList[1]:
            if(item.choosen===true) return true;
            else return false;
          case statusList[2]:
            if(item.choosen===false) return true;
            else return false;
          default: 
            return false;
        }
      })

   const filterByStatus = (status) => {
    setStatus(status);
  }
  
  const setItemChecked = (item) => {
    let newStockList = stockList.slice();
    const itemCheckedIndex = newStockList.findIndex((currentItem)=>currentItem.id===item.id);
    newStockList[itemCheckedIndex] = {...item, choosen: !item.choosen};
    setStockList(newStockList);
  }

  const deleteItem = (item)=>{
    let newStockList = stockList.filter((currentItem)=>currentItem.id!==item.id);
    setStockList(newStockList);
  };
  
  const updateStockList = (item, num) => {
    let newStockList = stockList.slice();
    const itemCheckedIndex = newStockList.findIndex((currentItem)=>currentItem.id===item.id);
    newStockList[itemCheckedIndex] = {...item, quantity: item.quantity+num};
    setStockList(newStockList);
  }

  const resetStock = () => {
    let newStockList = [];
    setStockList(newStockList);
  }
  
  const calculateTotal = (list)=> {
     return list.reduce((totalTmp, currentItem) => {
      return totalTmp + currentItem.price*currentItem.quantity;
    }, 0); 
  }
  
  return (
    <div className="w-50 mt-3" style={{margin:"auto"}}>
      <div>
        ITSS 勘定アプリ
      </div>
      <Filter currentStatus={status} filterByStatus={filterByStatus}/>
      <table className="table mt-2">
        <thead>
          <tr>
            <th></th>
            <th>Id</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Each total</th>
            <th>Action</th>
          </tr>
        </thead>
        
        <tbody>
          {stockListTmp.map((item) => (
            <PaymentItem key={item.id} item={item} setItemChecked = {setItemChecked} updateStockList = {updateStockList} deleteItem={deleteItem}/> 
          ))}
        </tbody>
      </table>
      <div>
        
        <button type="button" className="btn btn-primary me-5" data-bs-toggle="modal" data-bs-target="#billModal" 
          onClick={()=>{
            setStatus(statusList[1]);
          }}  
        >
          支払う
        </button>
        <Bill stockList = {stockListTmp} calculateTotal = {calculateTotal}  resetStock = {resetStock}/>
        <span className="text-primary">{calculateTotal(stockListTmp).toLocaleString()} VND</span>
      </div>
    </div>
  );
}

export default Payment;
