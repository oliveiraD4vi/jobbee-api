const { filterFieldsToRemove } = require("./constants");

module.exports = class Filters {
  constructor(query, string) {
    this.query = query;
    this.string = string;
  }

  filter() {
    const queryString = { ...this.string };

    filterFieldsToRemove.forEach((e) => delete queryString[e]);
    this.query = this.query.find(queryString);

    return this;
  }

  sort() {
    if (this.string.sort) {
      const sortBy = this.string.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-postingDate");
    }

    return this;
  }

  limitFields() {
    if (this.string.fields) {
      const fields = this.string.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }
};
