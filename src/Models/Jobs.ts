import mongoose, { Schema, Document } from 'mongoose';

export interface IJob extends Document {
  userId: Schema.Types.ObjectId;
  company: string;
  position: string;
  startDate: Date;
  endDate: Date;
}

const JobSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  company: { type: String, required: true },
  position: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

export default mongoose.model<IJob>('jobs', JobSchema);
