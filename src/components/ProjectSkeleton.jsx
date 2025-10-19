import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

const ProjectCardSkeleton = () => {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
      <div className="lg:sticky lg:top-0">
        <Skeleton className="w-full h-[300px] rounded-lg" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            {Array(6).fill().map((_, i) => (
              <Skeleton key={`left-${i}`} className="h-5 w-full" />
            ))}
          </div>
          <div className="space-y-2">
            {Array(6).fill().map((_, i) => (
              <Skeleton key={`right-${i}`} className="h-5 w-full" />
            ))}
          </div>
        </div>
        <div className="pt-4 border-t">
          <Skeleton className="h-6 w-32" />
        </div>
      </div>
    </div>
  );
};

const ProjectTableSkeleton = () => {
  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-8 w-32" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-10 w-full" />
        {Array(5).fill().map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {Array(3).fill().map((_, i) => (
          <Skeleton key={i} className="h-10 w-10" />
        ))}
      </div>
    </div>
  );
};

export { ProjectCardSkeleton, ProjectTableSkeleton };
