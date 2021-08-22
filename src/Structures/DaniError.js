module.exports = class ExecutorStupidError extends Error {
    constructor(message) {
      super(message)
      this.name = "ExecutorStupidError"
    };
};