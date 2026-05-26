import { createServerSupabase } from "@/lib/supabase";
import type { MenuCategory, MenuItem } from "@/types";

/**
 * Fetch all active menu categories, ordered by display_order.
 */
export async function getMenuCategories(): Promise<MenuCategory[]> {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from("menu_categories")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
  return (data as MenuCategory[]) ?? [];
}

/**
 * Fetch menu items, optionally filtered by category slug.
 */
export async function getMenuItems(
  categorySlug?: string
): Promise<MenuItem[]> {
  const supabase = createServerSupabase();

  let query = supabase
    .from("menu_items")
    .select("*, category:menu_categories(*)")
    .eq("is_available", true)
    .order("display_order", { ascending: true });

  if (categorySlug && categorySlug !== "all") {
    const category = await getCategoryBySlug(categorySlug);
    if (category) {
      query = query.eq("category_id", category.id);
    }
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching menu items:", error);
    return [];
  }
  return (data as MenuItem[]) ?? [];
}

/**
 * Fetch bestseller items for the Popular Picks section.
 */
export async function getBestsellerItems(
  limit: number = 6
): Promise<MenuItem[]> {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from("menu_items")
    .select("*, category:menu_categories(*)")
    .eq("is_bestseller", true)
    .eq("is_available", true)
    .order("display_order", { ascending: true })
    .limit(limit);

  if (error) {
    console.error("Error fetching bestsellers:", error);
    return [];
  }
  return (data as MenuItem[]) ?? [];
}

/**
 * Fetch a single menu item by ID.
 */
export async function getMenuItemById(
  id: string
): Promise<MenuItem | null> {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from("menu_items")
    .select("*, category:menu_categories(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching menu item:", error);
    return null;
  }
  return data as MenuItem;
}

/**
 * Fetch a single category by slug.
 */
export async function getCategoryBySlug(
  slug: string
): Promise<MenuCategory | null> {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from("menu_categories")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error) {
    console.error("Error fetching category:", error);
    return null;
  }
  return data as MenuCategory;
}
