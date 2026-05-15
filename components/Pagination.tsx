"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Props = {
  meta: {
    page: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

const Pagination = ({ meta }: Props) => {
  const searchParams = useSearchParams();

  const createUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(page));

    return `?${params.toString()}`;
  };

  return (
    <div className="flex items-center justify-between pt-4">
      <div className="text-sm text-gray-400">
        Page {meta.page} of {meta.totalPages}
      </div>

      <div className="flex gap-2">
        {meta.hasPreviousPage && (
          <Link
            href={createUrl(meta.page - 1)}
            className="px-3 py-1 rounded bg-slate-700 text-white text-sm"
          >
            Previous
          </Link>
        )}

        {meta.hasNextPage && (
          <Link
            href={createUrl(meta.page + 1)}
            className="px-3 py-1 rounded bg-slate-700 text-white text-sm"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  );
};

export default Pagination;