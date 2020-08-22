import { TOGGLE_PATH } from '../constants/actionTypes';

export function togglePath(newSelectedPath: string) {
  return {
    type: TOGGLE_PATH,
    newSelectedPath,
  };
}
