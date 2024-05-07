import { Schema, model } from 'mongoose'
import mongososePaginate from 'mongoose-paginate-v2'

const usersSchema = new Schema({
  first_name: { type: String, required: true },
  last_name:  { type: String },
  email:      { type: String, required: true, unique: true },
  birthday:   { type: Date },
  password:   { type: String, required: true },
  role:       { type: String, default: "user"},
  cart:       { type: Schema.Types.ObjectId, ref: 'carts' },
  lastupdated:{ type: Date,   required: true, default: Date.now()},
  lastconnection:{ type: Date,   default: Date.now()},
})

usersSchema.pre('find', function () { this.populate('cart')});

usersSchema.plugin(mongososePaginate)

export default model('usuarios', usersSchema)