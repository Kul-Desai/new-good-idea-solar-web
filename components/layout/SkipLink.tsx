export function SkipLink() {
  return (
    <a
      className="sr-only z-50 rounded-md bg-white px-4 py-3 font-heading font-medium text-brand-blue shadow-soft focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus-visible:outline-focus"
      href="#main"
    >
      Skip to main content
    </a>
  );
}
