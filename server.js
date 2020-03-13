import express from "express";
import BookingRoutes from './api/routes/BookingsRoutes';

const app = express();
import { json, urlencoded } from "body-parser";

const port = process.env.PORT || 3000;
 
//middlewares  

app.use(json());
app.use(urlencoded({ extended: false }));

new BookingRoutes(app); 

//user friendly response for not found url
app.use((req, res) => {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port, () => {
  console.log(`running at port ${port}`);
});

export default app;