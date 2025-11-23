import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PaginationProps = {
  pagination: { skip: number; totalPages: number };
  setPagination: React.Dispatch<
    React.SetStateAction<{ skip: number; totalPages: number }>
  >;
};
export function PaginationComponent({
  pagination,
  setPagination,
}: PaginationProps) {
  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        {[...Array(pagination.totalPages)].map((_, index) => {
          return (
            <PaginationItem className="cursor-pointer" key={index}>
              <PaginationLink
                onClick={() =>
                  setPagination((prev) => ({ ...prev, skip: index * 5 }))
                }
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
