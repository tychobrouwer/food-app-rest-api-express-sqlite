const express = require('express');
const helmet = require('helmet');

const signInRouter = require('./routes/sign-in');
const signUpRouter = require('./routes/sign-up');
const getClientSalt = require('./routes/get-client-salt');
const newClientSalt = require('./routes/new-client-salt');
const initDatabase = require('./utils/init-database');

const port = 3000 || process.env.PORT;

initDatabase();

const app = express();
app.use(helmet());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'alive' });
});

app.use('/sign-in', signInRouter);
app.use('/sign-up', signUpRouter);
app.use('/get-client-salt', getClientSalt);
app.use('/new-client-salt', newClientSalt);

app.listen(port, () => {
  console.log(`Api app listening on port ${port}`);
});
