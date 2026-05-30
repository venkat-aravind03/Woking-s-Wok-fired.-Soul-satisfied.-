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

// ─── Review Source ───────────────────────────────────────
export type ReviewSource = 'Zomato' | 'Swiggy' | 'Google' | 'Direct';

// ─── Review (matches Supabase reviews table) ─────────────
export interface Review {
  id: string;
  customer_name: string;
  rating: number;
  review_text: string;
  source: ReviewSource;
  is_featured: boolean;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
}

// ─── Review Form Data (for submission form) ──────────────
export interface ReviewFormData {
  customer_name: string;
  rating: number;
  review_text: string;
  source: ReviewSource;
}

// ─── Review Card Props ────────────────────────────────────
export interface ReviewCardProps {
  review: Review;
  className?: string;
  compact?: boolean;
}

// ─── Star Rating Props ────────────────────────────────────
export interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

// ─── Rating Breakdown (computed, not from DB) ────────────
export interface RatingBreakdown {
  star: number;
  count: number;
  percentage: number;
}

// ─── Reviews Filter State ─────────────────────────────────
export interface ReviewsFilterState {
  activeSource: ReviewSource | 'all';
  sortBy: 'latest' | 'highest' | 'lowest';
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

