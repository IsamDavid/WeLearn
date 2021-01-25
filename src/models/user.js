//Definir el esquema de nuestros usuarios
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const {Schema} = mongoose;

const userSchema = new Schema({
    //Ver como meter el string
    name: String,
    email: String,
    password: String
});

//hacerlo de manera asincrona
userSchema.methods.encryptPassword = (password) =>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password){
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('users', userSchema);