import { FilterSidebar } from '../components/FilterSidebar';
import { ProductGrid } from '../components/ProductGrid';
import { useProductFilters } from '../hooks/useProductFilters';
import { ShoppingBag } from 'lucide-react';
import { SiX, SiFacebook, SiInstagram } from 'react-icons/si';

export function CatalogPage() {
  const { filters, updateFilters, resetFilters, filteredProducts, isLoading, availableCategories } = useProductFilters();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Shop Filter</span>
          </div>
          <nav className="hidden items-center gap-6 md:flex">
            <a href="#" className="text-sm font-medium transition-colors hover:text-primary">
              Products
            </a>
            <a href="#" className="text-sm font-medium transition-colors hover:text-primary">
              Categories
            </a>
            <a href="#" className="text-sm font-medium transition-colors hover:text-primary">
              About
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 py-12">
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Find Your Perfect Product
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
              Browse our curated collection and use smart filters to discover exactly what you need
            </p>
          </div>
          <div className="mx-auto mt-8 max-w-5xl overflow-hidden rounded-xl shadow-2xl">
            <img
              src="/assets/generated/hero-banner.dim_1200x400.png"
              alt="Shop Banner"
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar */}
          <div className="w-full lg:w-64 lg:shrink-0">
            <FilterSidebar
              filters={filters}
              availableCategories={availableCategories}
              onFilterChange={updateFilters}
              onReset={resetFilters}
            />
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
              </h2>
            </div>
            <ProductGrid products={filteredProducts} isLoading={isLoading} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-primary" />
                <span className="font-semibold">Shop Filter</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your one-stop shop for quality products across multiple categories.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="transition-colors hover:text-foreground">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-foreground">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-foreground">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold">Follow Us</h3>
              <div className="flex gap-4">
                <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                  <SiFacebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                  <SiX className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                  <SiInstagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} Shop Filter. Built with ❤️ using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.hostname : 'shop-filter'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline-offset-4 hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
