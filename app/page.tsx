"use client";

import {useState, useMemo} from 'react';
import { useGroceryStore } from '@/features/store/useGroceryStore';
import ProductCard from '@/components/ProductCard';
import SearchFilterSort from '@/components/SearchFilterSort';
export default function Home() {

  const products = useGroceryStore((state) => state.products);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('none');

  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category)));
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === 'All' || p.category === category;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortOrder === 'lowToHigh') return a.price - b.price;
        if (sortOrder === 'highToLow') return b.price - a.price;
        return 0;
      });
  }, [products, search, category, sortOrder]);
  return (
    <>
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SearchFilterSort
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        categories={categories}
      />

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No items found matching your filter criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
    </>
  );
}
