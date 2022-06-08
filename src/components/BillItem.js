const BillItem = ({item}) => {
  return (
   <tr>
     <td>{item.name}</td>
     <td>{item.quantity}</td>
     <td>{item.quantity*item.price}</td>
   </tr>
  )
}
export default BillItem;