const express = require('express');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

function getWeather(req, res, next) {
  req.visitorWeather = false;
  if (req.visitorWeather) {
    res.send('Please come back when it is not raining');
  } else {
    next();
  }
}

app.get('/', getWeather, (req, res) => {
  res.render('home', {
    isRaining: req.visitorWeather,
    pets: [
      { name: 'meows', species: 'cat' },
      { name: 'barksalot', species: 'dog' },
    ],
  });
});

app.get('/about', (req, res) => {
  res.send('Hello from about page');
});

app.post('/result', (req, res) => {
  if (req.body.color.trim().toUpperCase() === 'BLUE') {
    res.send('That is correct!');
  } else {
    res.send('That is incorrect!');
  }
});

app.get('/result', (req, res) => {
  res.send('Why are you here?');
});

app.get('/api/pets', (req, res) => {
  res.json([
    { name: 'meows', species: 'cat' },
    { name: 'barksalot', species: 'dog' },
  ]);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
