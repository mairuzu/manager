<<<<<<< HEAD
import { Reducer } from "redux";
import { ThunkAction } from "redux-thunk";
import { getImages } from "src/services/images";
import { getAll } from "src/utilities/getAll";
import actionCreatorFactory, { isType } from 'typescript-fsa';



=======
import { pathOr } from 'ramda';
import { Dispatch, Reducer } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { getImage, getImages } from 'src/services/images';
import { getAll } from 'src/utilities/getAll';
import actionCreatorFactory, { isType } from 'typescript-fsa';

>>>>>>> Images cache in Redux
/**
 * State
 */
type State = ApplicationState['__resources']['images'];

export const defaultState: State = {
<<<<<<< HEAD
  entities: [],
  results: [],
  error: undefined,
  loading: true,
  lastUpdated: 0,
};



/**
 * Actions
 */
const actionCreator = actionCreatorFactory(`@@manager/images`);

const getImagesRequest = actionCreator(`request`)

const getImagesSuccess = actionCreator<Linode.Image[]>(`success`)

const getImagesFailure = actionCreator<Linode.ApiFieldError[]>(`fail`)

export const actions = {};


=======
  results: [],
  entities: [],
  loading: true,
  lastUpdated: 0,
  error: undefined,
};

/**
 * Actions
 */
export const actionCreator = actionCreatorFactory(`@@manager/images`);

const getImagesRequest = actionCreator('request');

const getImagesSuccess = actionCreator<Linode.Image[]>('success');

const getImagesFailure = actionCreator<Linode.ApiFieldError[]>('fail');

const addImage = actionCreator<Linode.Image>('add');

const updateImage = actionCreator<Linode.Image>('update');

const deleteImage = actionCreator<string>('delete');

export const actions = { addImage, updateImage, deleteImage, };
>>>>>>> Images cache in Redux

/**
 * Reducer
 */
const reducer: Reducer<State> = (state = defaultState, action) => {
<<<<<<< HEAD

=======
>>>>>>> Images cache in Redux
  if (isType(action, getImagesRequest)) {
    return {
      ...state,
      loading: true,
    };
  }

  if (isType(action, getImagesSuccess)) {
    const { payload } = action;
<<<<<<< HEAD

    return {
      ...state,
      loading: false,
      lastUpdated: Date.now(),
      entities: payload,
      results: payload.map(t => t.id)
=======
    return {
      ...state,
      entities: entitiesFromPayload(payload),
      results: resultsFromPayload(payload),
      lastUpdated: Date.now(),
      loading: false,
>>>>>>> Images cache in Redux
    };
  }

  if (isType(action, getImagesFailure)) {
    const { payload } = action;
<<<<<<< HEAD

    return {
      ...state,
      loading: false,
      error: payload,
    };
  }

  return state;
};


=======
    return {
      ...state,
      error: payload,
      loading: false,
    };
  }

  if (isType(action, updateImage)) {
    const { payload } = action;
    return {
      ...state,
      entities: state.entities.map((image) => image.id === payload.id ? payload : image),
    }
  }

  if (isType(action, deleteImage)) {
    const { payload } = action;
    const { entities, results } = state;

    return {
      ...state,
      entities: entities.filter((image) => image.id !== payload),
      results: results.filter((id) => id !== payload),
    }
  }

  if (isType(action, addImage)) {
    const { payload } = action;
    const { entities, results } = state;
    return {
      ...state,
      entities: [...entities, payload],
      results: [...results, payload.id],
    }
  }

  return state
};

export default reducer;
>>>>>>> Images cache in Redux

/**
 * Async
 */
<<<<<<< HEAD
const requestImages = (): ThunkAction<Promise<Linode.Image[]>, State, undefined> => (dispatch) => {
  const getAllImages = getAll<Linode.Image>(getImages);

  return getAllImages()
    .then(({ data }) => {
      dispatch(getImagesSuccess(data))
      return data;
    })
    .catch((err) => {
      dispatch(getImagesFailure(err))
      return err;
    })
};

export const async = { requestImages };

export default reducer;
=======
const requestImages = () => (dispatch: Dispatch<State>) => {

  dispatch(getImagesRequest());

  return getAll<Linode.Image>(getImages)()
    .then((images) => {
      dispatch(getImagesSuccess(images.data));
      return images;
    })
    .catch((err) => {
      const defaultError = [{ reason: 'An unexpected error has occurred.' }];
      const errors = pathOr(defaultError, ['response', 'data', 'errors'], err);
      dispatch(getImagesFailure(errors));
    });
};

type RequestimageForStoreThunk = (id: string) => ThunkAction<void, ApplicationState, undefined>;
const requestImageForStore: RequestimageForStoreThunk = (id) => (dispatch, getState) => {
  const { results } = getState().__resources.images;

  getImage(id)
    .then(response => response)
    .then(image => {
      if (results.includes(id)) {
        return dispatch(updateImage(image));
      }
      return dispatch(addImage(image))
    })

};

export const async = { requestImages, requestImageForStore }

/**
 * Helpers
 */
const entitiesFromPayload = (images: Linode.Image[]) => {
  /** transform as necessary */
  return images.map(i => i);
}

const resultsFromPayload = (images: Linode.Image[]) => {
  return images.map(l => l.id);
}

export const helpers = {};
>>>>>>> Images cache in Redux
