const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const { sign } = require('crypto');

//Inicializaciones
const app = express();
require('./src/database');
require('./src/passport/local-auth');



//Configuraciones
app.use(express.static("src"));
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

//Midlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(session({
    //String generado aleatoriamente
    secret: 'pn-h4hYNVF',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    app.locals.signinMessage = req.flash('signinMessage');
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.user= req.user;
    next();
})
//Routes
app.use('/', require('./src/routes/index'));

//Empezando el servidor
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})