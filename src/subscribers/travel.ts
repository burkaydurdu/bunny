import { Container } from 'typedi';
import { EventSubscriber, On } from 'event-dispatch';
import events from './events';
import { ITravel } from '../interfaces/ITravel';
import mongoose from 'mongoose';
import { Logger } from 'winston';

@EventSubscriber()
export default class TravelSubscriber {

  @On(events.travel.createTravel)
  public onTravelCreate(
    { startPoint, startDate, endPoint, endDate, userId, _id }: Partial<ITravel>) {
    const Logger: Logger = Container.get('logger');

    try {
      // ...
    } catch (e) {
      Logger.error(`🔥 Error on event ${events.travel.createTravel}: %o`, e);

      // Throw the error so the process dies (check src/app.ts)
      throw e;
    }
  }
}
