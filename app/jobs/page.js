import { Suspense } from "react";
import JobsClientPage from "./JobsClientPage";

export const dynamic = "force-dynamic"; // Optional: ensures it's not statically optimized

export default function JobsPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-gray-500">Loading jobs...</div>}>
      <JobsClientPage />
    </Suspense>
  );
}
