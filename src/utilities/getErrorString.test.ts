import getErrorString from './getErrorString';

import { mockAPIError, mockAPIFieldErrors } from 'src/services';

const APIErrors = mockAPIFieldErrors(['label', 'password']);
const errorResponse = () => mockAPIError(400, 'bad request', { errors: APIErrors });
const errorResponseWithoutReason = () => mockAPIError(400, 'bad request', {});

describe("getErrorString method", () => {
  it("should return the reason for the first error reported by the API", () => {
    expect.assertions(1);
    return errorResponse().catch(errors => {
      expect(getErrorString(errors, 'default error')).toMatch('A general error has occurred');
    });
  });
  it("should return the default error string if the error response doesn't contain a reason", () => {
    expect.assertions(1);
    return errorResponseWithoutReason().catch(errors => {
      expect(getErrorString(errors, 'default error')).toMatch('default error');
    });
  });
});