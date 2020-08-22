import rootReducer from '../reducers';

describe('root reducer', () => {
  it('should combine all reducers', () => {
    expect(rootReducer({}, { type: '@@INIT' })).toEqual({
      selectedPath: 'myDay',
    });
  });
});
