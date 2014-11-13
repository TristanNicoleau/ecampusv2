module.exports = function (mongoose) {

    var userSchema = mongoose.Schema({
        username: String,
        email: String,
        encryptedMail: String,
        active: Boolean,
        password: String,
        dateCreation: Date,
        // Voir GeoJSON
        homes: [{
            latitude: String,
            longitude: String,
            accuracy: String,
            provider: String,
            date: Date
        }],
        movements: [{
            latitude: String,
            longitude: String,
            accuracy: String,
            provider: String,
            speed: String,
            date: Date
        }]
        // ------------
    });

    return mongoose.model('users', userSchema);
};