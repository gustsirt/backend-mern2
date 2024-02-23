import { useContext, useEffect, useState } from "react";

import Swal from 'sweetalert2';
import ServiceProducts from "../services/products.service.jsx";
import ProductForm from "../components/products/ProductForm.jsx";
import ProductsListEdit from "../components/products/ProductsListEdit.jsx";

const AddProducts = () => {

  const serviceProducts = new ServiceProducts()

  //const { token } = useContext(ContextUser);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);


  const fetchProducts = async () => {
    try {
      const resp = await serviceProducts.get()
      //console.log(resp);

      if (resp?.isError === false) {
        setProducts(resp.payload.docs);
      } else {
        Swal.fire({ icon: "error", text: respJson.message || "Error al obtener productos" });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({ icon: "error", text: "Error al obtener productos debido a un problema en el sistema" });
    }
  };

  const postProducts = async (newProduct) => {
    // AGREGAR MODIFICAR PRODUCTO
    try {
      console.log("add product - newproducts: ",newProduct);
      const resp = await serviceProducts.post(newProduct)
      console.log(resp);;

      if (resp?.isError === false) {
        Swal.fire({ icon: "sucess", text: `El producto ${resp.payload.title} fue agregado correctamente con ID: ${resp.payload._id}` });
        fetchProducts()
      } else {
        Swal.fire({ icon: "error", text: resp.payload || resp.message || "Error al obtener productos" });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({ icon: "error", text: resp.payload || resp.message || "Error al obtener productos debido a un problema en el sistema" });
    }
  }
  useEffect(() => {
    fetchProducts();
  }, []);
  //  }, [uriBase, token]);

  const handleProductClick = (product) => {
    //console.log(product);
    setSelectedProduct(product);
  };

  // TODO FALTA agregar paginacion
  return (
    <div className="page-container">
      <h1 className="title">Editar Productos</h1>
      <div className="flex-row">
        <div className="row-70">
          <ProductsListEdit products={products} onProductClick={handleProductClick}/>
        </div>
        <div className="row-30">
          <ProductForm selectedProduct={selectedProduct} onSubmitF={postProducts}/>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;