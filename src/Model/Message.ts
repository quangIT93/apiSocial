import { Schema, model, Document } from 'mongoose';

interface IMessage extends Document {
  sender: Schema.Types.ObjectId;
  text: string;
}

const messageSchema = new Schema<IMessage>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Message = model<IMessage>('messages', messageSchema);

export default Message;
