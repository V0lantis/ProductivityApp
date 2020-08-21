import { AnyAction } from 'redux';
import { TOGGLE_PATH } from '../constants/actionTypes';

export default function selectedPath(
  state: string = 'myDay',
  action: AnyAction
) {
  switch (action.type) {
    case TOGGLE_PATH:
      return action.newSelectedPath;

    default:
      return state;
  }
}
