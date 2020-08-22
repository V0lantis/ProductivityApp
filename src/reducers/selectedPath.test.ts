import { togglePath } from '../actions/selectedPath';
import selectedPath from './selectedPath';

describe('path reducer', () => {
  it('should handle initial state', () => {
    expect(selectedPath(undefined, { type: '@@INIT' })).toEqual('myDay');
  });

  it('should handle togglePath', () => {
    expect(selectedPath(undefined, togglePath('test'))).toEqual('test');
  });
});
