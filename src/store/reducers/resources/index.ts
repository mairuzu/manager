import { combineReducers } from "redux";
import accountSettings, { DEFAULT_STATE as defaultAccountSettingsState } from './accountSettings';
import domains, { defaultState as defaultDomainsState } from './domains';
import images, { defaultState as defaultImagesState } from './images';
import linodes, { defaultState as defaultLinodesState } from './linodes';
import profile, { DEFAULT_STATE as defaultProfileState } from './profile';
import types, { defaultState as defaultTypesState } from './types';


export const defaultState = {
  accountSettings: defaultAccountSettingsState,
  profile: defaultProfileState,
  domains: defaultDomainsState,
  images: defaultImagesState,
  linodes: defaultLinodesState,
  types: defaultTypesState,
  images: defaultImagesState,
}

<<<<<<< HEAD
export default combineReducers({ accountSettings, profile, domains, linodes, types, images });
=======
export default combineReducers({ accountSettings, profile, domains, images, linodes, types });
>>>>>>> Images cache in Redux
