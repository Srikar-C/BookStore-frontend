import Skeleton from "@mui/material/Skeleton";

export default function BookCardSkeleton() {

    const skeletonStyle = {
        bgcolor: "var(--skeleton-bg)",
        "&::after": {
            background:
                "linear-gradient(90deg, transparent, var(--skeleton-wave), transparent)",
        },
    };

    return (
        <div className="w-72 rounded-2xl border border-[color:var(--input-border)] p-4 flex flex-col gap-3">
            <Skeleton
                variant="rectangular"
                width="100%"
                height={220}
                sx={{
                    ...skeletonStyle,
                    borderRadius: "12px"
                }}
            />

            <Skeleton variant="text" width="80%" height={32} sx={skeletonStyle} />
            <Skeleton variant="text" width="60%" sx={skeletonStyle} />

            <div className="flex justify-between items-center mt-2">
                <Skeleton variant="text" width={70} sx={skeletonStyle} />
                <Skeleton variant="rounded" width={90} height={36} sx={skeletonStyle} />
            </div>
        </div>
    );
}