"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  getCategoryNameById: (id: string) => string;
}

export function ProductCard({ product, getCategoryNameById }: ProductCardProps) {
  const isOutOfStock = product.stock === 0;
  const isLowStock =
    product.stock !== undefined && product.stock! <= 5 && product.stock! > 0;

  return (
    <Link
      href={`/producto/${product.id}`}
      className="group block transition-all duration-300 hover:-translate-y-1"
    >
      <Card
        className="
          h-full overflow-hidden rounded-2xl
          border border-[#0B1220]/10 bg-white
          shadow-sm
          transition-all duration-300
          hover:shadow-[0_18px_50px_rgba(11,18,32,0.12)]
        "
      >
        {/* Imagen */}
        <div className="aspect-square relative overflow-hidden bg-[#F3F6FA]">
          {product.images?.length ? (
            <Image
              src={product.images[0]}
              alt={product.title || "Producto"}
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <span className="text-[#0B1220]/55 text-sm">Sin imagen</span>
            </div>
          )}

          {/* Etiquetas */}
          {isLowStock && !isOutOfStock && (
            <Badge
              className="
                absolute top-3 right-3
                bg-[#0B2A5B] text-white
                shadow-sm
                py-1 px-2 text-xs rounded-full
              "
            >
              Últimas unidades
            </Badge>
          )}

          {isOutOfStock && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px] flex items-center justify-center">
              <Badge
                variant="outline"
                className="
                  text-sm font-medium
                  border-[#0B1220]/20 text-[#0B1220]
                  bg-white/70
                  px-4 py-1 rounded-full
                "
              >
                Agotado
              </Badge>
            </div>
          )}
        </div>

        {/* Info */}
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-start gap-3">
            <h3 className="text-base md:text-[15px] font-semibold tracking-tight text-[#0B1220] line-clamp-2">
              {product.title}
            </h3>

            <span className="font-semibold text-[15px] text-[#0B1220] whitespace-nowrap">
              ${product.price?.toLocaleString("es-AR") ?? 0}
            </span>
          </div>
        </CardHeader>

        <CardContent className="px-4 py-0 pb-3">
          {product.description && (
            <p className="text-sm text-[#0B1220]/60 line-clamp-2 mb-2">
              {product.description}
            </p>
          )}

          {/* Categoría */}
          <Badge
            variant="secondary"
            className="
              bg-[#0B1220]/5 text-[#0B1220]/80
              hover:bg-[#0B1220]/10
              rounded-full
            "
          >
            {getCategoryNameById(product.category_id)}
          </Badge>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex flex-col items-start gap-3">
          {/* Talles */}
          {product.sizes?.length! > 0 && (
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-xs text-[#0B1220]/55">Talles:</span>
              {product.sizes?.map((size) => (
                <Badge
                  key={size}
                  variant="outline"
                  className="
                    text-xs
                    border-[#0B1220]/15 text-[#0B1220]/80
                    rounded-full
                  "
                >
                  {size}
                </Badge>
              ))}
            </div>
          )}

          {/* Colores */}
          {product.colors?.length! > 0 && (
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-xs text-[#0B1220]/55">Colores:</span>
              {product.colors?.map((color) => (
                <Badge
                  key={color}
                  variant="outline"
                  className="
                    text-xs
                    border-[#0B1220]/15 text-[#0B1220]/80
                    rounded-full
                  "
                >
                  {color}
                </Badge>
              ))}
            </div>
          )}

          {/* Stock bar */}
          {product.stock !== undefined && (
            <div className="w-full">
              <div className="flex justify-between items-center text-xs text-[#0B1220]/55">
                <span>Disponibilidad</span>
                <span className="font-medium text-[#0B1220]/75">
                  {isOutOfStock ? "Sin stock" : `${product.stock} en stock`}
                </span>
              </div>

              <div className="w-full bg-[#0B1220]/10 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className={[
                    "h-full rounded-full transition-all duration-300",
                    isOutOfStock
                      ? "bg-[#0B1220]/25 w-0"
                      : isLowStock
                      ? "bg-[#0B2A5B] w-1/4"
                      : "bg-[#0B2A5B] w-full",
                  ].join(" ")}
                />
              </div>
            </div>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}