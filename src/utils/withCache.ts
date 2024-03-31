type FetchFunction<T> = () => Promise<{ data: T }>;

export const withCache = async <T>(func: FetchFunction<T>, cacheKey: string): Promise<T> => {
  try {
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    const response = await func();
    localStorage.setItem(cacheKey, JSON.stringify(response.data));
    return response.data;
  } catch (err) {
    throw new Error('Error while fetching data in withCache');
  }
};
