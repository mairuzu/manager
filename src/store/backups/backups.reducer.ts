import * as moment from 'moment';
import { assoc, uniq } from 'ramda';
import { Reducer } from 'redux';
import { isType } from 'typescript-fsa';
import { onError, onStart } from '../store.helpers';
import { getBackupsActions } from './backups.actions';

export interface State {
  lastUpdated: number;
  backups: Record<string, Linode.LinodeBackupsResponse>;
  linodeIDs: number[];
  error?: Linode.ApiFieldError[];
}

export const defaultState: State = {
  lastUpdated: 0,
  backups: {},
  linodeIDs: [],
  error: undefined
};

const reducer: Reducer<State> = (state = defaultState, action) => {
  /*
   * Get backup
   */
  if (isType(action, getBackupsActions.done)) {
    const { result, params } = action.payload;
    const updatedBackups = assoc(
      String(params.linodeID),
      result,
      state.backups
    );
    const updatedIDs = uniq([...state.linodeIDs, params.linodeID]);
    return Object.assign({}, state, {
      lastUpdated: moment()
        .utc()
        .valueOf(),
      backups: updatedBackups,
      linodeIDs: updatedIDs,
      error: undefined
    });
  }

  if (isType(action, getBackupsActions.started)) {
    return onStart(state);
  }

  if (isType(action, getBackupsActions.failed)) {
    const { error } = action.payload;
    return onError(error, state);
  }

  return state;
};

export default reducer;
