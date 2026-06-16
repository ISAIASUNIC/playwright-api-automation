import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js';
import routes from './routes/index.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  return res.json({
    status: 'online',
    sistema: 'Agente Moda'
  });
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(routes);

export default app;