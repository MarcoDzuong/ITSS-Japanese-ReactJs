function Filter({currentStatus, filterByStatus}) {
  const statusList = ["全て", "選択", "未選択"];
  return (
    <div className="w-50 m-auto mt-3 d-flex justify-content-evenly">
      { statusList.map((status, index)=>
          <span className={status===currentStatus ? "active filter":"filter"} 
            key={index}
            onClick={()=>{
              console.log("change");
              filterByStatus(status)}}  
          >
            {status}
          </span>
        )
      }
    </div>
  );
}

export default Filter