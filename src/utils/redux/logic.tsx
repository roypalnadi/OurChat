import {store} from '../../redux/store';

export const getDataAccount = () => {
  return store.getState().account;
};
