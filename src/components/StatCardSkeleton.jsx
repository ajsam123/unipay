const StatCardSkeleton = () => {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <div className="animate-pulse space-y-4">
        <div className="h-4 w-24 rounded bg-gray-200"></div>
        <div className="h-8 w-32 rounded bg-gray-200"></div>
        <div className="h-4 w-40 rounded bg-gray-200"></div>
      </div>
    </div>
  );
};

export default StatCardSkeleton;
