"use server";

import { createServerSupabase } from "@/lib/supabase";
import type { ReviewFormData } from "@/types";

export async function submitReview(
  formData: ReviewFormData
): Promise<{
  success: boolean;
  message: string;
  error?: string;
}> {
  // ── Validation ──────────────────────────────────────────
  const name = formData.customer_name?.trim();
  if (!name || name.length < 2 || name.length > 80) {
    return { success: false, message: "", error: "Please enter your name (2–80 characters)." };
  }

  if (
    !formData.rating ||
    !Number.isInteger(formData.rating) ||
    formData.rating < 1 ||
    formData.rating > 5
  ) {
    return { success: false, message: "", error: "Please select a rating." };
  }

  const text = formData.review_text?.trim();
  if (!text || text.length < 10 || text.length > 500) {
    return {
      success: false,
      message: "",
      error: "Review must be between 10 and 500 characters.",
    };
  }

  const validSources = ["Zomato", "Swiggy", "Google", "Direct"];
  if (!validSources.includes(formData.source)) {
    return { success: false, message: "", error: "Please select a platform." };
  }

  // ── Insert ──────────────────────────────────────────────
  const supabase = createServerSupabase();
  const { error } = await supabase.from("reviews").insert({
    customer_name: name,
    rating: formData.rating,
    review_text: text,
    source: formData.source,
    is_approved: false,
    is_featured: false,
  });

  if (error) {
    console.error("Review submission error:", error);
    return {
      success: false,
      message: "",
      error: "Something went wrong. Please try again later.",
    };
  }

  return {
    success: true,
    message: "Thank you for your review! It will appear after approval.",
  };
}
