import Table from "./DatatableOrders";
import data from "./jsonReviews";

const Orders = () => {
  const clickhandler = (name) => console.log("delete", name);

  return (
    <div className="App">
      <div>
        <Table data={data} click={clickhandler} />
      </div>
    </div>
  );
};
export default Orders;
