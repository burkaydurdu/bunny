import { Router } from 'express';
import auth from './routes/auth';
import travel from './routes/travel';

export default () => {
	const app = Router();
	auth(app);
  travel(app);

	return app
}
