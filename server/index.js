const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`This website is served on port http://localhost:${port}`);
});
