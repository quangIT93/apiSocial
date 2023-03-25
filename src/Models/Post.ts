import mongoose from 'mongoose';

interface IComment {
  userId: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ILike {
  userId: string;
}

interface IPost {
  userId: string;
  text: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  likes: ILike[];
  comments: IComment[];
}

const PostSchema = new mongoose.Schema<IPost>({
  userId: {
    type: String,
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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
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
