module.exports = function (mongoose) {

    var NewsSchema = mongoose.Schema({
        title: String,
        text: String,
        date: Date,
        author: String
    });

    return mongoose.model('news', NewsSchema);
};