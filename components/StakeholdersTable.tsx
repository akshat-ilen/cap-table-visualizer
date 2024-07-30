import React from "react";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Stakeholder {
  name: string;
  sharesByRound: { name: string; shares: number }[];
  sharesByStockPlan: { name: string; shares: number }[];
  additionaDetails?: { secondaryStakeholderType?: string | null };
}

const StakeholdersTable: React.FC<{ data: Stakeholder[] }> = ({ data }) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const calculateTotalShares = (stakeholder: Stakeholder) => {
    return (
      stakeholder.sharesByRound.reduce((sum, share) => sum + share.shares, 0) +
      stakeholder.sharesByStockPlan.reduce(
        (sum, share) => sum + share.shares,
        0
      )
    );
  };

  const columns: ColumnDef<Stakeholder>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "totalShares",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Shares
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const totalShares = calculateTotalShares(row.original);
        return totalShares.toLocaleString();
      },
      sortingFn: (rowA, rowB) => {
        const sharesA = calculateTotalShares(rowA.original);
        const sharesB = calculateTotalShares(rowB.original);
        return sharesA - sharesB;
      },
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) =>
        row.original.additionaDetails?.secondaryStakeholderType || "N/A",
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  const renderTooltipContent = (stakeholder: Stakeholder) => {
    const capRounds = stakeholder.sharesByRound.filter(
      (share) => share.shares > 0
    );
    const stockPlans = stakeholder.sharesByStockPlan.filter(
      (share) => share.shares > 0
    );

    return (
      <div>
        {capRounds.length > 0 && (
          <>
            <h3 className="font-bold">Cap Rounds</h3>
            {capRounds.map((share) => (
              <div key={share.name}>
                {share.name}: {share.shares.toLocaleString()}
              </div>
            ))}
          </>
        )}
        {stockPlans.length > 0 && (
          <>
            {capRounds.length > 0 && <hr className="my-2" />}
            <h3 className="font-bold">Stock Plans</h3>
            {stockPlans.map((share) => (
              <div key={share.name}>
                {share.name}: {share.shares.toLocaleString()}
              </div>
            ))}
          </>
        )}
      </div>
    );
  };

  return (
    <div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TooltipProvider key={row.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <TableRow data-state={row.getIsSelected() && "selected"}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TooltipTrigger>
                  <TooltipContent className="bg-white border border-gray-200 p-2 rounded shadow">
                    {renderTooltipContent(row.original)}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default StakeholdersTable;
