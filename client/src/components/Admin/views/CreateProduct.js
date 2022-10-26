import FormNewProduct from "./createProduct/formNewProduct";
import { useParams } from "react-router-dom";

const NewProduct = () => {
  const { productId } = useParams();

  return (
    <div className="container">
      {productId !== undefined ? (
        <>
          <h1>Editar producto</h1> <hr />
          <FormNewProduct productId={productId} />
        </>
      ) : (
        <>
          <h1>Crear nuevo producto</h1> <hr />
          <FormNewProduct />
        </>
      )}
    </div>
  );
};

export default NewProduct;
