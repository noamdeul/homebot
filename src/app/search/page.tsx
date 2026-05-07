import { Suspense } from "react";
import { SearchResults } from "./SearchResults";

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-8">
          <h1 className="text-2xl font-bold text-blue-900">Search</h1>
          <p className="mt-6 text-blue-700">Loading…</p>
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  );
}
