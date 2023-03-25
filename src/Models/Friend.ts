import mongoose, { Document, Schema } from 'mongoose';

interface IFriendship extends Document {
  userId: Schema.Types.ObjectId;
  friendId: Schema.Types.ObjectId;
  status: 'pending' | 'accepted' | 'rejected';
}

const friendSchema = new Schema<IFriendship>({
  userId: { type: Schema.Types.ObjectId, ref: 'users' },
  friendId: { type: Schema.Types.ObjectId, ref: 'users' },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
});

export default mongoose.model<IFriendship>('friends', friendSchema);
