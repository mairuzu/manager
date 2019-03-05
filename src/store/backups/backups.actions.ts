import { actionCreatorFactory } from 'typescript-fsa';

const actionCreator = actionCreatorFactory(`@@manager/linodeBackups`);

export interface BackupID {
  linodeID: number;
}
export interface BackupResponse extends Linode.LinodeBackupsResponse {
  linodeID: number;
}

export const getBackupsActions = actionCreator.async<
  BackupID,
  Linode.LinodeBackupsResponse,
  Linode.ApiFieldError[]
>(`getBackupsForLinode`);
