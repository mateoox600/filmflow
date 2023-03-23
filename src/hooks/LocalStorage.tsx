import { useEffect, useState } from 'react';

export function useLocalStorage<T>(storageKey: string, fallbackState: T): [ T, React.Dispatch<React.SetStateAction<T>> ] {
  const [value, setValue] = useState<T>(
    JSON.parse(localStorage.getItem(storageKey)) ?? fallbackState
  );

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [ value, storageKey ]);

  return [ value, setValue ];
};