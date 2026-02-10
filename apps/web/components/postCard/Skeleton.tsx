export function PostSkeleton() {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
            {/* Image Area Skeleton */}
            <div className="relative h-60 w-full bg-gray-200 animate-pulse" />

            {/* Content Area Skeleton */}
            <div className="p-6 flex flex-col flex-1">
                {/* Date Skeleton */}
                <div className="flex items-center gap-2 mb-4">
                    <div className="h-3 w-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
                </div>

                {/* Title Skeleton */}
                <div className="space-y-2 mb-4">
                    <div className="h-7 w-full bg-gray-200 rounded animate-pulse" />
                    <div className="h-7 w-2/3 bg-gray-200 rounded animate-pulse" />
                </div>

                {/* Description Skeleton */}
                <div className="space-y-2 mb-6 flex-1">
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
                </div>

                {/* Footer Skeleton */}
                <div className="pt-6 border-t border-gray-100 flex items-center justify-between mt-auto">
                    {/* Author Skeleton */}
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
                        <div className="flex flex-col gap-1">
                            <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
                            <div className="h-2 w-8 bg-gray-200 rounded animate-pulse" />
                        </div>
                    </div>

                    {/* Action Link Skeleton */}
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                </div>
            </div>
        </div>
    );
}
