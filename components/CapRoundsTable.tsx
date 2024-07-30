import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { SimpleDataTable } from "@/components/SimpleDataTable";

interface CapRound {
  name: string;
  shares: number;
  amount: {
    value: number;
    currency: string;
  };
}

const capRoundColumns: ColumnDef<CapRound>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "shares",
    header: "Shares",
    cell: ({ row }) => {
      const shares = row.getValue("shares");
      return <div>{(shares as number).toLocaleString()}</div>;
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = row.getValue("amount") as CapRound["amount"];
      let currencyCode = amount.currency;
      if (currencyCode === "$" || !currencyCode) {
        currencyCode = "USD";
      }
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currencyCode,
      }).format(amount.value);
      return <div>{formatted}</div>;
    },
  },
];

interface CapRoundsTableProps {
  data: CapRound[];
}

const CapRoundsTable: React.FC<CapRoundsTableProps> = ({ data }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Cap Rounds</h2>
      <SimpleDataTable columns={capRoundColumns} data={data} />
    </div>
  );
};

export default CapRoundsTable;
