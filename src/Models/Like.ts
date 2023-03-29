import mongoose, { Schema } from 'mongoose';

interface ILike {
  userId: Schema.Types.ObjectId;
  postId: Schema.Types.ObjectId;
}

const LikeSchema: Schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    postId: {
      type: mongoose.Types.ObjectId,
      ref: 'posts',
      required: true,
    },
  },
  { timestamps: true }
);

const Like = mongoose.model<ILike & mongoose.Document>('likes', LikeSchema);

export default Like;
