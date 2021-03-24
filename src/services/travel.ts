import { Service, Inject } from 'typedi';
import config from '../config';
import { ITravel } from '../interfaces/ITravel';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import events from '../subscribers/events';

@Service()
export default class TravelService {
  constructor(
    @Inject('travelModel') private travelModel: Models.TravelModel,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {
  }

  public async createTravel(travelDTO: ITravel): Promise<{ travel: ITravel; }> {
    try {
      const travelRecord = await this.travelModel.create({
        ...travelDTO,
      });
      this.logger.silly('Created travel data');

      if (!travelRecord) {
        throw new Error('Travel cannot be created');
      }

      this.eventDispatcher.dispatch(events.travel.createTravel, { travel: travelRecord });

      const travel = travelRecord.toObject();
      return { travel };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  private milesToRadian(miles) {
    var earthRadiusInMiles = 3959;
    return miles / earthRadiusInMiles;
  }

  public async getTravel(query: Object) {
    try {
      var mongoQuery = {
        $or: [
          {
            "startPoint" : {
              $geoWithin : {
                $centerSphere : [[query["lat"], query["long"]], this.milesToRadian(query["radius"]) ]
              }
            }
          },
          {
            "endPoint" : {
              $geoWithin : {
                $centerSphere : [[query["lat"], query["long"]], this.milesToRadian(query["radius"]) ]
              }
            }
          }
        ]
      };

      const travelRecords = await this.travelModel.find(mongoQuery);

      return travelRecords;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
