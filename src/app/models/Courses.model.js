const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete'); // xóa mềm
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator'); // tạo slug

// tạo ra đối tượng schema để tương tác với db
const Course = new Schema(
    {
        name: { type: String, maxLength: 255, require: true },
        description: { type: String, maxLength: 600 },
        image: { type: String, maxLength: 255 },
        videoId: { type: String },
        level: { type: String, maxLength: 255 },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
    },
);
//add plugin
mongoose.plugin(slug);
Course.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

module.exports = mongoose.model('Course', Course);
