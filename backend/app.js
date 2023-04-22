//app.js
// załadowanie modułów dodatkowych i plików aplikacji
const express = require('express');
// moduł do obsługi routingu
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// nasz plik definiujący odpowiedzi dla ścieżek
const routes = require('./routes/index');
const cors = require('cors')
const app = express();

const allowedOrigins = [
    'http://localhost:8081', 
    'http://localhost:8082'
]

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed'))
        }
    },
    optionSuccessStatus: 200
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());

app.use(cors(corsOptions))

app.use('/', routes);

module.exports = app;