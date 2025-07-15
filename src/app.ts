import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3000;

// Middleware (if you need it later)
app.use(express.json());

// Root route
app.get('/', (req: Request, res: Response) => {
  // You can remove the console.log once you start using `req` properly
  console.log(req);
  res.send('Hello World!');
});

// Only start listening when this file is run directly,
// not when imported by your test suite.
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

export default app;
