import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import './productform.scss'

const ProductForm = ({selectedProduct, onSubmitF }) => {
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
    defaultValues: {
      status: true,
    }
  });

  const [idselected, setIdSelected] = useState('')

  useEffect(() => {
    // Actualizar el estado del formulario cuando selectedProduct cambie
    if (selectedProduct) {
        setValue('description', selectedProduct.description || '');
        setValue('_id', selectedProduct._id || '');
        setValue('title', selectedProduct.title || '');
        setValue('thumbnail', selectedProduct.thumbnail || '');
        setValue('code', selectedProduct.code || '');
        setValue('category', selectedProduct.category || '');
        setValue('price', selectedProduct.price || 0);
        setValue('stock', selectedProduct.stock || 0);
        setValue('status', selectedProduct.status ||true);
        setValue('owner', selectedProduct.owner || '');
        setIdSelected(selectedProduct._id)
    }
  }, [selectedProduct, setValue]);

  const onSubmit = (data) => {
    onSubmitF(data)
    handleReset()
  }

  const handleReset = () => {
    setIdSelected('')
    reset();
  };

  return (
    <form className="product-form" onSubmit={handleSubmit(onSubmit)}>
      <div className='form-row'>
        <label htmlFor="owner">Dueño del articulo:</label>
        <input type="text" disabled {...register("owner")} />
      </div>
      <div className='form-row'>
        <label htmlFor="_id">ID:</label>
        <input type="text" disabled {...register("_id")} />
      </div>
      <div className='form-row'>
        <label htmlFor="title">Titulo:</label>
        <input type="text" {...register("title", { required: true })} />
        {errors.title && <p>{errors.title.message}</p>}
      </div>
      <div className='form-row'>
        <label htmlFor="thumbnail">Imagen:</label>
        <input type="text" {...register("thumbnail", { required: true })} />
        {errors.thumbnail && <p>{errors.thumbnail.message}</p>}
      </div>
      <div className='form-row'>
        <label htmlFor="code">Código:</label>
        <input type="text" {...register("code", { required: true })} />
        {errors.code && <p>{errors.code.message}</p>}
      </div>
      <div className='form-row'>
        <label htmlFor="category">Categoría:</label>
        <input type="text" {...register("category", { required: true })} />
        {errors.category && <p>{errors.category.message}</p>}
      </div>
      <div className='form-row'>
        <label htmlFor="price">Precio:</label>
        <input type="number" {...register("price", { required: true, min: 0 })} />
        {errors.price && <p>{errors.price.message}</p>}
      </div>
      <div className='form-row'>
        <label htmlFor="stock">Stock:</label>
        <input type="number" {...register("stock", { required: true, min: 0 })} />
        {errors.stock && <p>{errors.stock.message}</p>}
      </div>
      <div className='form-row'>
        <label htmlFor="status">Visible?:</label>
        <input type="checkbox" {...register("status")} />
      </div>
      <div className='form-row'>
        <label htmlFor="description">Descripción:</label>
        <textarea {...register("description", { required: true }) } rows="6" />
        {errors.description && <p>{errors.description.message}</p>}
      </div>
      <div className='form-footer'>
        <button type="submit">Modificar / Agregar</button>
        <button type="button" onClick={handleReset}>Limpiar</button>
      </div>
    </form>
  );
};

export default ProductForm;
