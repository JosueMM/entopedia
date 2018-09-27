const cors = require('cors');
const express = require('express');

const app = express();

const userRoutes = require('./routes/user');
const calendarRoutes = require('./routes/calendar');
const arthropodRoutes = require('./routes/arthropod');
const photoRoutes = require('./routes/photo');
const authRoutes = require('./routes/auth');


//Settings
const config = require('./config/config')
app.set('superSecret', config.secret);
app.set('port', process.env.PORT || 3000);


//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/entopedia', userRoutes);

app.use('/login', authRoutes);

app.use('/entopedia', calendarRoutes);
app.use('/entopedia', arthropodRoutes);

app.use('/photo', photoRoutes);

app.listen(app.get('port'));

