import FormEditProduct from "./editProduct/formEditProduct";
import { useParams } from "react-router-dom";

const EditProduct = () => {
  const { productId } = useParams();

  return (
    <div className="container">
      {productId !== undefined ? (
        <>
          <h1>Editar producto</h1> <hr />
          <FormEditProduct productId={productId} />
        </>
      ) : (
        <>
          <h1>Crear nuevo producto</h1> <hr />
          <FormEditProduct />
        </>
      )}
    </div>
  );
};

export default EditProduct;
