import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Calendar, ShoppingBag, LogOut, Home } from "lucide-react";
import { Order } from "@/lib/types";

// =================== BADGE ORDEN ===================
function BadgeOrderStatus({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: "Pendiente",
    preparing: "Preparando",
    shipped: "En camino",
    ready_for_pickup: "Listo para retirar",
    completed: "Entregado",
    cancelled: "Cancelado",
  };

  const cls: Record<string, string> = {
    pending: "bg-slate-100 text-slate-700 border-slate-200",
    preparing: "bg-amber-50 text-amber-800 border-amber-200",
    shipped: "bg-blue-50 text-blue-800 border-blue-200",
    ready_for_pickup: "bg-violet-50 text-violet-800 border-violet-200",
    completed: "bg-emerald-50 text-emerald-800 border-emerald-200",
    cancelled: "bg-rose-50 text-rose-800 border-rose-200",
  };

  const label = map[status] ?? "Pendiente";
  const classes = cls[status] ?? cls.pending;

  return (
    <span
      className={[
        "inline-flex items-center justify-center",
        "px-3 py-1.5 rounded-full border",
        "text-xs md:text-sm font-semibold",
        classes,
      ].join(" ")}
    >
      {label}
    </span>
  );
}

export default async function Perfil() {
  const supabase = await createClient();

  // ======= GET USER =======
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profileData } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const email = user.email;
  const avatar = user.user_metadata?.avatar_url || "/placeholder.svg";
  const fullName = user.user_metadata?.full_name || profileData?.username || "Mi cuenta";
  const createdAt = new Date(user.created_at).toLocaleDateString("es-AR");

  // ======= GET ORDERS =======
  const { data: orders } = (await supabase
    .from("orders")
    .select(
      `
      *,
      items:order_items (
        *,
        product:product_id (*)
      )
    `
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })) as { data: Order[] | null };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F7F8FA] to-[#EFF2F6]">
      {/* Header suave */}
      <div className="relative">
        <div className="h-40 bg-[#0B2A5B]" />
        <div className="absolute inset-x-0 bottom-0 h-14 " />
      </div>

      <div className="container mx-auto px-4 pb-12 -mt-20">
        {/* Breadcrumb simple */}
        <div className="mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition"
          >
            <Home className="w-4 h-4" />
            Volver al inicio
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* =================== SIDEBAR =================== */}
          <Card className="h-fit rounded-3xl border border-[#0B1220]/10 bg-white/80 backdrop-blur shadow-sm">
            <CardHeader className="pt-6 text-center">
              <Avatar className="w-24 h-24 mx-auto ring-2 ring-white shadow-sm">
                <AvatarImage src={avatar} />
                <AvatarFallback className="bg-[#0B1220]/5">
                  <User className="w-8 h-8 text-[#0B2A5B]" />
                </AvatarFallback>
              </Avatar>

              <h1 className="mt-4 text-2xl md:text-3xl font-semibold tracking-tight text-[#0B1220]">
                {fullName}
              </h1>

              <p className="text-[#0B1220]/65 text-sm md:text-base break-all">
                {email}
              </p>

              <div className="mt-4 rounded-2xl border border-[#0B1220]/10 bg-white px-4 py-3 text-sm md:text-base text-[#0B1220]/70">
                <span className="font-semibold text-[#0B1220]">Cliente desde: </span>
                {createdAt}
              </div>

              {/* CTA principal para gente grande: claro y grande */}
              <div className="mt-5 grid gap-3">
                <Button
                  asChild
                  className="
                    h-12 rounded-2xl
                    bg-[#0B2A5B] hover:bg-[#0A244D]
                    text-white
                    shadow-[0_10px_24px_rgba(11,42,91,0.18)]
                  "
                >
                  <Link href="/tienda">
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Ir al catálogo
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  className="
                    h-12 rounded-2xl
                    border-[#0B1220]/15 bg-white
                    text-[#0B1220]
                    hover:bg-[#0B1220]/5
                  "
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Cerrar sesión
                </Button>

                <p className="text-xs text-[#0B1220]/55">
                  Si tenés dudas con un pedido, entrá en “Mis pedidos” y tocá “Ver detalles”.
                </p>
              </div>
            </CardHeader>
          </Card>

          {/* =================== MAIN CONTENT =================== */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="orders">
              <TabsList className="bg-white/70 border border-[#0B1220]/10 rounded-2xl p-1 w-full justify-start gap-1">
                <TabsTrigger
                  value="orders"
                  className="rounded-xl data-[state=active]:bg-[#0B2A5B] data-[state=active]:text-white"
                >
                  Mis pedidos
                </TabsTrigger>
                <TabsTrigger
                  value="addresses"
                  className="rounded-xl data-[state=active]:bg-[#0B2A5B] data-[state=active]:text-white"
                >
                  Direcciones
                </TabsTrigger>
              </TabsList>

              <TabsContent value="orders" className="mt-4">
                <Card className="rounded-3xl border border-[#0B1220]/10 bg-white/80 backdrop-blur shadow-sm">
                  <CardContent className="p-0">
                    {/* Encabezado claro */}
                    <div className="px-5 py-4 border-b border-[#0B1220]/10">
                      <h2 className="text-lg md:text-xl font-semibold text-[#0B1220]">
                        Mis pedidos
                      </h2>
                      <p className="text-sm md:text-base text-[#0B1220]/60 mt-1">
                        Acá podés ver el estado, la fecha y el total de cada compra.
                      </p>
                    </div>

                    {orders && orders.length > 0 ? (
                      <div className="divide-y divide-[#0B1220]/10">
                        {orders.map((order) => (
                          <OrderRow key={order.id} order={order} />
                        ))}
                      </div>
                    ) : (
                      <EmptyOrders />
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="addresses" className="mt-4">
                <Card className="rounded-3xl border border-[#0B1220]/10 bg-white/80 backdrop-blur shadow-sm">
                  <CardContent className="p-6 text-[#0B1220]/70">
                    Pronto...
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  );
}

// =================== COMPONENTES ===================

// Card individual del pedido (más “para gente grande”: claro, grande, con labels)
function OrderRow({ order }: { order: Order }) {
  const date = new Date(order.created_at).toLocaleDateString("es-AR");
  const total = order.total?.toLocaleString("es-AR") ?? order.total;

  return (
    <div className="px-5 py-5 hover:bg-[#0B1220]/[0.03] transition">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 py-4">
        {/* Izquierda */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#0B2A5B]" />
            <span className="text-base md:text-lg font-semibold text-[#0B1220]">
              Pedido #{order.id.slice(-6)}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm md:text-base text-[#0B1220]/65">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#0B1220]/55" />
              <span>
                <span className="font-semibold text-[#0B1220]/75">Fecha:</span> {date}
              </span>
            </span>

            <span>
              <span className="font-semibold text-[#0B1220]/75">Total:</span>{" "}
              <span className="font-semibold text-[#0B1220]">${total}</span>
            </span>
          </div>
        </div>

        {/* Derecha */}
        <div className="flex items-center justify-between md:justify-end gap-3">
          <BadgeOrderStatus status={order.order_status || "pending"} />

          <Button
            asChild
            variant="destructive"
            className="
              h-10 px-4 rounded-xl
            "
          >
            <Link href={`/perfil/pedidos/${order.id}`}>Ver detalles</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

// Vista de “no hay pedidos”
function EmptyOrders() {
  return (
    <div className="p-10 text-center">
      <div className="mx-auto w-14 h-14 rounded-2xl bg-[#0B1220]/5 border border-[#0B1220]/10 flex items-center justify-center mb-4">
        <ShoppingBag className="w-8 h-8 text-[#0B2A5B]" />
      </div>

      <h3 className="text-lg md:text-xl font-semibold text-[#0B1220] mb-2">
        Todavía no tenés pedidos
      </h3>
      <p className="text-[#0B1220]/60 mb-6">
        Cuando compres, tus pedidos van a aparecer acá con su estado.
      </p>

      <Button
        asChild
        className="
          h-12 px-6 rounded-2xl
          bg-[#0B2A5B] hover:bg-[#0A244D]
          text-white
          shadow-[0_10px_24px_rgba(11,42,91,0.18)]
        "
      >
        <Link href="/tienda">Ir al catálogo</Link>
      </Button>
    </div>
  );
}