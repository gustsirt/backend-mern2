import { useEffect, useState } from "react";
import ProductsList from "./ProductsList.jsx";
import useSwalAlert from "../../hook/useSwalAlert.jsx";
import useFetchService from "../../hook/useFetchService.jsx";
import { Link } from "react-router-dom";
import { BiChevronsLeft, BiChevronsRight } from "react-icons/bi";

const Products = () => {
  const { fetchData } = useFetchService()
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ page, setPage ] = useState(1)
  const [ pages, setPages ] = useState(1)
  const [ hasPrev, setHasPrev ] = useState(false)
  const [ hasNext, setHasNext ] = useState(true)
  const [ prev, setPrev ] = useState("")
  const [ next, setNext ] = useState("")
  const [ filter, setFilter ] = useState({availability: true})
  const { message } = useSwalAlert()

  // Init Get Funcion
  const fetchCategories = async () => {
    const resp = await fetchData("api/products/group/categorys");
    if (!resp?.isError) {
      setCategories(resp.payload);
    }
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const resp = await fetchData(`api/products`, filter);
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
    fetchCategories();
    fetchProducts();
  }, [filter]);
  
  // Function for Filters
  const defaultFilter = () => {
    setFilter({availability: true});
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

  return (
    <div className="page-container">
      <h1 className="title">Productos</h1>
      <div className="filter-container">
        {<div>
          <p>Categorias: </p>
          <select onChange={handleCategoryChange}>
            <option value="default">Todas</option>
            {categories.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
        </div>}
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
      { products.length === 0 ? (
        <div>...Cargando...</div> 
      ) : (
        <ProductsList products={products}/>
      )}
    </div>
  );
};

export default Products;