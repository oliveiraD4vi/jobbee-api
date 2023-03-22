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

  searchByQuery() {
    if (this.string.q) {
      const qu = this.string.q.split("-").join(" ");
      this.query = this.query.find({
        $text: {
          $search: `\"${qu}\"`,
        },
      });
    }

    return this;
  }

  pagination() {
    const page = parseInt(this.string.page, 10) || 1;
    const limit = parseInt(this.string.limit, 10) || 10;
    const skipResults = (page - 1) * limit;

    this.query = this.query.skip(skipResults).limit(limit);

    return this;
  }
};
