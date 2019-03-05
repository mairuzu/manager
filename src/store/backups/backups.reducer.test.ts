import { getBackupsActions } from './backups.actions';
import reducer, { defaultState } from './backups.reducer';

const { started } = getBackupsActions;

describe('Backups reducer', () => {
  it('should handle a started action', () => {
    expect(reducer(defaultState, started)).toHaveProperty('loading', true);
  });
});
