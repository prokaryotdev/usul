import type { ComponentProps } from "react";
import _AuthorsFilter from "./client";
import { searchAuthors } from "@/lib/search";
import { findAllAuthorIdsWithBooksCount } from "@/server/services/authors";

type Props = Omit<
  ComponentProps<typeof _AuthorsFilter>,
  "initialAuthorsResponse" | "booksCount"
>;

export default async function AuthorsFilter(props: Props) {
  const [initialAuthors, booksCount] = await Promise.all([
    searchAuthors("", {
      page: 1,
      limit: 10,
      sortBy: "booksCount:desc,_text_match:desc",
      filters: props.filters,
    }),
    findAllAuthorIdsWithBooksCount(),
  ]);

  return (
    <_AuthorsFilter
      {...props}
      initialAuthorsResponse={initialAuthors}
      booksCount={booksCount}
    />
  );
}
