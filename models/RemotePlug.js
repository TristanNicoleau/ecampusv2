module.exports = function (mongoose) {

    var DeviceSchema = mongoose.Schema({
        type: String,
        name: String,
        power: Number
    });

    var SlotSchema = mongoose.Schema({
        weekdayStart: {
            name: String,
            value: Number
        },
        weekdayEnd: {
            name: String,
            value: Number
        },
        timeStart: Date,
        timeEnd: Date
    });

    var RemotePlugSchema = mongoose.Schema({
        owners: [mongoose.Schema.Types.ObjectId],
        plugNumber: [Number],
        name: String,
        slots: [SlotSchema],
        devices: [DeviceSchema],
        status: String,
        active: Boolean,
        color: String
    });

    return mongoose.model('remoteplugs', RemotePlugSchema);
};