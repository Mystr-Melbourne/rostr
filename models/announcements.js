var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnnouncementSchema = new Schema({
  location: {
    type: String
  },
  content: {
    type: String
  },
  active: {
    type: Number,
    default: 1
  }
});

var Announcement = mongoose.model('Announcement', AnnouncementSchema);
module.exports = Announcement;
