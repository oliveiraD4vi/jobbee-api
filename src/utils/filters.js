module.exports = class Filters {
  constructor(query, string) {
    this.query = query;
    this.string = string;
  }

  filter() {
    this.query = this.query.find(this.string);
    return this;
  }
};
