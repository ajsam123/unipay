import { Skeleton } from "../components/ui/skeleton";
const TransactionsPageSkeleton = () => {
  return (
    <section className="flex flex-col gap-4 animate-pulse">
      {/* Back button */}
      <Skeleton className="h-10 w-16 rounded-full" />

      {/* Heading */}
      <div className="space-y-2">
        <Skeleton className="h-7 w-72" />
        <Skeleton className="h-4 w-105 max-w-full" />
      </div>

      {/* Search / Filters */}
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 flex-1 rounded-lg" />
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200">
        {/* Table header */}
        <div className="grid grid-cols-5 gap-4 border-b p-4">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-16" />
        </div>

        {/* Table rows */}
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="grid grid-cols-5 gap-4 p-4">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-8 w-24 rounded-md" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TransactionsPageSkeleton;
