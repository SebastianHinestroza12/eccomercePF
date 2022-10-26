import Table from "./DatatableReviews";
import data from "./jsonReviews";

const AdminReviews = () => {
  const clickhandler = (name) => console.log("delete", name);

  return (
    <div className="App">
      <div>
        <Table data={data} click={clickhandler} />
      </div>
    </div>
  );
};
export default AdminReviews;
