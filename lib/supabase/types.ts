export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image_url: string | null;
  description: string | null;
  stock: number | null;
  featured: boolean | null;
  created_at: string | null;
};

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type OrderInsert = {
  customer_name: string;
  phone: string;
  email: string;
  address: string;
  order_data_json: Json;
  total_amount: number;
  status: string;
};

export type GroomingBookingInsert = {
  customer_name: string;
  phone: string;
  pet_type: string;
  service: string;
  preferred_date: string;
  status: string;
};

export type HealthSupportRequestInsert = {
  customer_name: string;
  phone: string;
  issue: string;
};

export type Database = {
  public: {
    Tables: {
      products: {
        Row: Product;
        Insert: Omit<Product, "id" | "created_at"> & { id?: string; created_at?: string };
        Update: Partial<Product>;
        Relationships: [];
      };
      categories: {
        Row: Category;
        Insert: Omit<Category, "id"> & { id?: string };
        Update: Partial<Category>;
        Relationships: [];
      };
      orders: {
        Row: OrderInsert & { id: string; created_at: string; status: string };
        Insert: OrderInsert;
        Update: Partial<OrderInsert>;
        Relationships: [];
      };
      grooming_bookings: {
        Row: GroomingBookingInsert & { id: string };
        Insert: GroomingBookingInsert;
        Update: Partial<GroomingBookingInsert>;
        Relationships: [];
      };
      health_support_requests: {
        Row: HealthSupportRequestInsert & { id: string; created_at: string };
        Insert: HealthSupportRequestInsert;
        Update: Partial<HealthSupportRequestInsert>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
