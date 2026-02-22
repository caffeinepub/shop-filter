import { useState, useEffect, useMemo } from 'react';
import { useGetAllProducts, useGetProductsByCategory, useGetProductsByPriceRange, useGetProductsByRating } from './useQueries';
import type { Product } from '../backend';

export interface FilterState {
  categories: string[];
  minPrice: number;
  maxPrice: number;
  minRating: number;
}

export function useProductFilters() {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    minPrice: 0,
    maxPrice: 10000,
    minRating: 0,
  });

  const allProductsQuery = useGetAllProducts();
  const categoryQuery = useGetProductsByCategory(filters.categories.length === 1 ? filters.categories[0] : null);
  const priceQuery = useGetProductsByPriceRange(filters.minPrice, filters.maxPrice);
  const ratingQuery = useGetProductsByRating(filters.minRating);

  // Determine which products to use based on active filters
  const filteredProducts = useMemo(() => {
    const hasFilters = filters.categories.length > 0 || filters.minPrice > 0 || filters.maxPrice < 10000 || filters.minRating > 0;
    
    if (!hasFilters) {
      return allProductsQuery.data || [];
    }

    // Start with all products
    let products = allProductsQuery.data || [];

    // Apply category filter
    if (filters.categories.length > 0) {
      products = products.filter(p => filters.categories.includes(p.category));
    }

    // Apply price filter
    products = products.filter(p => p.price >= filters.minPrice && p.price <= filters.maxPrice);

    // Apply rating filter
    if (filters.minRating > 0) {
      products = products.filter(p => p.rating >= filters.minRating);
    }

    return products;
  }, [allProductsQuery.data, filters, categoryQuery.data, priceQuery.data, ratingQuery.data]);

  const isLoading = allProductsQuery.isLoading;

  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters({
      categories: [],
      minPrice: 0,
      maxPrice: 10000,
      minRating: 0,
    });
  };

  // Extract unique categories from all products
  const availableCategories = useMemo(() => {
    const products = allProductsQuery.data || [];
    const categories = new Set(products.map(p => p.category));
    return Array.from(categories).sort();
  }, [allProductsQuery.data]);

  return {
    filters,
    updateFilters,
    resetFilters,
    filteredProducts,
    isLoading,
    availableCategories,
  };
}
