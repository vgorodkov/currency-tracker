import Observable from '../observable';

describe('Observable', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should notify subs when data is emitted', () => {
    const firstMockSub = jest.fn();
    const secondMockSub = jest.fn();
    const mockData = '123123123123';

    Observable.subscribe(firstMockSub);
    Observable.subscribe(secondMockSub);
    Observable.notify(mockData);

    expect(firstMockSub).toHaveBeenCalledWith(mockData);
    expect(secondMockSub).toHaveBeenCalledWith(mockData);
  });

  test('should unsubscribe sub when unsubscribe method is called', () => {
    const mockSub = jest.fn();
    const mockData = '123123123';

    Observable.subscribe(mockSub);

    Observable.unsubscribe(mockSub);

    Observable.notify(mockData);

    expect(mockSub).not.toHaveBeenCalled();
  });
});
