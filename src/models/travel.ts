import mongoose from 'mongoose';
import { ITravel } from '../interfaces/ITravel';

const Travel = new mongoose.Schema(
  {
    startPoint: {
      type: { type: String, default: 'Point' },
      coordinates: { type: [Number], default: [0, 0] }
    },
    endPoint: {
      type: { type: String, default: 'Point' },
      coordinates: { type: [Number], default: [0, 0] }
    },
    startDate: {
      type: Date
    },
    endDate: {
      type: Date
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
  }
);

export default mongoose.model<ITravel & mongoose.Document>('Travel', Travel);
