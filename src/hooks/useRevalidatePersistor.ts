import { useEffect } from 'react';

import { persistor } from '@/store';

export const useRevalidatePersistor = () => {
  useEffect(() => {
    try {
      persistor.purge();
    } catch {
      throw new Error('persistor purge error');
    }
  }, []);
};
