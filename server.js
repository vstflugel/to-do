// import express from "express";
// import cors from "cors";
// import records from "./routes/record.js";
// 
// const PORT = process.env.PORT || 5050;
// const app = express();
// 
// app.use(cors());
// app.use(express.json());
// app.use("", records);
// 
// // start the Express server
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });


import express from "express";
import cors from "cors";
import records from "./routes/record.js";

const PORT = process.env.PORT || 5050;
const app = express();

// Allow only your Vercel frontend to access this backend
app.use(cors({
  origin: 'https://to-do-frontend-red.vercel.app' // Replace with the exact URL of your Vercel frontend
}));

app.use(express.json());
app.use("", records);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

