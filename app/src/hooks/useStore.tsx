import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Store } from '@/types';
import { stores, getStoreById } from '@/config/stores';

interface StoreContextType {
  currentStore: Store;
  stores: Store[];
  setStore: (storeId: string) => void;
  isStoreSelectorOpen: boolean;
  setIsStoreSelectorOpen: (open: boolean) => void;
}

const defaultStore = stores[0];

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [currentStore, setCurrentStore] = useState<Store>(defaultStore);
  const [isStoreSelectorOpen, setIsStoreSelectorOpen] = useState(false);

  const setStore = useCallback((storeId: string) => {
    const store = getStoreById(storeId);
    if (store) {
      setCurrentStore(store);
    }
    setIsStoreSelectorOpen(false);
  }, []);

  return (
    <StoreContext.Provider
      value={{
        currentStore,
        stores,
        setStore,
        isStoreSelectorOpen,
        setIsStoreSelectorOpen,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
