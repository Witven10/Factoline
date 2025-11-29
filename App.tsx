import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ProductCard } from './components/ProductCard';
import { MOCK_PRODUCTS, FILTERS } from './data';
import { ChevronRight, Home, SearchX } from 'lucide-react';
import { FilterCategory } from './types';

type SelectedFilters = Record<string, string[]>;

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [notifCount, setNotifCount] = useState(0);
  const [filters, setFilters] = useState<FilterCategory[]>(FILTERS);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    essence: ['oak'],
  });

  const handleFilterChange = (categoryId: string, optionId: string, checked: boolean) => {
    setSelectedFilters((prev) => {
      const newSelection = { ...prev };
      if (!newSelection[categoryId]) {
        newSelection[categoryId] = [];
      }
      if (checked) {
        newSelection[categoryId] = [...newSelection[categoryId], optionId];
      } else {
        newSelection[categoryId] = newSelection[categoryId].filter((id) => id !== optionId);
      }
      return newSelection;
    });
  };

  const clearFilters = () => {
    setSelectedFilters({});
  };

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    let products = MOCK_PRODUCTS;

    // Search Query Filter
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      products = products.filter((product) =>
        Object.values(product).some((value) =>
          String(value).toLowerCase().includes(lowerQuery)
        )
      );
    }

    // Checkbox Filters
    const activeFilterEntries = Object.entries(selectedFilters).filter(
      (entry): entry is [string, string[]] => Array.isArray(entry[1]) && entry[1].length > 0
    );

    if (activeFilterEntries.length > 0) {
      products = products.filter((product) => {
        return activeFilterEntries.every(([categoryId, selectedOptions]) => {
          return selectedOptions.some((optionId) => {
            switch (categoryId) {
              case 'essence':
                return product.essence === optionId;
              case 'type':
                return product.type === optionId;
              case 'thickness':
                return product.thickness.startsWith(optionId);
              case 'quality':
                return product.quality.toLowerCase().includes(optionId);
              case 'cert':
                return true; // No certification data in products
              default:
                return true;
            }
          });
        });
      });
    }

    return products;
  }, [searchQuery, selectedFilters]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-brand-100 selection:text-brand-900">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} notifCount={notifCount} cartCount={cartCount}  />

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb & Title Area */}
        <div className="mb-8">
            <nav className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                <Home className="w-4 h-4 hover:text-brand-700 cursor-pointer" />
                <ChevronRight className="w-4 h-4 text-slate-300" />
                <span className="hover:text-brand-700 cursor-pointer">Bois de construction</span>
                <ChevronRight className="w-4 h-4 text-slate-300" />
                <span className="font-medium text-slate-900">
                    {searchQuery ? 'Recherche' : 'Planches de chêne'}
                </span>
            </nav>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                        {searchQuery 
                            ? `Résultats pour "${searchQuery}"` 
                            : 'Tous les produits : Planches de chêne'}
                    </h1>
                    <p className="text-slate-500 mt-1">
                        {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} professionnel{filteredProducts.length > 1 ? 's' : ''} disponible{filteredProducts.length > 1 ? 's' : ''} en stock
                    </p>
                </div>
                
                <div className="flex items-center gap-2">
                     <span className="text-sm text-slate-600">Trier par :</span>
                     <select className="text-sm font-medium border-slate-300 rounded-md shadow-sm focus:border-brand-500 focus:ring-brand-500 bg-white py-2 pl-3 pr-8 cursor-pointer hover:border-slate-400 transition-colors text-slate-700">
                         <option>Pertinence</option>
                         <option>Prix croissant</option>
                         <option>Prix décroissant</option>
                         <option>Stock disponible</option>
                     </select>
                </div>
            </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Sidebar */}
          <div className="hidden lg:block">
            <Sidebar 
              filters={filters} 
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
            />
          </div>

          {/* Mobile Filter Toggle (Visible only on small screens) */}
          <div className="lg:hidden w-full mb-4">
              <button className="w-full bg-white border border-slate-300 py-3 px-4 rounded-lg font-medium text-slate-700 shadow-sm flex items-center justify-center gap-2 active:bg-slate-50">
                  <span>Afficher les filtres</span>
              </button>
          </div>

          {/* Product Grid */}
          <div className="flex-1 w-full">
            {filteredProducts.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} cartCount={cartCount} notifCount={notifCount} setCartCount={setCartCount} setNotifCount={setNotifCount}/>
                    ))}
                    </div>

                    {/* Pagination / Load More */}
                    <div className="mt-12 flex justify-center">
                        <nav className="flex items-center gap-1">
                            <button className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 transition-colors">Précédent</button>
                            <button className="px-4 py-2 bg-brand-600 border border-transparent rounded-lg text-sm font-medium text-white shadow-sm hover:bg-brand-700 transition-colors">1</button>
                            <button className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">2</button>
                            <button className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">3</button>
                            <span className="px-2 text-slate-400">...</span>
                            <button className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">Suivant</button>
                        </nav>
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-slate-200 border-dashed">
                    <div className="bg-slate-50 p-4 rounded-full mb-4">
                        <SearchX className="w-10 h-10 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">Aucun résultat trouvé</h3>
                    <p className="text-slate-500 text-sm mt-1 max-w-md text-center">
                        Nous n'avons trouvé aucun produit correspondant à "{searchQuery}". Essayez de vérifier l'orthographe ou d'utiliser des termes plus génériques.
                    </p>
                    <button 
                        onClick={() => setSearchQuery('')}
                        className="mt-6 text-brand-600 font-medium hover:underline text-sm"
                    >
                        Afficher tous les produits
                    </button>
                </div>
            )}
            
            {/* SEO Text Block - Hide on search to reduce noise */}
            {!searchQuery && (
                <div className="mt-16 bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-900 mb-3">Guide d'achat : Le Chêne pour les professionnels</h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        Le chêne est l'essence reine pour la menuiserie et l'ébénisterie. Sur Factoline, nous vous proposons exclusivement des bois issus de scieries françaises certifiées PEFC ou FSC. Que vous recherchiez du chêne avivé pour des parquets massifs, des plots pour de l'ameublement sur-mesure ou des poutres pour la restauration de charpente, notre réseau de partenaires garantit une hygrométrie contrôlée et des classements (QF1a, QF2...) respectant strictement les normes de l'industrie.
                    </p>
                </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
