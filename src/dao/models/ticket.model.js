import { Schema, model } from "mongoose";
import mongososePaginate from 'mongoose-paginate-v2'

const ticketSchema = Schema({
  code:             {type: String, unique: true,      required: true },
  purchase_datetime:{type: Date,   default: Date.now, required: true },
  firstName:        {type: String                                    },
  purchaser:        {type: String,                    required: true },
  quantity:         {type: Number,                    required: true },
  amount:           {type: Number,                    required: true }
})

ticketSchema.plugin(mongososePaginate)

export default model('ticket', ticketSchema)