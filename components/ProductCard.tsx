import React from 'react';
import { Truck, ShoppingCart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  cartCount: number;
  notifCount: number;
  setCartCount: (cartCount: number) => void;
  setNotifCount: (numNotif: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, cartCount, notifCount, setCartCount, setNotifCount }) => {
  return (
    <div className="group bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-brand-200 transition-all duration-300 flex flex-col h-full overflow-hidden">
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-brand-900 shadow-sm border border-slate-100">
          {product.drying}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="mb-3">
             <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-700 transition-colors line-clamp-2">
                {product.title}
            </h3>
            <div className="text-xs text-slate-500 flex items-center gap-1 mt-1 font-medium">
                Ref: SKU-{product.id.padStart(4, '0')}
            </div>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-1 gap-y-2 mb-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
            <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Épaisseur</span>
                <span className="font-semibold text-slate-800">{product.thickness}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Longueurs</span>
                <span className="font-semibold text-slate-800 text-right">{product.lengths}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Qualité</span>
                <span className="font-semibold text-slate-800">{product.quality.split(' ')[0]}</span>
            </div>
          </div>

          {/* Seller Info */}
          <div className="flex items-center justify-between mb-4 text-xs">
            <div className="flex items-center gap-1.5 text-slate-600">
                <Truck className="w-3.5 h-3.5" />
                <span>Vendu par : <span className="font-medium text-slate-900 underline decoration-slate-300 underline-offset-2 hover:text-brand-700 hover:decoration-brand-300 transition-colors cursor-pointer">{product.seller}</span></span>
            </div>
          </div>
        </div>
        
        {/* Footer: Stock & Price & CTA */}
        <div className="mt-auto border-t border-slate-100 pt-4">
            <div className="flex items-center gap-1.5 mb-3">
                <div className={`w-2 h-2 rounded-full ${product.stock > 20 ? 'bg-emerald-500' : 'bg-orange-500'}`}></div>
                <span className={`text-xs font-medium ${product.stock > 20 ? 'text-emerald-700' : 'text-orange-700'}`}>
                    Stock : {product.stock > 50 ? '> 50' : product.stock} m³ dispo
                </span>
            </div>

            <div className="flex items-end justify-between gap-4">
                <div>
                    <span className="block text-2xl font-bold text-slate-900 tracking-tight leading-none">
                        {product.pricePerM3} {product.currency}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">HT / m³</span>
                </div>
                <button onClick={() => {
                  setCartCount(cartCount + product.pricePerM3);
                  setNotifCount(notifCount + 1);
                }} className="flex-1 bg-brand-600 hover:bg-brand-700 text-white py-2.5 px-4 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2 shadow-sm hover:shadow-md active:scale-95 duration-150">
                    <ShoppingCart className="w-4 h-4" />
                    Ajouter
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};