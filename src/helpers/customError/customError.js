
export class BadRequestError extends Error {
    constructor(error) {
      super(error.message);
   
      this.data = { error };
      this.statusCode = 400;
    }
}

class BadRequestError extends Error {
    constructor(message) {
      super(message);
   
      this.name = 'BadRequestError';
      this.statusCode = 400;
    }
  }

export class NotFoundError extends Error {
    constructor(error) {
      super(error.message);
   
      this.data = { error };
      this.statusCode = 404;
    }
}

class NotFoundError extends Error {
    constructor(message) {
      super(message);
   
      this.name = 'BadRequestError';
      this.statusCode = 400;
    }
  }

export class BadRequestError extends Error {
    constructor(error) {
      super(error.message);
   
      this.data = { error };
      this.statusCode = 400;
    }
}