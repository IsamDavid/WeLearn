const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//Para que no autentifique en todas las páginas. Para serializar
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    //Consulta a la base de datos.
    const user = await User.findById(id);
    done(null, user);
});


//Objeto y un callback
passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {

    //Consulta a la BD
    const user = await User.findOne({ 'email': email });
    console.log(user);
    if (user) {
        return done(null, false, req.flash('signupMessage', 'El Correo ya existe.'));
    } else {
        const name= req.body.name;
        const newUser = new User();
        newUser.name = name;
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        // newUser.password = password;
        await newUser.save();
        done(null, newUser);
    }
}));

passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    //Comprobar si existe el usuario
    const user = await User.findOne({'email': email });
    if (!user) {
        return done(null, false, req.flash('signinMessage', 'Usuario no encontrado'));
    }
    if (!user.comparePassword(password)) {
        return done(null, false, req.flash('signupMessage', 'Contraseña incorrecta'));
    }
    done(null, user);
}));

