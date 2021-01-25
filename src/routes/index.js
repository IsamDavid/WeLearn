const express = require('express'); 
const passport = require('passport');
const router = express.Router();
//definimos las rutas del servidor

router.get('/',(req, res, next)=>{
    res.render('index');
    // res.sendFile('index.html');
    // res.render('C:\Users\i_sam\Desktop\Isam WeLearn\WeLearn\src\index');
});

router.get('/signup',(req,res,next)=>{
    res.render('signup');
});

router.post('/signup', passport.authenticate('local-signup',{
    //Si todo sale bien, a dónde lo vamos a redirigir?? 
    successRedirect: '/principal',
    failureRedirect: '/signup',
    passReqToCallback: true
}));

router.get('/signin',(req,res,next)=>{
    res.render('signin');
});

router.post('/signin', passport.authenticate('local-signin',{
    successRedirect: '/principal',
    failureRedirect: '/signin',
    passReqToCallback: true
    // failureFlash: true
    // successRedirect: '/principal',
    // failureRedirect: '/signin',
}));

router.get('/logout', (req, res, next)=>{
    req.logout();
    res.redirect('/');
});

router.get('/perfil', isAuthenticated, (req, res, next)=>{
    res.render('perfil');
});

router.get('/primero-primaria', isAuthenticated, (req, res, next)=>{
    res.render('primero-primaria');
});
router.get('/segundo-primaria', isAuthenticated, (req, res, next)=>{
    res.render('segundo-primaria');
});
router.get('/tercero-primaria', isAuthenticated, (req, res, next)=>{
    res.render('tercero-primaria');
});
router.get('/cuarto-primaria', isAuthenticated, (req, res, next)=>{
    res.render('cuarto-primaria');
});
router.get('/quinto-primaria', isAuthenticated, (req, res, next)=>{
    res.render('quinto-primaria');
});
router.get('/sexto-primaria', isAuthenticated, (req, res, next)=>{
    res.render('sexto-primaria');
});

router.get('/principal', isAuthenticated, (req,res,next)=>{
    res.render('principal');
});

function isAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
};

module.exports = router;