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
      className="flex flex-col lg:flex-row gap-3 mt-1"
    >
      {/* SEARCH */}
      <input
        name="search"
        aria-label="Search bookings"
        defaultValue={
          searchParams.get("search") || ""
        }
        placeholder="Search bookings..."
        className="admin-field w-full lg:flex-1"
      />

      {/* SORT BY */}
      <select
        name="sortBy"
        aria-label="Sort bookings by"
        defaultValue={
          searchParams.get("sortBy") ||
          "scheduleDate"
        }
        className="admin-field"
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
        aria-label="Booking sort direction"
        defaultValue={
          searchParams.get("sortOrder") ||
          "desc"
        }
        className="admin-field"
      >
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={isPending}
        className="admin-primary"
      >
        {isPending ? "Loading..." : "Apply"}
      </button>
    </form>
  );
};

export default BookingsToolbar;