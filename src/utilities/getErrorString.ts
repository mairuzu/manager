import { pathOr } from 'ramda';

export const getErrorString = (
  errors: Linode.ApiFieldError[],
  defaultError: string = "An unexpected error occurred."
  ) =>
    pathOr(defaultError, ['response', 'data', 'errors', 0, 'reason'], errors);

export default getErrorString;