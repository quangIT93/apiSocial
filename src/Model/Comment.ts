import mongoose, { Schema, Document, model } from 'mongoose';

export interface IComment extends Document {
  userId: Schema.Types.ObjectId;
  postId: Schema.Types.ObjectId;
  text: string;
}

const CommentSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users', require: true },
    postId: { type: Schema.Types.ObjectId, ref: 'posts', require: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<IComment>('comments', CommentSchema);
