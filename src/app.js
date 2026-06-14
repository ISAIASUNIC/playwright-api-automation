import express from 'express';
import routes from './routes/index.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  return res.json({
    status: 'online',
    sistema: 'Agente Moda'
  });
});

app.use(routes);

export default app;// cole aqui