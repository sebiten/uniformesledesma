"use client";

import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { SlidersHorizontal, Search, X } from "lucide-react";

type Props = {
  categories: any[];
  selectedCategories: string[];
  toggleCategory: (id: string) => void;

  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;

  searchQuery: string;
  setSearchQuery: (v: string) => void;

  clearFilters: () => void;

  selectedSizes: string[];
  toggleSize: (size: string) => void;

  selectedColors: string[];
  toggleColor: (color: string) => void;

  selectedStock: string[];
  toggleStock: (v: string) => void;

  selectedBrands: string[];
  toggleBrand: (brand: string) => void;

  filterDiscount: boolean;
  setFilterDiscount: (v: boolean) => void;

  brands: string[];
};

function DesktopFilters({
  categories,
  selectedCategories,
  toggleCategory,
  priceRange,
  setPriceRange,
  searchQuery,
  setSearchQuery,
  clearFilters,

  selectedSizes,
  toggleSize,

  selectedColors,
  toggleColor,

  selectedStock,
  toggleStock,

  selectedBrands,
  toggleBrand,

  filterDiscount,
  setFilterDiscount,

  brands,
}: Props) {
  const showClear =
    selectedCategories.length > 0 ||
    searchQuery ||
    selectedSizes.length > 0 ||
    selectedColors.length > 0 ||
    selectedStock.length > 0 ||
    selectedBrands.length > 0 ||
    filterDiscount;

  return (
    <div
      className="
        bg-white/70 backdrop-blur
        rounded-2xl border border-[#0B1220]/10
        shadow-sm p-4 sticky top-24
      "
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold tracking-tight text-[#0B1220] flex items-center">
          <SlidersHorizontal className="w-4 h-4 mr-2 text-[#0B2A5B]" />
          Filtros
        </h2>

        {showClear && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-8 px-2 rounded-xl text-[#0B1220]/70 hover:text-[#0B1220] hover:bg-[#0B1220]/5"
          >
            Limpiar
          </Button>
        )}
      </div>

      {/* BUSCADOR */}
      <div className="relative mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0B1220]/45" />
        <Input
          placeholder="Buscar en el catálogo..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="
            pl-9 pr-9 h-10 rounded-xl
            bg-white border-[#0B1220]/15
            focus-visible:ring-0 focus-visible:ring-offset-0
            focus:border-[#0B2A5B]/40
          "
        />
        {searchQuery && (
          <button
            className="
              absolute right-2 top-1/2 -translate-y-1/2
              p-1 rounded-md
              text-[#0B1220]/55 hover:text-[#0B1220]
              hover:bg-[#0B1220]/5
            "
            onClick={() => setSearchQuery("")}
            aria-label="Borrar búsqueda"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* TALLES */}
      <Accordion type="single" collapsible defaultValue="sizes">
        <AccordionItem value="sizes" className="border-b border-[#0B1220]/10">
          <AccordionTrigger className="py-2 text-sm font-semibold text-[#0B1220] hover:no-underline">
            Talles
          </AccordionTrigger>

          <AccordionContent>
            <div className="space-y-4 pt-2">
              {/* ---- ROPA ---- */}
              <div>
                <p className="text-xs font-medium text-[#0B1220]/55 mb-2">
                  Ropa
                </p>
                <div className="flex flex-wrap gap-2">
                  {["XS", "S", "M", "L", "XL", "XXL"].map((size) => {
                    const active = selectedSizes.includes(size);
                    return (
                      <Badge
                        key={size}
                        variant={active ? "default" : "outline"}
                        className={[
                          "cursor-pointer rounded-full text-xs px-3 py-1 transition",
                          active
                            ? "bg-[#0B2A5B] text-white hover:bg-[#0A244D] border-transparent"
                            : "border-[#0B1220]/15 text-[#0B1220]/75 hover:bg-[#0B1220]/5",
                        ].join(" ")}
                        onClick={() => toggleSize(size)}
                      >
                        {size}
                      </Badge>
                    );
                  })}
                </div>
              </div>

              {/* ---- CALZADO (si aplica) ---- */}
              <div>
                <p className="text-xs font-medium text-[#0B1220]/55 mb-2">
                  Calzado
                </p>
                <div className="flex flex-wrap gap-2">
                  {["35", "36", "37", "38", "39", "40", "41", "42", "43", "44"].map(
                    (size) => {
                      const active = selectedSizes.includes(size);
                      return (
                        <Badge
                          key={size}
                          variant={active ? "default" : "outline"}
                          className={[
                            "cursor-pointer rounded-full text-xs px-3 py-1 transition",
                            active
                              ? "bg-[#0B2A5B] text-white hover:bg-[#0A244D] border-transparent"
                              : "border-[#0B1220]/15 text-[#0B1220]/75 hover:bg-[#0B1220]/5",
                          ].join(" ")}
                          onClick={() => toggleSize(size)}
                        >
                          {size}
                        </Badge>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* COLORES */}
      <Accordion type="single" collapsible defaultValue="colors">
        <AccordionItem value="colors" className="border-b border-[#0B1220]/10">
          <AccordionTrigger className="py-2 text-sm font-semibold text-[#0B1220] hover:no-underline">
            Colores
          </AccordionTrigger>

          <AccordionContent>
            <div className="flex flex-wrap gap-2 pt-2">
              {["Negro", "Blanco", "Azul", "Gris", "Bordo"].map((color) => {
                const active = selectedColors.includes(color);
                return (
                  <Badge
                    key={color}
                    variant={active ? "default" : "outline"}
                    className={[
                      "cursor-pointer rounded-full text-xs px-3 py-1 transition",
                      active
                        ? "bg-[#0B2A5B] text-white hover:bg-[#0A244D] border-transparent"
                        : "border-[#0B1220]/15 text-[#0B1220]/75 hover:bg-[#0B1220]/5",
                    ].join(" ")}
                    onClick={() => toggleColor(color)}
                  >
                    {color}
                  </Badge>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* PRECIO */}
      <Accordion type="single" collapsible defaultValue="price">
        <AccordionItem value="price" className="border-b border-[#0B1220]/10">
          <AccordionTrigger className="py-2 text-sm font-semibold text-[#0B1220] hover:no-underline">
            Precio
          </AccordionTrigger>

          <AccordionContent>
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs text-[#0B1220]/55">
                <span>${priceRange[0].toLocaleString("es-AR")}</span>
                <span>${priceRange[1].toLocaleString("es-AR")}</span>
              </div>

              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={priceRange[0]}
                  min={0}
                  max={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([Number(e.target.value), priceRange[1]])
                  }
                  className="
                    h-10 rounded-xl
                    border-[#0B1220]/15 bg-white
                    focus-visible:ring-0 focus-visible:ring-offset-0
                    focus:border-[#0B2A5B]/40
                  "
                />

                <span className="text-[#0B1220]/40">–</span>

                <Input
                  type="number"
                  value={priceRange[1]}
                  min={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], Number(e.target.value)])
                  }
                  className="
                    h-10 rounded-xl
                    border-[#0B1220]/15 bg-white
                    focus-visible:ring-0 focus-visible:ring-offset-0
                    focus:border-[#0B2A5B]/40
                  "
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* CATEGORÍAS */}
      <Accordion type="single" collapsible defaultValue="cat">
        <AccordionItem value="cat" className="border-b-0">
          <AccordionTrigger className="py-2 text-sm font-semibold text-[#0B1220] hover:no-underline">
            Categorías
          </AccordionTrigger>

          <AccordionContent>
            <div className="pt-2 space-y-2">
              {categories.map((cat) => (
                <label
                  key={cat.id}
                  className="
                    flex items-center gap-2 cursor-pointer
                    rounded-xl px-2 py-1
                    hover:bg-[#0B1220]/5 transition
                  "
                >
                  <Checkbox
                    checked={selectedCategories.includes(cat.id)}
                    onCheckedChange={() => toggleCategory(cat.id)}
                    className="border-[#0B1220]/20 data-[state=checked]:bg-[#0B2A5B] data-[state=checked]:border-[#0B2A5B]"
                  />
                  <span className="text-sm text-[#0B1220]/80">{cat.name}</span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default memo(DesktopFilters);