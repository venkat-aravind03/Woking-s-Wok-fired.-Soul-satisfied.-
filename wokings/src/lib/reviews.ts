import { createServerSupabase } from "@/lib/supabase";
import type { Review, ReviewSource, RatingBreakdown } from "@/types";

/**
 * Fetch featured + approved reviews for the homepage teaser.
 */
export async function getFeaturedReviews(
  limit: number = 6
): Promise<Review[]> {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("is_approved", true)
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching featured reviews:", error);
    return [];
  }
  return (data as Review[]) ?? [];
}

/**
 * Fetch all approved reviews with optional source filter and sorting.
 */
export async function getAllApprovedReviews(
  source?: ReviewSource | "all",
  sortBy?: "latest" | "highest" | "lowest"
): Promise<Review[]> {
  const supabase = createServerSupabase();
  let query = supabase
    .from("reviews")
    .select("*")
    .eq("is_approved", true);

  if (source && source !== "all") {
    query = query.eq("source", source);
  }

  switch (sortBy) {
    case "highest":
      query = query.order("rating", { ascending: false }).order("created_at", { ascending: false });
      break;
    case "lowest":
      query = query.order("rating", { ascending: true }).order("created_at", { ascending: false });
      break;
    case "latest":
    default:
      query = query.order("created_at", { ascending: false });
      break;
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching approved reviews:", error);
    return [];
  }
  return (data as Review[]) ?? [];
}

/**
 * Get aggregate review statistics for the reviews hero section.
 */
export async function getReviewStats(): Promise<{
  totalCount: number;
  averageRating: number;
  breakdown: RatingBreakdown[];
}> {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from("reviews")
    .select("id, rating")
    .eq("is_approved", true);

  if (error || !data || data.length === 0) {
    console.error("Error fetching review stats:", error);
    return { totalCount: 0, averageRating: 0, breakdown: [] };
  }

  const totalCount = data.length;
  const sum = data.reduce((acc, r) => acc + r.rating, 0);
  const averageRating = Math.round((sum / totalCount) * 10) / 10;

  const breakdown: RatingBreakdown[] = [5, 4, 3, 2, 1].map((star) => {
    const count = data.filter((r) => r.rating === star).length;
    const percentage = Math.round((count / totalCount) * 100);
    return { star, count, percentage };
  });

  return { totalCount, averageRating, breakdown };
}

/**
 * Get count of approved reviews grouped by source platform.
 */
export async function getReviewCountBySource(): Promise<
  Record<ReviewSource | "all", number>
> {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from("reviews")
    .select("source")
    .eq("is_approved", true);

  if (error || !data) {
    return { all: 0, Zomato: 0, Swiggy: 0, Google: 0, Direct: 0 };
  }

  return {
    all: data.length,
    Zomato: data.filter((r) => r.source === "Zomato").length,
    Swiggy: data.filter((r) => r.source === "Swiggy").length,
    Google: data.filter((r) => r.source === "Google").length,
    Direct: data.filter((r) => r.source === "Direct").length,
  };
}
