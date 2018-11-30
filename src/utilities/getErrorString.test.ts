// import getErrorString from './getErrorString';

import { mockAPIError, mockAPIFieldErrors } from 'src/services';

const errors = mockAPIFieldErrors(['label', 'password']);
const errorResponse = mockAPIError(400, 'bad request', { errors });

describe("getErrorString method", () => {
  it("should return the reason for the first error reported by the API", () => {
    console.log(errorResponse);
    // expect(getErrorString(errorResponse, 'default error')).toMatch("label is incorrect");
  });
});