import { Schema, model } from 'mongoose'
import mongososePaginate from 'mongoose-paginate-v2'

const usersSchema = Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
      type: String,
      required: true
  },
    role: {
      type: String,
      default: "user"
    }
})

usersSchema.plugin(mongososePaginate)

export default model('usuarios', usersSchema)