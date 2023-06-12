import express from 'express';
import cors from 'cors';

import { routerAuth, routerProduct, routerOrder } from './routes/index.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', routerAuth);
app.use('/api/product', routerProduct);
app.use('/api/order', routerOrder);

app.listen(3000, async () => {
  console.log(`Server is running on port 3000`);
});
