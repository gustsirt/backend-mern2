import { Schema, model } from 'mongoose'
import mongososePaginate from 'mongoose-paginate-v2'

const productSchema = new Schema({
  title:        { type: String,  required: true  },
  description:  { type: String,  required: true  },
  code:         { type: String,  required: true, unique: true },
  status:       { type: Boolean, required: true, default: true },
  category:     { type: String,  required: true, lowercase: true },
  price:        { type: Number,  required: true, precision: 2 },
  stock:        { type: Number,  required: true  },
  owner:        { type: String,  default: 'admin'},
  thumbnail:    { type: String,  required: true, lowercase: true },
  lastupdated:  { type: Date,    required: true, default: Date()}
});

productSchema.plugin(mongososePaginate)

export default model('products', productSchema);