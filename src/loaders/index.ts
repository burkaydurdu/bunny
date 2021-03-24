import expressLoader from './express';
import mongooseLoader from './mongoose';
import dependencyInjectorLoader from './dependencyInjector';
import Logger from './logger';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  const userModel = {
    name: 'userModel',
    // Notice the require syntax and the '.default'
    model: require('../models/user').default,
  };

  const travelModel = {
    name: 'travelModel',
    // Notice the require syntax and the '.default'
    model: require('../models/travel').default,
  };

  // It returns the agenda instance because it's needed in the subsequent loaders
  const { agenda } = await dependencyInjectorLoader({
    mongoConnection,
    models: [
      userModel,
      travelModel,
    ],
  });
  Logger.info('✌️ Dependency Injector loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
