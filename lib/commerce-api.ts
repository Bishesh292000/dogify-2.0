"use client";

import { getSupabaseClient } from "@/lib/supabase/client";
import type { GroomingBookingInsert, HealthSupportRequestInsert, OrderInsert, Product } from "@/lib/supabase/types";

export async function fetchProductsByCategory(category: string) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return {
      data: null,
      error: new Error("Connect Supabase environment values to load live DOGIFY products.")
    };
  }

  const { data, error } = await supabase
    .from("products")
    .select("id,name,category,subcategory,brand,pet_type,tags,price,image_url,description,stock,featured,is_active,created_at,updated_at")
    .eq("category", category)
    .or("is_active.is.true,is_active.is.null")
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });

  return {
    data: (data ?? []).map((product) => ({
      ...product,
      price: Number(product.price)
    })) as Product[],
    error
  };
}

export async function saveOrder(order: OrderInsert) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return { error: new Error("Add Supabase environment values to save orders.") };
  }

  const { error } = await supabase.from("orders").insert(order);
  return { error };
}

export async function saveGroomingBooking(booking: GroomingBookingInsert) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return { error: new Error("Add Supabase environment values to save grooming bookings.") };
  }

  const { error } = await supabase.from("grooming_bookings").insert(booking);
  return { error };
}

export async function saveHealthSupportRequest(request: HealthSupportRequestInsert) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return { error: new Error("Add Supabase environment values to save health support requests.") };
  }

  const { error } = await supabase.from("health_support_requests").insert(request);
  return { error };
}
