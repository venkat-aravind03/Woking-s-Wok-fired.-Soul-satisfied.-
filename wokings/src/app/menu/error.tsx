"use client";

export default function MenuError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      <span className="text-[64px]">😔</span>
      <h2 className="mt-4 font-[family-name:var(--font-heading)] text-2xl font-semibold text-charcoal">
        Something went wrong
      </h2>
      <p className="mt-2 font-[family-name:var(--font-body)] text-base text-muted max-w-md">
        We couldn&apos;t load the menu right now. Please try again in a moment.
      </p>
      <button
        onClick={reset}
        className="mt-6 bg-primary text-white font-[family-name:var(--font-body)] text-sm font-bold px-6 py-3 rounded-full hover:bg-primary-dark transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
