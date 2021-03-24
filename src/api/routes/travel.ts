import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import TravelService from '../../services/travel';
import { ITravel } from '../../interfaces/ITravel';
import { celebrate, Joi } from 'celebrate';
import middlewares from '../middlewares';
import { Logger } from 'winston';

const route = Router();

export default (app: Router) => {
  app.use('/travel', route);

  route.post(
    '/create',
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    celebrate({
      body: Joi.object({
        startPoint: Joi.object().required(),
        endPoint: Joi.object().required(),
        startDate: Joi.string().required(),
        endDate: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger:Logger = Container.get('logger');

      req.body.userId = req.currentUser._id;

      logger.debug('Calling Create endpoint with body: %o', req.body );
      try {
        const travelServiceInstance = Container.get(TravelService);
        const { travel } = await travelServiceInstance.createTravel(req.body as ITravel);
        return res.status(200).json({ travel });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
  route.get(
    "/",
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger:Logger = Container.get('logger');

      const queryParams = req.query;

      try {
        const travelServiceInstance = Container.get(TravelService);
        const travel = await travelServiceInstance.getTravel(queryParams);
        return res.status(200).json(travel);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }

      return res.status(200).json({});
    },
  );
  route.get(
    "/distance",
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger:Logger = Container.get('logger');

      const queryParams = req.query;

      try {
        const travelServiceInstance = Container.get(TravelService);
        const travel = await travelServiceInstance.getDistanceTravel(queryParams);
        return res.status(200).json(travel);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }

      return res.status(200).json({});
    },
  )
};
