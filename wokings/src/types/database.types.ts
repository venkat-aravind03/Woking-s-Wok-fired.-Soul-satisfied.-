import type { MenuCategory, MenuItem } from "@/types";

export type Database = {
  public: {
    Tables: {
      menu_categories: {
        Row: MenuCategory;
        Insert: Omit<MenuCategory, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<MenuCategory, "id" | "created_at">>;
      };
      menu_items: {
        Row: MenuItem;
        Insert: Omit<MenuItem, "id" | "created_at" | "updated_at" | "category">;
        Update: Partial<Omit<MenuItem, "id" | "created_at" | "category">>;
      };
      reviews: {
        Row: {
          id: string;
          customer_name: string;
          rating: number;
          review_text: string;
          source: string;
          is_featured: boolean;
          is_approved: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          customer_name: string;
          rating: number;
          review_text: string;
          source: string;
          is_featured?: boolean;
          is_approved?: boolean;
        };
        Update: Partial<{
          customer_name: string;
          rating: number;
          review_text: string;
          source: string;
          is_featured: boolean;
          is_approved: boolean;
        }>;
      };
    };
  };
};
