"use client"

import { useState, useEffect, useCallback, memo, useMemo } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Check, AlertCircle, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AddToCartButton } from "@/components/AddToCartButton"
import { createClient } from "@/utils/supabase/client"
import type { Product } from "@/lib/types"
import { useCartStore } from "@/app/store/cartStore"

// === Helpers para variants ===
function getProductColors(product: Product): string[] {
  if (product.variants && product.variants.length > 0) {
    return Array.from(new Set(product.variants.map((v: any) => v.color)))
  }
  return product.colors ?? []
}

function getProductSizes(product: Product): string[] {
  if (product.variants && product.variants.length > 0) {
    return Array.from(new Set(product.variants.map((v: any) => v.size)))
  }
  return product.sizes ?? []
}

function getVariantStock(product: Product, color: string, size: string): number {
  if (product.variants && product.variants.length > 0) {
    const variant = product.variants.find((v: any) => v.color === color && v.size === size)
    if (!variant) return 0
    return variant.stock ?? 0
  }
  return product.stock ?? 0
}

const ProductImageGallery = memo(
  ({
    images,
    title,
    activeImage,
    setActiveImage,
  }: {
    images: string[] | undefined
    title: string
    activeImage: number
    setActiveImage: (index: number) => void
  }) => (
    <div className="space-y-4">
      {/* Main image */}
      <div
        className="
          aspect-square relative rounded-3xl overflow-hidden
          bg-white border border-[#0B1220]/10
          shadow-[0_18px_50px_rgba(11,18,32,0.10)]
          group
        "
      >
        <Image
          key={activeImage}
          src={images?.[activeImage] || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />

        {/* subtle bottom fade for readability */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/10 to-transparent" />
      </div>

      {/* Thumbnails */}
      {images && images.length > 1 && (
        <div className="grid grid-cols-5 gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              className={[
                "aspect-square relative rounded-2xl overflow-hidden transition-all duration-200",
                "border border-[#0B1220]/10 bg-white",
                activeImage === index
                  ? "ring-2 ring-[#0B2A5B]/60 ring-offset-2 ring-offset-[#F7F8FA] shadow-sm scale-[1.03]"
                  : "hover:shadow-sm hover:scale-[1.03] hover:bg-[#0B1220]/5",
              ].join(" ")}
              onClick={() => setActiveImage(index)}
              aria-label={`Ver imagen ${index + 1}`}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${title} - Vista ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 60px, 80px"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  ),
)

ProductImageGallery.displayName = "ProductImageGallery"

const OptionSelector = memo(
  ({
    label,
    options,
    selectedOption,
    onChange,
  }: {
    label: string
    options: string[]
    selectedOption: string
    onChange: (option: string) => void
  }) => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[#0B1220] tracking-tight">{label}</h3>
        <span className="text-xs text-[#0B1220]/55">Seleccionado: {selectedOption}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = selectedOption === option
          return (
            <button
              key={option}
              className={[
                "px-4 py-2 rounded-full font-medium text-sm",
                "transition-all duration-200",
                active
                  ? "bg-[#0B2A5B] text-white shadow-sm"
                  : "bg-white text-[#0B1220]/80 border border-[#0B1220]/15 hover:bg-[#0B1220]/5",
              ].join(" ")}
              onClick={() => onChange(option)}
              aria-pressed={active}
            >
              {option}
            </button>
          )
        })}
      </div>
    </div>
  ),
)

OptionSelector.displayName = "OptionSelector"

const ProductSkeleton = () => (
  <div className="container mx-auto py-12 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="animate-pulse space-y-8">
        <div className="h-4 bg-[#0B1220]/10 rounded-full w-1/4" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          <div className="space-y-4">
            <div className="aspect-square bg-gradient-to-br from-[#F3F6FA] to-[#E9EEF6] rounded-3xl border border-[#0B1220]/10" />
            <div className="grid grid-cols-5 gap-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="aspect-square bg-[#0B1220]/10 rounded-2xl" />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <div className="h-10 bg-[#0B1220]/10 rounded-xl w-3/4" />
              <div className="h-6 bg-[#0B1220]/10 rounded-xl w-1/2" />
            </div>

            <div className="h-10 bg-[#0B1220]/10 rounded-xl w-1/3" />
            <div className="h-px bg-[#0B1220]/10" />

            <div className="space-y-3">
              <div className="h-4 bg-[#0B1220]/10 rounded w-1/6" />
              <div className="flex gap-2 flex-wrap">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-9 w-16 bg-[#0B1220]/10 rounded-full" />
                ))}
              </div>
            </div>

            <div className="h-14 bg-[#0B1220]/10 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  </div>
)

const ErrorState = ({ error }: { error: string | null }) => (
  <div className="container mx-auto py-20 px-4">
    <div className="max-w-md mx-auto text-center">
      <div className="flex justify-center mb-6">
        <div className="p-4 bg-[#0B1220]/5 rounded-2xl border border-[#0B1220]/10">
          <AlertCircle className="h-12 w-12 text-[#0B2A5B]" />
        </div>
      </div>

      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#0B1220] mb-2">
        Producto no encontrado
      </h1>
      <p className="text-[#0B1220]/60 mb-8 leading-relaxed">
        {error || "No pudimos encontrar el producto que estás buscando."}
      </p>

      <Button
        asChild
        className="
          h-11 px-6 rounded-xl
          bg-[#0B2A5B] hover:bg-[#0A244D]
          text-white
          shadow-[0_10px_24px_rgba(11,42,91,0.20)]
        "
      >
        <Link href="/tienda">Volver al catálogo</Link>
      </Button>
    </div>
  </div>
)

// Main component
export default function ProductPage() {
  const params = useParams()
  const productId = params.id as string

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [activeImage, setActiveImage] = useState(0)

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return

      try {
        setLoading(true)
        const supabase = createClient()

        const { data, error } = await supabase.from("products").select("*").eq("id", productId).single()

        if (error) {
          throw new Error(error.message)
        }

        setProduct(data as Product)

        const colors = getProductColors(data as Product)
        const sizes = getProductSizes(data as Product)

        if (sizes.length > 0) setSelectedSize(sizes[0])
        if (colors.length > 0) setSelectedColor(colors[0])
      } catch (err) {
        console.error("Error fetching product:", err)
        setError("No se pudo cargar el producto. Por favor, inténtalo de nuevo.")
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  const colors = useMemo(() => (product ? getProductColors(product) : []), [product])
  const sizes = useMemo(() => (product ? getProductSizes(product) : []), [product])

  const currentStock = useMemo(() => {
    if (!product) return 0
    if (selectedColor && selectedSize) return getVariantStock(product, selectedColor, selectedSize)
    return product.stock ?? 0
  }, [product, selectedColor, selectedSize])

  const cartItems = useCartStore((state) => state.items)

  const cartQty = useMemo(() => {
    if (!product) return 0
    return cartItems
      .filter((item) => item.product_id === product.id && item.color === selectedColor && item.size === selectedSize)
      .reduce((sum, item) => sum + item.quantity, 0)
  }, [cartItems, product, selectedColor, selectedSize])

  const remainingStock = Math.max(currentStock - cartQty, 0)

  const handleSizeChange = useCallback((size: string) => setSelectedSize(size), [])
  const handleColorChange = useCallback((color: string) => setSelectedColor(color), [])
  const handleImageChange = useCallback((index: number) => setActiveImage(index), [])

  if (loading) return <ProductSkeleton />
  if (error || !product) return <ErrorState error={error} />

  return (
    <main className="bg-gradient-to-b from-[#F7F8FA] to-[#EFF2F6] min-h-screen py-8 md:py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Breadcrumb */}
        <nav className="mb-6 md:mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center text-sm text-[#0B1220]/60 gap-2">
            <li>
              <Link
                href="/"
                className="flex items-center gap-1.5 hover:text-[#0B1220] transition-colors group"
              >
                <Home className="w-4 h-4 text-[#0B2A5B] group-hover:scale-110 transition-transform" />
                <span>Inicio</span>
              </Link>
            </li>
            <li>
              <ChevronRight className="w-4 h-4 text-[#0B1220]/30" />
            </li>
            <li>
              <Link href="/tienda" className="hover:text-[#0B1220] transition-colors">
                Catálogo
              </Link>
            </li>
            <li>
              <ChevronRight className="w-4 h-4 text-[#0B1220]/30" />
            </li>
            <li className="text-[#0B1220] font-medium truncate max-w-[220px]">{product.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          {/* Images */}
          <ProductImageGallery
            images={product.images}
            title={product.title}
            activeImage={activeImage}
            setActiveImage={handleImageChange}
          />

          <div className="space-y-6">
            {/* Title + price */}
            <div className="rounded-3xl border border-[#0B1220]/10 bg-white/70 backdrop-blur p-6 shadow-sm">
              <div className="space-y-3">
                <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#0B1220] leading-tight">
                  {product.title}
                </h1>

                {product.description && (
                  <p className="text-[#0B1220]/60 text-base leading-relaxed">{product.description}</p>
                )}

                <div className="pt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-semibold text-[#0B1220]">
                    ${product.price?.toLocaleString("es-AR")}
                  </span>
                  <span className="text-xs text-[#0B1220]/55">ARS</span>
                </div>
              </div>

              <Separator className="my-6 bg-[#0B1220]/10" />

              {/* Selectors */}
              {sizes.length > 0 && (
                <OptionSelector label="Talle" options={sizes} selectedOption={selectedSize} onChange={handleSizeChange} />
              )}

              {colors.length > 0 && (
                <div className="mt-6">
                  <OptionSelector label="Color" options={colors} selectedOption={selectedColor} onChange={handleColorChange} />
                </div>
              )}

              {/* Stock status */}
              <div className="mt-6">
                {remainingStock > 0 ? (
                  <div className="flex items-center gap-2 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-2xl">
                    <Check className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm font-medium text-emerald-700">
                      {remainingStock} disponibles para {selectedColor} · {selectedSize}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-4 py-3 bg-rose-50 border border-rose-200 rounded-2xl">
                    <AlertCircle className="w-5 h-5 text-rose-600" />
                    <span className="text-sm font-medium text-rose-700">
                      Sin stock para {selectedColor} · {selectedSize}
                    </span>
                  </div>
                )}
              </div>

              {/* Add to cart */}
              <div className="pt-5">
                <AddToCartButton
                  product={product}
                  selectedSize={selectedSize}
                  selectedColor={selectedColor}
                  currentStock={currentStock}
                  className="
                    w-full py-6 text-base rounded-2xl
                    bg-[#0B2A5B] hover:bg-[#0A244D]
                    text-white
                    shadow-[0_12px_26px_rgba(11,42,91,0.20)]
                    transition-all
                  "
                />
              </div>
            </div>

            {/* Info extra */}
            <Card className="border border-[#0B1220]/10 bg-white/70 backdrop-blur shadow-sm rounded-3xl">
              <div className="p-6">
                <h3 className="font-semibold text-[#0B1220] mb-4 text-sm tracking-tight">
                  Información adicional
                </h3>

                <div className="space-y-3 text-sm text-[#0B1220]/70">
                  <div className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#0B2A5B] mt-0.5 flex-shrink-0" />
                    <p>Stock actualizado y variantes por talle/color.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#0B2A5B] mt-0.5 flex-shrink-0" />
                    <p>Podés coordinar retiro o envío según tu zona.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#0B2A5B] mt-0.5 flex-shrink-0" />
                    <p>Si tenés dudas de talle, revisá la guía antes de comprar.</p>
                  </div>
                </div>

                <div className="mt-5">
                  <Button
                    asChild
                    variant="outline"
                    className="
                      w-full h-11 rounded-2xl
                      border-[#0B1220]/15 bg-white
                      text-[#0B1220]
                      hover:bg-[#0B1220]/5
                    "
                  >
                    <Link href="/guia-de-talles">Ver guía de talles</Link>
                  </Button>
                </div>
              </div>
            </Card>

            {/* Tip visual: pequeño */}
            <div className="text-xs text-[#0B1220]/55 px-1">
              Tip: Si no aparece stock, probá cambiando talle o color.
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}