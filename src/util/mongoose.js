module.exports = {
    multipleMongoosetoObject: function (mongooseArray) {
        return mongooseArray.map((mongooseArray) => mongooseArray.toObject());
    },
    mongoosetoObject: function (mongooseArray) {
        return mongooseArray ? mongooseArray.toObject() : mongooseArray;
    },
};
