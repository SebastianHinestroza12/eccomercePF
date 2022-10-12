/**
 * BOOTSTRAP IMPORTS
 */
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";

const Sidebar = () => {
  const alertClicked = () => {
    alert("You clicked the ListGroupItem");
  };

  return (
    <>
      <ListGroup variant="flush" className="filters_container">
        <h5>CATEGORIAS</h5>
        <ListGroup.Item action onClick={alertClicked}>
          Cras justo odio
        </ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
      </ListGroup>

      <div className="filters_container mt-3">
        <h5>MARCAS</h5>

        <Form>
          {["checkbox"].map((type) => (
            <div key={`default-${type}`} className="mb-3">
              <Form.Check
                type={type}
                id={`default-${type}`}
                label={`default ${type}`}
              />
            </div>
          ))}
        </Form>
      </div>

      <div className="filters_container mt-3">
        <h5>RATING</h5>

        <Form>
          {["checkbox"].map((type) => (
            <div key={`rating-${type}`} className="mb-3">
              <Form.Check type={type} id={`rating-${type}`} label={`★★★★★`} />
              <Form.Check type={type} id={`rating-${type}`} label={`★★★★☆`} />
            </div>
          ))}
        </Form>
      </div>
    </>
  );
};
export default Sidebar;
