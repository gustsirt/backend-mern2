import { useContext, useEffect, useState } from "react";
import useSwalAlert from "../../hook/useSwalAlert.jsx";
import { ContextConfig } from "../../context/ContextConfig.jsx";
import { ContextUser } from "../../context/ContextUser.jsx";
import ProductForm from "./ProductForm.jsx";
import ProductsListEdit from "./ProductsListEdit.jsx";
import useFetchTokenService from "../../hook/useFetchTokenService.jsx";
import { Link } from "react-router-dom";
import { BiChevronsLeft, BiChevronsRight } from "react-icons/bi";

const AddProducts = () => {

  const {uriBase} = useContext(ContextConfig)
  const { token } = useContext(ContextUser);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { message } = useSwalAlert()
  const { fetchTData, postTData, putTData, deleteTData } = useFetchTokenService()
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ page, setPage ] = useState(1)
  const [ pages, setPages ] = useState(1)
  const [ hasPrev, setHasPrev ] = useState(false)
  const [ hasNext, setHasNext ] = useState(true)
  const [ prev, setPrev ] = useState("")
  const [ next, setNext ] = useState("")
  const [ filter, setFilter ] = useState({})

  const handleProducts = async (newProduct) => {
    try {
      let resp
      if(newProduct._id) {
        resp = await putTData (`api/products/${newProduct._id}`, newProduct)
      } else {
        resp = await postTData(`api/products`, newProduct)
      }
      if (resp?.isError === false) {
        const rmessage = newProduct._id 
        ? `El producto ${resp.payload.title} fue modificado correctamente`
        : `El producto ${resp.payload.title} fue agregado correctamente con ID: ${resp.payload._id}`
        message(rmessage, "success")
        fetchCategories()
        fetchProducts()
      } else {
        message(resp.message || "Error al obtener productos","error");
      }
    } catch (error) {
      message("Error al obtener productos debido a un problema en el sistema","error")
    }
  };

  const handleDeleteProduct = async (product) => {
    try {
      const resp = await deleteTData(`api/products/${product._id}`) 
      if (resp?.isError === false) {
        const rmessage = `El producto ${resp.payload.title} fue eliminado correctamente` 
        message(rmessage, "success")
        defaultFilter()
        fetchCategories()
        fetchProducts()
      } else {
        message(resp.message || "Error al eliminar el producto","error");
      }
    } catch (error) {
      message("Error al obtener productos debido a un problema en el sistema","error")
    }
  };
  
  // Init Get Funcion
  const fetchCategories = async () => {
    const resp = await fetchTData("api/products/group/categorys");
    if (!resp?.isError) {
      setCategories(resp.payload);
    }
  };
  const fetchProducts = async () => {
    try {
      const resp = await fetchTData(`api/products`, filter);
      if (resp?.isError === false) {
        setProducts(resp.payload.docs);
        setPage(resp.payload.page);
        setPages(resp.payload.totalPages);
        setHasPrev(resp.payload.hasPrevPage);
        setHasNext(resp.payload.hasNextPage);
        setPrev(resp.payload.prevPage);
        setNext(resp.payload.nextPage);
      } else {
        message(resp.message || "Error al obtener productos","error");
      }
    } catch (error) {
      message("Error al obtener productos debido a un problema en el sistema","error");
    }
  };
  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [filter]);

  // Function for Filters
  const defaultFilter = () => {
    setFilter({});
  }
  const changeFilter = (key,value)=> {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [key]: value,
    }));
  }
  const goToNextPage = () => {
    changeFilter("page", next);
  };
  const goToPrevPage = () => {
    changeFilter("page", prev);
  };
  const handleSortChange = (event) => {
    const option = event.target.value
    defaultFilter()
    if(option != "default") changeFilter("sort", option)
  }
  const handleAvailabilityChange = (event) => {
    const option = event.target.value
    defaultFilter()
    if(option === "true") changeFilter("availability", option)
  }
  const handleCategoryChange = (event) => {
    const option = event.target.value
    defaultFilter()
    if(option != "default") changeFilter("category", option)
  }

  // Function for Edith
  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="page-container">
      <h1 className="title">Editar Productos</h1>
      <div className="flex-row">
        <div className="row-70">
          <div className="filter-container">
            <div>
              <p>Categorias: </p>
              <select onChange={handleCategoryChange}>
              <option value="default">Todas</option>
              {categories.map((category) => (
                <option value={category} key={category}>
                  {category}
                </option>
              ))}
              </select>
            </div>
            <div>
              <p>Ordenar: </p>
              <select onChange={handleSortChange}>
                <option value="default">Por defecto</option>
                <option value="asc">Precio Ascendente</option>
                <option value="desc">Precio Descendente</option>
              </select>
            </div>
            <div>
              <p>Con Stock?: </p>
              <select onChange={handleAvailabilityChange}>
                <option value="true">Con Stock</option>
                <option value="false">Todos</option>
              </select>
            </div>
            <div className="select-pages">
            {hasPrev && <Link onClick={goToPrevPage}> <BiChevronsLeft /> </Link>}
              <p>Pagina {page} de {pages}</p>
              {hasNext && <Link onClick={goToNextPage}> <BiChevronsRight /> </Link>}
            </div>
          </div>
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