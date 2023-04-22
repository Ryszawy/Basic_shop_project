//server.js
const app = require('./app');

app.set('port', process.env.PORT || 8080);

const server = app.listen(app.get('port'), () => {
    console.log(`Application is listening on ${server.address().port} `);
});
