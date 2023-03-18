const mongoose = require("mongoose");
const validator = require("validator");
const slugify = require("slugify");

const jobScheme = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter the Job title"],
    trim: true,
    maxLength: [100, "Job title can not exceed 100 characters"],
  },
  slug: String,
  description: {
    type: String,
    required: [true, "Please enter Job description"],
    maxLength: [1000, "Job description can not exceed 1000 characters"],
  },
  email: {
    type: String,
    validate: [validator.isEmail, "Please add a valida email address"],
  },
  address: {
    type: String,
    required: [true, "Please add an address"],
  },
  company: {
    type: String,
    required: [true, "Please add company name"],
  },
  industry: {
    type: [String],
    required: true,
    enum: {
      values: [
        "Business",
        "Information Technology",
        "Banking",
        "Education/Training",
        "Telecomunication",
        "Others",
      ],
      message: "Please select correct option for industry",
    },
  },
  jobType: {
    type: String,
    required: true,
    enum: {
      values: ["Permanent", "Temporary", "Internship"],
      message: "Please select correct option for jobType",
    },
  },
  minEducation: {
    type: String,
    required: true,
    enum: {
      values: ["Bachelors", "Masters", "Phd"],
      message: "Please select correct option for Education",
    },
  },
  positions: {
    type: Number,
    default: 1,
  },
  experience: {
    type: String,
    required: true,
    enum: {
      values: [
        "No Experience",
        "1 Year - 2 Years",
        "2 Years - 5 Years",
        " 5 Years +",
      ],
      message: "Please select correct options for Experience",
    },
  },
  salary: {
    type: Number,
    required: [true, "Please enter expected salary for this job"],
  },
  postingDate: {
    type: Date,
    default: Date.now,
  },
  lastDate: {
    type: Date,
    default: new Date().setDate(new Date().getDate() + 7),
  },
  applicantsApplied: {
    type: [Object],
    select: false,
  },
});

jobScheme.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

module.exports = mongoose.model("Job", jobScheme);