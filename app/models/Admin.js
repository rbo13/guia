(function(){
    'use strict';

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema;
    var bcrypt = require('bcrypt-nodejs');

    var AdminSchema = new Schema({
       username: {
           type: String,
           required: true,
           index:{
               unique: true
           }
       },

        password: {
            type: String,
            required: true,
            select: false
        }
    });
//end creating admin schema.

    AdminSchema.pre('save', function(next){

        var user = this;
        if (!user.isModified('password')) return next();

        bcrypt.hash(user.password, null, null, function(err, hash){
            if(err) return next(err);
            user.password = hash;
            next();
        });
    });

    AdminSchema.methods.comparePassword = function(password){
        var user = this;
        return bcrypt.compareSync(password, user.password);
    };
    module.exports = mongoose.model('Admin', AdminSchema);
})();