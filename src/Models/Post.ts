import mongoose, { Document, Schema } from 'mongoose';

export interface ICommentPost {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ILike {
  userId: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

interface IPost {
  userId: Schema.Types.ObjectId;
  text: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  likes: ILike[];
  comments: ICommentPost[];
}

const PostSchema = new mongoose.Schema<IPost>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  likes: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users ',
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  comments: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users ',
      },
      text: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Post = mongoose.model<IPost>('posts', PostSchema);

export default Post;
