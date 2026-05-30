"use client";

import { useState } from "react";
import { StarRating } from "@/components/reviews/StarRating";
import { submitReview } from "@/lib/actions/reviewActions";
import type { ReviewFormData, ReviewSource } from "@/types";

const ratingLabels: Record<number, string> = {
  1: "★ Poor",
  2: "★ Fair",
  3: "★ Average",
  4: "★ Good",
  5: "★ Excellent!",
};

export function ReviewSubmissionForm() {
  const [formData, setFormData] = useState<ReviewFormData>({
    customer_name: "",
    rating: 0,
    review_text: "",
    source: "Direct",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ReviewFormData, string>>>({});
  const [serverError, setServerError] = useState("");

  function validate(): boolean {
    const newErrors: Partial<Record<keyof ReviewFormData, string>> = {};
    const name = formData.customer_name.trim();
    if (!name || name.length < 2 || name.length > 80) {
      newErrors.customer_name = "Please enter your name (2–80 characters).";
    }
    if (!formData.rating || formData.rating < 1 || formData.rating > 5) {
      newErrors.rating = "Please select a rating.";
    }
    const text = formData.review_text.trim();
    if (!text || text.length < 10) {
      newErrors.review_text = "Review must be at least 10 characters.";
    } else if (text.length > 500) {
      newErrors.review_text = "Review must be under 500 characters.";
    }
    const validSources: ReviewSource[] = ["Zomato", "Swiggy", "Google", "Direct"];
    if (!validSources.includes(formData.source)) {
      newErrors.source = "Please select a platform.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;

    setIsSubmitting(true);
    const result = await submitReview(formData);
    setIsSubmitting(false);

    if (result.success) {
      setIsSubmitted(true);
    } else {
      setServerError(result.error || "Something went wrong.");
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-white/[0.06] border border-white/[0.12] rounded-3xl p-10 md:p-12 max-w-[640px] mx-auto text-center">
        <div className="w-20 h-20 rounded-full bg-success mx-auto flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-[family-name:var(--font-heading)] text-[28px] font-bold text-white mb-3">
          Thank You! 🎉
        </h3>
        <p className="font-[family-name:var(--font-body)] text-base text-white/75 leading-relaxed mb-8 max-w-md mx-auto">
          Your review has been submitted and will appear on our site after approval. We appreciate your feedback!
        </p>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setFormData({ customer_name: "", rating: 0, review_text: "", source: "Direct" });
            setErrors({});
          }}
          className="border border-white/30 text-white font-[family-name:var(--font-body)] text-sm font-bold px-6 py-3 rounded-full hover:bg-white/10 transition-colors"
        >
          Submit Another Review
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/[0.06] border border-white/[0.12] rounded-3xl p-6 md:p-10 max-w-[640px] mx-auto"
    >
      {/* Header */}
      <h3 className="font-[family-name:var(--font-heading)] text-[32px] font-bold text-white">
        Write a Review
      </h3>
      <p className="font-[family-name:var(--font-body)] text-[15px] text-white/65 mt-1 mb-8">
        Your feedback helps us serve Kondapur better.
      </p>

      {/* Server Error */}
      {serverError && (
        <div className="bg-red-500/20 border border-red-500/40 text-red-300 rounded-xl px-4 py-3 mb-6 font-[family-name:var(--font-body)] text-sm">
          {serverError}
        </div>
      )}

      {/* Name */}
      <div className="mb-6">
        <label className="block font-[family-name:var(--font-body)] text-sm font-medium text-white/75 mb-2">
          Your Name *
        </label>
        <input
          type="text"
          value={formData.customer_name}
          onChange={(e) => setFormData((p) => ({ ...p, customer_name: e.target.value }))}
          placeholder="E.g., Priya Sharma"
          className="w-full h-12 px-4 rounded-xl bg-white/[0.06] border border-white/[0.15] text-white placeholder:text-white/35 font-[family-name:var(--font-body)] text-[15px] outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(232,73,15,0.20)] transition-all"
        />
        {errors.customer_name && (
          <p className="mt-1 font-[family-name:var(--font-body)] text-[12px] text-[#FC8B8B]">{errors.customer_name}</p>
        )}
      </div>

      {/* Rating */}
      <div className="mb-6">
        <label className="block font-[family-name:var(--font-body)] text-sm font-medium text-white/75 mb-2">
          Your Rating *
        </label>
        <StarRating
          rating={formData.rating}
          interactive
          size="lg"
          onChange={(r) => setFormData((p) => ({ ...p, rating: r }))}
        />
        {formData.rating > 0 && (
          <p className="mt-2 font-[family-name:var(--font-body)] text-sm font-medium text-primary">
            {ratingLabels[formData.rating]}
          </p>
        )}
        {errors.rating && (
          <p className="mt-1 font-[family-name:var(--font-body)] text-[12px] text-[#FC8B8B]">{errors.rating}</p>
        )}
      </div>

      {/* Review Text */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="font-[family-name:var(--font-body)] text-sm font-medium text-white/75">
            Your Review *
          </label>
          <span
            className={`font-[family-name:var(--font-body)] text-[12px] ${
              formData.review_text.length > 500 ? "text-red-400" : "text-white/40"
            }`}
          >
            {formData.review_text.length} / 500
          </span>
        </div>
        <textarea
          value={formData.review_text}
          onChange={(e) => setFormData((p) => ({ ...p, review_text: e.target.value }))}
          placeholder="Tell others what you loved about Woking's. What did you order? Was the food fresh? Would you recommend it?"
          rows={4}
          className="w-full min-h-[120px] px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.15] text-white placeholder:text-white/35 font-[family-name:var(--font-body)] text-[15px] outline-none resize-y focus:border-primary focus:shadow-[0_0_0_3px_rgba(232,73,15,0.20)] transition-all"
        />
        {errors.review_text && (
          <p className="mt-1 font-[family-name:var(--font-body)] text-[12px] text-[#FC8B8B]">{errors.review_text}</p>
        )}
      </div>

      {/* Source */}
      <div className="mb-8">
        <label className="block font-[family-name:var(--font-body)] text-sm font-medium text-white/75 mb-2">
          Where did you order from? *
        </label>
        <select
          value={formData.source}
          onChange={(e) => setFormData((p) => ({ ...p, source: e.target.value as ReviewSource }))}
          className="w-full h-12 px-4 rounded-xl bg-white/[0.06] border border-white/[0.15] text-white font-[family-name:var(--font-body)] text-[15px] outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(232,73,15,0.20)] transition-all appearance-none"
        >
          <option value="Zomato" className="bg-charcoal">🔴 Zomato</option>
          <option value="Swiggy" className="bg-charcoal">🟠 Swiggy</option>
          <option value="Google" className="bg-charcoal">🔵 Google</option>
          <option value="Direct" className="bg-charcoal">🏠 Visited in Person</option>
        </select>
        {errors.source && (
          <p className="mt-1 font-[family-name:var(--font-body)] text-[12px] text-[#FC8B8B]">{errors.source}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-[52px] bg-primary text-white font-[family-name:var(--font-body)] text-base font-bold rounded-xl hover:bg-primary-dark hover:scale-[1.01] transition-all disabled:opacity-80 disabled:pointer-events-none flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4 31.4" strokeLinecap="round" />
            </svg>
            Submitting...
          </>
        ) : (
          "Submit Review →"
        )}
      </button>
    </form>
  );
}
