import { Check, Store } from 'lucide-react';
import { useStore } from '@/hooks/useStore';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export function StoreSelector() {
  const { stores, currentStore, setStore, isStoreSelectorOpen, setIsStoreSelectorOpen } = useStore();

  return (
    <Sheet open={isStoreSelectorOpen} onOpenChange={setIsStoreSelectorOpen}>
      <SheetTrigger asChild>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-300"
          aria-label="Select store"
        >
          <Store className="w-4 h-4" />
          <span className="text-sm font-medium hidden sm:inline">{currentStore.name}</span>
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: currentStore.primaryColor }}
          />
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl flex items-center gap-2">
            <Store className="w-6 h-6" />
            Select Store
          </SheetTitle>
        </SheetHeader>
        <div className="mt-8 space-y-4">
          <p className="text-gray-600 text-sm">
            Choose from our collection of unique fashion destinations. Each store offers a distinct style experience.
          </p>
          <div className="space-y-3">
            {stores.map((store) => (
              <button
                key={store.id}
                onClick={() => setStore(store.id)}
                className={`w-full p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                  currentStore.id === store.id
                    ? 'border-current bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                style={{
                  borderColor: currentStore.id === store.id ? store.primaryColor : undefined,
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${store.primaryColor}20` }}
                  >
                    <span
                      className="font-display text-2xl font-bold"
                      style={{ color: store.primaryColor }}
                    >
                      {store.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-lg font-bold">{store.name}</h3>
                      {currentStore.id === store.id && (
                        <Check
                          className="w-5 h-5"
                          style={{ color: store.primaryColor }}
                        />
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{store.tagline}</p>
                    <p className="text-xs text-gray-400 mt-2">{store.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function StoreBadge() {
  const { currentStore, setIsStoreSelectorOpen } = useStore();

  return (
    <button
      onClick={() => setIsStoreSelectorOpen(true)}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
    >
      <span
        className="w-2.5 h-2.5 rounded-full"
        style={{ backgroundColor: currentStore.primaryColor }}
      />
      <span className="text-xs font-medium">{currentStore.name}</span>
    </button>
  );
}
