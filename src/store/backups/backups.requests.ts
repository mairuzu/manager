import { getLinodeBackups } from 'src/services/linodes';
import { createRequestThunk } from 'src/store/store.helpers';

import { BackupID, getBackupsActions } from './backups.actions';

/**
 * Async
 */
export const requestBackupsForLinode = createRequestThunk<
  BackupID,
  Linode.LinodeBackupsResponse,
  Linode.ApiFieldError[]
>(getBackupsActions, ({ linodeID }) => getLinodeBackups(linodeID));
