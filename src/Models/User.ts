import mongoose from 'mongoose';

export type IUser = mongoose.Document & {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePicture?: string;
  coverPhoto?: string;
  bio?: string;
  phone?: string;
  location?: {
    country?: string;
    city?: string;
    district?: String;
  };
  dateOfBirth?: Date;
  createdAt: Date;
  updatedAt: Date;
  gender: string;
};

const userSchema = new mongoose.Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String },
    coverPhoto: { type: String },
    bio: { type: String },
    phone: { type: String },
    location: {
      country: { type: String },
      city: { type: String },
      district: { type: String },
    },
    dateOfBirth: { type: Date },
    gender: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('users', userSchema);
