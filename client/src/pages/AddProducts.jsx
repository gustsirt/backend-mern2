import { useContext, useEffect, useState } from "react";
import Swal from 'sweetalert2';

import { ContextConfig } from "../context/ContextConfig.jsx";
import { ContextUser } from "../context/ContextUser.jsx";
import ServiceProducts from "../services/products.service.jsx";

import ProductForm from "../components/products/ProductForm.jsx";
import ProductsListEdit from "../components/products/ProductsListEdit.jsx";

const AddProducts = () => {

  const {uriBase} = useContext(ContextConfig)
  const { token } = useContext(ContextUser);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const serviceProducts = new ServiceProducts(uriBase, token)

  const fetchProducts = async () => {
    try {
      const resp = await serviceProducts.get()

      if (resp?.isError === false) {
        setProducts(resp.payload.docs);
      } else {
        Swal.fire({ icon: "error", text: respJson.message || "Error al obtener productos" });
      }
    } catch (error) {
      Swal.fire({ icon: "error", text: "Error al obtener productos debido a un problema en el sistema" });
    }
  };

  const handleProducts = async (newProduct) => {
    try {
      let resp
      if(newProduct._id) { resp = await serviceProducts.put (newProduct._id, newProduct) }
                    else { resp = await serviceProducts.post(newProduct) }
      if (resp?.isError === false) {
        const message = newProduct._id 
        ? `El producto ${resp.payload.title} fue modificado correctamente` 
        : `El producto ${resp.payload.title} fue agregado correctamente con ID: ${resp.payload._id}`
        Swal.fire({ icon: "success", text: message });
        fetchProducts()
      } else {
        Swal.fire({ icon: "error", text: resp.message || "Error al obtener productos" });
      }
    } catch (error) {
      Swal.fire({ icon: "error", text: resp.message || "Error al obtener productos debido a un problema en el sistema" });
    }
  };

  const handleDeleteProduct = async (product) => {
    try {
      const resp = await serviceProducts.delete(product._id) 

      if (resp?.isError === false) {
        const message = `El producto ${resp.payload.title} fue eliminado correctamente` 
        Swal.fire({ icon: "success", text: message });
        fetchProducts()
      } else {
        Swal.fire({ icon: "error", text: resp.payload || resp.message || "Error al eliminar el producto" });
      }
    } catch (error) {
      Swal.fire({ icon: "error", text: resp.payload || resp.message || "Error debido a un problema en el sistema" });
    }
  };
  
  useEffect(() => {
    fetchProducts();
  }, [uriBase]);
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
          <ProductsListEdit products={products} onProductClick={handleProductClick} onXClick={handleDeleteProduct}/>
        </div>
        <div className="row-30">
          <ProductForm selectedProduct={selectedProduct} onSubmitF={handleProducts}/>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;