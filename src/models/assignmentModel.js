const { Schema, model } = require("mongoose");

const assignmentSchema = new Schema(
  {
    title: {
      type: String,
	  require: true,
    },
    
    description: {
      type: String,
      require: true,
    },

    endDate: {
      type: Date,
      require: true,
    },
  },
  { timestamps: true }
);
const Assignment = model("Assignment", assignmentSchema);
module.exports = Assignment;
