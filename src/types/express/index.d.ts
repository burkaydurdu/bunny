import { Document, Model } from 'mongoose';
import { IUser } from '../../interfaces/IUser';
import { ITravel } from '../../interfaces/ITravel';

declare global {
  namespace Express {
    export interface Request {
      currentUser: IUser & Document;
    }
  }

  namespace Models {
    export type UserModel = Model<IUser & Document>;
    export type TravelModel = Model<ITravel & Document>;
  }
}
