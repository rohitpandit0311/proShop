import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import productRoutes from './routes/productRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
connectDB();
const app = express();

app.get('/', (req, res) => {
	res.send('Api is running...');
});

app.use('/api/products', productRoutes);

//404 page
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
	console.log(
		`server running in ${process.env.NODE_ENV} mode at port:${PORT} `.yellow
			.bold
	)
);
