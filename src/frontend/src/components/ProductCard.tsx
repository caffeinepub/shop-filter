import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import type { Product } from '../backend';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  // Map categories to generated images
  const getCategoryImage = (category: string) => {
    const categoryMap: Record<string, string> = {
      'Electronics': '/assets/generated/product-electronics.dim_400x400.png',
      'Fashion': '/assets/generated/product-clothing.dim_400x400.png',
      'Home Appliances': '/assets/generated/product-home.dim_400x400.png',
      'Sports': '/assets/generated/product-books.dim_400x400.png',
    };
    return categoryMap[category] || '/assets/generated/product-electronics.dim_400x400.png';
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={getCategoryImage(product.category)}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <CardTitle className="line-clamp-1 text-lg font-semibold">{product.name}</CardTitle>
          <Badge variant="secondary" className="shrink-0 text-xs">
            {product.category}
          </Badge>
        </div>
        <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
        <div className="flex items-center gap-1 text-sm text-amber-600 dark:text-amber-500">
          <Star className="h-4 w-4 fill-current" />
          <span className="font-medium">{product.rating.toFixed(1)}</span>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/30 p-4">
        <div className="flex w-full items-center justify-between">
          <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
