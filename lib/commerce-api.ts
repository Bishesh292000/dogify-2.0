"use client";

import { getSupabaseClient } from "@/lib/supabase/client";
import type { GroomingBookingInsert, HealthSupportRequestInsert, OrderInsert, Product } from "@/lib/supabase/types";

export async function fetchProductsByCategories(categories: string[]) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return {
      data: null,
      error: new Error("Connect Supabase environment values to load live DOGIFY products.")
    };
  }

  const { data, error } = await supabase
    .from("products")
    .select("id,name,category,price,image_url,description,stock,featured,created_at")
    .in("category", categories)
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });

  return { data: (data ?? []) as Product[], error };
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
