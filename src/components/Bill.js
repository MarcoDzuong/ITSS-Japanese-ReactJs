import BillItem from './BillItem';
import { useEffect } from 'react';
import React from 'react';

function Bill({stockList, calculateTotal, resetStock}) {
  
  let resetStockTimeout;
  
  useEffect(
    () => {
      return () => {
        clearTimeout(resetStockTimeout);
      }
    }
  )
  
  return (
    <div className="modal fade" id="billModal" tabIndex={-1} aria-labelledby="billModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="billModallLabel">領収書</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Each total</th>
              </tr>
            </thead>
            <tbody>
              {stockList.map((item) => (
                <BillItem key={item.id} item={item}/> 
              ))}
              <tr className="text-primary">
                <td colSpan="2">合計額</td>
                <td>{calculateTotal(stockList).toLocaleString()}</td>                
              </tr>
            </tbody>
          </table>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-primary"　data-bs-dismiss="modal"
            onClick={()=>{
              resetStockTimeout = setTimeout(resetStock, 150);
            }
          }>確認</button>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Bill;