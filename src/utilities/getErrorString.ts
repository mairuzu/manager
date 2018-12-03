import { AxiosError } from 'axios';
import { pathOr } from 'ramda';

export const getErrorString = (
  errors: AxiosError,
  defaultError: string = "An unexpected error occurred."
  ) =>
    pathOr(defaultError, ['response', 'data', 'errors', 0, 'reason'], errors);

export default getErrorString;