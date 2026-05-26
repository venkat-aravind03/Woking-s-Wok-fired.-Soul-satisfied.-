// ─── Menu Category ─────────────────────────────────────
export interface MenuCategory {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ─── Menu Item ──────────────────────────────────────────
export interface MenuItem {
  id: string;
  category_id: string;
  name: string;
  description: string;
  price: number;
  image_url: string | null;
  is_vegetarian: boolean;
  is_bestseller: boolean;
  is_available: boolean;
  is_spicy: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
  category?: MenuCategory;
}

// ─── Menu Item Card Props ────────────────────────────────
export interface MenuItemCardProps {
  item: MenuItem;
  className?: string;
}

// ─── Menu Filter State ───────────────────────────────────
export interface MenuFilterState {
  activeCategory: string;
  searchQuery: string;
}

// TODO: Fully define in Phase 3
export interface Review {
  id: string;
  customer_name: string;
  rating: number;
  comment: string;
  created_at: string;
  is_featured: boolean;
}

// TODO: Fully define in Phase 4
export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  is_read: boolean;
}
