import mongoose, { Document, model, Model, Schema } from "mongoose"
import { ModelBoardType } from '../types'

const BoardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    contents: {
        type: String,
        required: true
    }
});

export const Board: Model<ModelBoardType> = mongoose.models.Board || model('Board', BoardSchema);