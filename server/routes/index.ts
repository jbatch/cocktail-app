import { Application } from 'express';
import pino from 'pino';
import usersRoutes from './users-routes';
import ingredientsRoutes from './ingredients-routes';
import recipeRoutes from './recipe-routes';

const logger = pino();

function configure(app: Application) {
  app.use('/api/users', usersRoutes);
  app.use('/api/ingredients', ingredientsRoutes);
  app.use('/api/recipes', recipeRoutes);
  // Handle 404 routes
  app.use('/api/*', (req, res) => {
    logger.info(`Got 404 request to "${req.path}"`);
    res.json({ message: 'route not found' });
  });
}

export default {
  configure,
};
