import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ShareClassType } from "ocx-parser";

interface SummaryTableProps {
  data: {
    shareClassType: ShareClassType;
    name: string;
    authorisedShares: number;
    outstandingShares: number;
    fullyDilutedShares: number;
    dilutedSharesPercentage: number;
    votingPower: number;
    votingPercentage: number;
  }[];
}

const SummaryTable: React.FC<SummaryTableProps> = ({ data }) => {
  const groupedData = data.reduce((acc, item) => {
    if (!acc[item.shareClassType]) {
      acc[item.shareClassType] = [];
    }
    acc[item.shareClassType].push(item);
    return acc;
  }, {} as Record<ShareClassType, typeof data>);

  const orderOfTypes: ShareClassType[] = [
    ShareClassType.COMMON,
    ShareClassType.PREFERRED,
    ShareClassType.WARRANT,
    ShareClassType.STOCK_PLAN,
  ];

  const formatShareClassType = (type: ShareClassType) => {
    return type
      .split(/(?=[A-Z])/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const totals = data.reduce(
    (acc, item) => {
      acc.authorisedShares += item.authorisedShares || 0;
      acc.outstandingShares += item.outstandingShares || 0;
      acc.fullyDilutedShares += item.fullyDilutedShares || 0;
      if (item.shareClassType !== ShareClassType.STOCK_PLAN) {
        acc.votingPower += item.votingPower || 0;
      }
      if (item.shareClassType === ShareClassType.STOCK_PLAN) {
        acc.authorisedShares += item.fullyDilutedShares || 0;
      }
      return acc;
    },
    {
      authorisedShares: 0,
      outstandingShares: 0,
      fullyDilutedShares: 0,
      votingPower: 0,
    }
  );

  // Recalculate voting percentages
  const recalculatedData = data.map((item) => ({
    ...item,
    votingPercentage:
      item.shareClassType !== ShareClassType.STOCK_PLAN
        ? ((item.votingPower || 0) / totals.votingPower) * 100
        : 0,
  }));

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Share Class</TableHead>
          <TableHead>Authorised Shares</TableHead>
          <TableHead>Outstanding Shares</TableHead>
          <TableHead>Fully Diluted Shares</TableHead>
          <TableHead>Diluted Shares %</TableHead>
          <TableHead>Voting Power</TableHead>
          <TableHead>Voting %</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orderOfTypes.map((type) => (
          <React.Fragment key={type}>
            {groupedData[type]?.length > 0 && (
              <TableRow>
                <TableCell colSpan={7} className="bg-gray-100 font-bold">
                  {formatShareClassType(type)}
                </TableCell>
              </TableRow>
            )}
            {groupedData[type]?.map((item) => (
              <TableRow key={`${type}-${item.name}`}>
                <TableCell className="pl-8">{item.name}</TableCell>
                <TableCell>
                  {(item.authorisedShares || 0).toLocaleString()}
                </TableCell>
                <TableCell>
                  {(item.outstandingShares || 0).toLocaleString()}
                </TableCell>
                <TableCell>
                  {(item.fullyDilutedShares || 0).toLocaleString()}
                </TableCell>
                <TableCell>
                  {((item.dilutedSharesPercentage || 0) * 100).toFixed(2)}%
                </TableCell>
                <TableCell>
                  {type === ShareClassType.STOCK_PLAN
                    ? "N/A"
                    : (item.votingPower || 0).toLocaleString()}
                </TableCell>
                <TableCell>
                  {type === ShareClassType.STOCK_PLAN
                    ? "N/A"
                    : `${(item.votingPercentage * 100).toFixed(2)}%`}
                </TableCell>
              </TableRow>
            ))}
          </React.Fragment>
        ))}
        <TableRow className="font-bold">
          <TableCell>Total</TableCell>
          <TableCell>{totals.authorisedShares.toLocaleString()}</TableCell>
          <TableCell>{totals.outstandingShares.toLocaleString()}</TableCell>
          <TableCell>{totals.fullyDilutedShares.toLocaleString()}</TableCell>
          <TableCell>100.00%</TableCell>
          <TableCell>{totals.votingPower.toLocaleString()}</TableCell>
          <TableCell>100.00%</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default SummaryTable;
