import { useState, useMemo } from 'react';

export interface Product {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  images: string[];
  description: string;
  specs: Record<string, string>;
  stock: number;
  features: string[];
}

export type SortOption = 'price-asc' | 'price-desc' | 'popular' | 'rating' | 'newest';

export interface Filters {
  priceRange: [number, number];
  categories: string[];
  brands: string[];
  minRating: number;
}

export function useFilters(products: Product[]) {
  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 10000],
    categories: [],
    brands: [],
    minRating: 0,
  });

  const [sortBy, setSortBy] = useState<SortOption>('newest');

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Aplicar filtros
    result = result.filter((product) => {
      const priceMatch =
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1];

      const categoryMatch =
        filters.categories.length === 0 ||
        filters.categories.includes(product.category);

      const brandMatch =
        filters.brands.length === 0 || filters.brands.includes(product.brand);

      const ratingMatch = product.rating >= filters.minRating;

      return priceMatch && categoryMatch && brandMatch && ratingMatch;
    });

    // Aplicar ordenação
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // Mantém ordem original (assume que está em ordem de adição)
        break;
    }

    return result;
  }, [products, filters, sortBy]);

  const updatePriceRange = (range: [number, number]) => {
    setFilters((prev) => ({ ...prev, priceRange: range }));
  };

  const toggleCategory = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const toggleBrand = (brand: string) => {
    setFilters((prev) => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand],
    }));
  };

  const setMinRating = (rating: number) => {
    setFilters((prev) => ({ ...prev, minRating: rating }));
  };

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 10000],
      categories: [],
      brands: [],
      minRating: 0,
    });
  };

  const getUniqueCategories = () => {
    return Array.from(new Set(products.map((p) => p.category)));
  };

  const getUniqueBrands = () => {
    return Array.from(new Set(products.map((p) => p.brand)));
  };

  return {
    filters,
    sortBy,
    setSortBy,
    filteredAndSortedProducts,
    updatePriceRange,
    toggleCategory,
    toggleBrand,
    setMinRating,
    clearFilters,
    getUniqueCategories,
    getUniqueBrands,
  };
}
