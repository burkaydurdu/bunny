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

  private kmToRadian(miles) {
    var earthRadiusInMiles = 6371;
    return miles / earthRadiusInMiles;
  }

  private distance(lat1, lon1, lat2, lon2) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		return dist * 1.609344;
	}
}

  public async getTravel(query: Object) {
    try {
      const radius = this.kmToRadian(query["radius"]);

      var mongoQuery = {
        $or: [
          {
            "startPoint" : {
              $geoWithin : {
                $centerSphere : [[query["lat"], query["long"]], radius]
              }
            }
          },
          {
            "endPoint" : {
              $geoWithin : {
                $centerSphere : [[query["lat"], query["long"]], radius]
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

  public async getDistanceTravel(query: Object) {
    try {
      const radius = this.kmToRadian(query["radius"]);

      var mongoQuery = {
        $and: [
          {
            "startPoint" : {
              $geoWithin : {
                $centerSphere : [[query["lat"], query["long"]], radius]
              }
            }
          },
          {
            "endPoint" : {
              $geoWithin : {
                $centerSphere : [[query["lat"], query["long"]], radius]
              }
            }
          }
        ]
      };

      const travelRecords = await this.travelModel.find(mongoQuery)

      var disArray = []

      travelRecords.forEach( doc => {
        disArray.push(this.distance(doc.startPoint.coordinates[0],
                                    doc.startPoint.coordinates[1],
                                    doc.endPoint.coordinates[0],
                                    doc.endPoint.coordinates[1]))
      });


      return { maxDistance: Math.max(...disArray), minDistance: Math.min(...disArray) };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
