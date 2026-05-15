"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

const BookingsToolbar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    const params = new URLSearchParams(searchParams.toString());

    const search =
      (formData.get("search") as string) || "";

    const sortBy =
      (formData.get("sortBy") as string) ||
      "scheduleDate";

    const sortOrder =
      (formData.get("sortOrder") as string) ||
      "desc";

    // reset pagination on any filter change
    params.set("page", "1");

    // SEARCH
    if (search.trim()) {
      params.set("search", search);
    } else {
      params.delete("search");
    }

    // SORT
    params.set("sortBy", sortBy);
    params.set("sortOrder", sortOrder);

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  return (
    <form
      action={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 mt-3"
    >
      {/* SEARCH */}
      <input
        name="search"
        defaultValue={
          searchParams.get("search") || ""
        }
        placeholder="Search bookings..."
        className="w-full rounded-md border px-3 py-2 text-sm bg-slate-900 text-white"
      />

      {/* SORT BY */}
      <select
        name="sortBy"
        defaultValue={
          searchParams.get("sortBy") ||
          "scheduleDate"
        }
        className="rounded-md border px-3 py-2 text-sm bg-slate-900 text-white"
      >
        <option value="scheduleDate">
          Schedule Date
        </option>

        <option value="scheduleTime">
          Schedule Time
        </option>

        <option value="createdAt">
          Created At
        </option>
      </select>

      {/* SORT ORDER */}
      <select
        name="sortOrder"
        defaultValue={
          searchParams.get("sortOrder") ||
          "desc"
        }
        className="rounded-md border px-3 py-2 text-sm bg-slate-900 text-white"
      >
        <option value="desc">Desc</option>
        <option value="asc">Asc</option>
      </select>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={isPending}
        className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm disabled:opacity-50"
      >
        {isPending ? "Loading..." : "Apply"}
      </button>
    </form>
  );
};

export default BookingsToolbar;