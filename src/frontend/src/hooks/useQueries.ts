import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Product } from '../backend';

export function useGetAllProducts() {
  const { actor, isFetching } = useActor();

  return useQuery<Product[]>({
    queryKey: ['products', 'all'],
    queryFn: async () => {
      if (!actor) return [];
      // Get all products by fetching with a wide price range
      return actor.getProductsByPriceRange(0, 10000);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetProductsByCategory(category: string | null) {
  const { actor, isFetching } = useActor();

  return useQuery<Product[]>({
    queryKey: ['products', 'category', category],
    queryFn: async () => {
      if (!actor || !category) return [];
      return actor.getProductsByCategory(category);
    },
    enabled: !!actor && !isFetching && !!category,
  });
}

export function useGetProductsByPriceRange(minPrice: number, maxPrice: number) {
  const { actor, isFetching } = useActor();

  return useQuery<Product[]>({
    queryKey: ['products', 'price', minPrice, maxPrice],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProductsByPriceRange(minPrice, maxPrice);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetProductsByRating(minRating: number) {
  const { actor, isFetching } = useActor();

  return useQuery<Product[]>({
    queryKey: ['products', 'rating', minRating],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProductsByRating(minRating);
    },
    enabled: !!actor && !isFetching,
  });
}
