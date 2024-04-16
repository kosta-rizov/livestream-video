import { Skeleton } from "@/components/ui/skeleton";
import { getStreams } from "@/lib/feed-service";
import ResultCard, { ResultCardSkeleton } from "./result-card";

const Results = async () => {
  const data = await getStreams();

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Streams you might like</h2>
      {data.length === 0 && (
        <div className="text-muted-foreground text-sm">No streams found</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:gris-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {data.map((data) => (
          <ResultCard key={data.id} data={data} />
        ))}
      </div>
    </div>
  );
};

export default Results;

export const ResultsSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-8 w-[290px] mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:gris-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {[...Array(4)].map((_, i) => (
          <ResultCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};
