"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import DesktopFilters from "./DesktopFilters";
import ProductGrid from "@/components/ProductGrid";
import ProductSkeletonGrid from "@/components/skeletons/ProductSkeleton";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import MobileFilters from "./MobileFilters";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function ProductsClient({ products, categories }: any) {
  // -----------------------------
  // ESTADOS
  // -----------------------------
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedStock, setSelectedStock] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [filterDiscount, setFilterDiscount] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // ⚠️ Si esto es uniformes, después lo cambiamos por "Colegios / Línea / Marca"
  const brands = ["Nike", "Adidas", "Vans", "Jordan"];

  // Loader
  const [isLoading, setIsLoading] = useState(false);

  // -----------------------------
  // TOGGLES
  // -----------------------------
  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const toggleStock = (value: string) => {
    setSelectedStock((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  // -----------------------------
  // LOADER cuando cambian filtros
  // -----------------------------
  useEffect(() => {
    setIsLoading(true);
    const t = setTimeout(() => setIsLoading(false), 250);
    return () => clearTimeout(t);
  }, [
    selectedCategories,
    priceRange,
    searchQuery,
    sortOption,
    selectedSizes,
    selectedColors,
    selectedStock,
    selectedBrands,
    filterDiscount,
  ]);

  // -----------------------------
  // FILTRADO
  // -----------------------------
  const filtered = useMemo(() => {
    let result = [...products];

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category_id));
    }

    result = result.filter((p) => {
      const price = p.price || 0;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }

    if (selectedSizes.length > 0) {
      result = result.filter((p) =>
        p.sizes?.some((size: string) => selectedSizes.includes(size))
      );
    }

    if (selectedColors.length > 0) {
      result = result.filter((p) =>
        p.colors?.some((color: string) => selectedColors.includes(color))
      );
    }

    if (selectedStock.length > 0) {
      result = result.filter((p) => {
        if (selectedStock.includes("out_stock") && p.stock === 0) return true;
        if (selectedStock.includes("in_stock") && p.stock > 0) return true;
        if (selectedStock.includes("low_stock") && p.stock <= 5 && p.stock > 0)
          return true;
        return false;
      });
    }

    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }

    if (filterDiscount) {
      result = result.filter((p) => p.discount_price !== null);
    }

    switch (sortOption) {
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "discount-desc":
        result.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
    }

    return result;
  }, [
    products,
    selectedCategories,
    priceRange,
    searchQuery,
    sortOption,
    selectedSizes,
    selectedColors,
    selectedStock,
    selectedBrands,
    filterDiscount,
  ]);

  // -----------------------------
  // PAGINACIÓN
  // -----------------------------
  const productsPerPage = 9;
  const totalPages = Math.ceil(filtered.length / productsPerPage);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * productsPerPage;
    return filtered.slice(start, start + productsPerPage);
  }, [filtered, currentPage]);

  // -----------------------------
  // OTROS
  // -----------------------------
  const toggleCategory = useCallback((id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
    setCurrentPage(1);
  }, []);

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedStock([]);
    setSelectedBrands([]);
    setFilterDiscount(false);
    setPriceRange([0, 200000]);
    setSearchQuery("");
    setSortOption("newest");
    setCurrentPage(1);
  };

  const getCategoryNameById = (id: string): string => {
    const found = categories.find((c: any) => c.id === id);
    return found?.name ?? "Sin categoría";
  };

  // -----------------------------
  // RENDER
  // -----------------------------
  return (
    <main className="bg-gradient-to-b from-[#F7F8FA] to-[#EFF2F6] min-h-screen py-10 md:py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header de página (sobrio) */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#0B1220]">
            Catálogo
          </h1>
          <p className="mt-1 text-sm md:text-base text-[#0B1220]/60">
            Filtrá por categoría, talle, color y stock para encontrar el uniforme ideal.
          </p>
        </div>

        {/* MOBILE FILTER BUTTON */}
        <div className="flex justify-between items-center mb-4 md:hidden">
          <Sheet open={isMobileFiltersOpen} onOpenChange={setIsMobileFiltersOpen}>
            <SheetTrigger asChild>
              <DialogTitle>
                <Button
                  variant="outline"
                  className="
                    md:hidden
                    h-10 rounded-xl
                    border-[#0B1220]/15 bg-white/70
                    text-[#0B1220]
                    hover:bg-white
                    shadow-sm
                  "
                  onClick={() => setIsMobileFiltersOpen(true)}
                >
                  Filtros
                </Button>
              </DialogTitle>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="w-[88%] sm:w-[360px] bg-white border-r border-[#0B1220]/10"
            >
              <MobileFilters
                categories={categories}
                selectedCategories={selectedCategories}
                toggleCategory={toggleCategory}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedSizes={selectedSizes}
                toggleSize={toggleSize}
                selectedColors={selectedColors}
                toggleColor={toggleColor}
                selectedStock={selectedStock}
                toggleStock={toggleStock}
                selectedBrands={selectedBrands}
                toggleBrand={toggleBrand}
                filterDiscount={filterDiscount}
                setFilterDiscount={setFilterDiscount}
                brands={brands}
                clearFilters={clearFilters}
                onClose={() => setIsMobileFiltersOpen(false)}
              />
            </SheetContent>
          </Sheet>

          <Button
            variant="ghost"
            className="h-10 px-3 rounded-xl text-[#0B1220]/70 hover:text-[#0B1220] hover:bg-[#0B1220]/5"
            onClick={clearFilters}
          >
            Limpiar
          </Button>
        </div>

        {/* LAYOUT */}
        <div className="flex gap-8">
          {/* DESKTOP FILTERS */}
          <div className="hidden md:block w-72">
            <div className="sticky top-24">
              <div className="rounded-2xl border border-[#0B1220]/10 bg-white/70 backdrop-blur p-4 shadow-sm">
                <DesktopFilters
                  categories={categories}
                  selectedCategories={selectedCategories}
                  toggleCategory={toggleCategory}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  clearFilters={clearFilters}
                  selectedSizes={selectedSizes}
                  selectedColors={selectedColors}
                  selectedStock={selectedStock}
                  selectedBrands={selectedBrands}
                  filterDiscount={filterDiscount}
                  toggleSize={toggleSize}
                  toggleColor={toggleColor}
                  toggleStock={toggleStock}
                  toggleBrand={toggleBrand}
                  setFilterDiscount={setFilterDiscount}
                  brands={brands}
                />
              </div>
            </div>
          </div>

          {/* PRODUCT GRID + LOADER */}
          <div className="flex-1">
            {/* Panel superior (orden + estado) */}
            <div className="mb-4 rounded-2xl border border-[#0B1220]/10 bg-white/70 backdrop-blur px-4 py-3 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="text-sm text-[#0B1220]/70">
                  Mostrando <span className="font-medium text-[#0B1220]">{filtered.length}</span> resultados
                </div>

                {/* Nota: el select real lo maneja ProductGrid; esto es solo contenedor visual */}
                <div className="text-xs text-[#0B1220]/55">
                  Orden actual: <span className="font-medium text-[#0B1220]/75">{sortOption}</span>
                </div>
              </div>
            </div>

            {isLoading ? (
              <ProductSkeletonGrid />
            ) : (
              <ProductGrid
                products={paginated}
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                categories={categories}
                selectedCategories={selectedCategories}
                searchQuery={searchQuery}
                toggleCategory={toggleCategory}
                clearFilters={clearFilters}
                sortOption={sortOption}
                setSortOption={setSortOption}
                getCategoryNameById={getCategoryNameById}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}