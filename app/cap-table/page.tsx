"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CapTable } from "ocx-parser";
import Summary from "@/components/Summary";
import AuthorisedSharesChart from "@/components/AuthorisedSharesChart";
import StakeholderTypeChart from "@/components/StakeholderTypeChart";
import SummaryTable from "@/components/SummaryTable";
import ValuationChart from "@/components/ValuationChart";
import StakeholdersTable from "@/components/StakeholdersTable";
import { Button } from "@/components/ui/button";

export default function CapTablePage() {
  const [capTable, setCapTable] = useState<CapTable | null>(null);
  const [processedData, setProcessedData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem("capTableData");
    if (storedData) {
      const parsedData = JSON.parse(storedData) as CapTable;
      setCapTable(parsedData);
      processCapTableData(parsedData);
    }
  }, []);

  const processCapTableData = (data: CapTable) => {
    const totalAuthorisedShares = data.summary.capTableSummary.reduce(
      (sum, item) => sum + (item.authorisedShares || 0),
      0
    );

    const totalOutstandingShares = data.summary.capTableSummary.reduce(
      (sum, item) => sum + (item.outshandingShares || 0),
      0
    );

    const totalVotingPower = data.summary.capTableSummary.reduce(
      (sum, item) =>
        sum + (item.fullDilutedShares || 0) * (item.votingMutiplier || 1),
      0
    );

    const summaryTableData = data.summary.capTableSummary.map((item) => ({
      shareClassType: item.type,
      name: item.name,
      authorisedShares: item.authorisedShares || 0,
      outstandingShares: item.outshandingShares || 0,
      fullyDilutedShares: item.fullDilutedShares || 0,
      dilutedSharesPercentage: item.dilutePercentage || 0,
      votingPower: (item.fullDilutedShares || 0) * (item.votingMutiplier || 1),
      votingPercentage:
        ((item.fullDilutedShares || 0) * (item.votingMutiplier || 1)) /
        totalVotingPower,
    }));

    const valuationChartData = data.valuations.map((valuation) => ({
      date: valuation.date,
      pricePerShare: valuation.pricePerShare,
      valuationFirm: valuation.firm,
    }));

    setProcessedData({
      totalAuthorisedShares,
      totalOutstandingShares,
      summaryTableData,
      valuationChartData,
    });
  };

  if (!capTable || !processedData) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-white">
        <div className="bg-white border border-gray-200 p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-black">
            No Cap Table Data Found
          </h1>
          <Button
            onClick={() => router.push("/")}
            className="bg-black text-white hover:bg-gray-800"
          >
            Upload a File
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-6 bg-background text-foreground">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Cap Table Details</h1>
          <Button onClick={() => router.push("/")}>Analyze Another File</Button>
        </div>
        <Summary
          entityName={capTable.entityName}
          totalStakeholders={capTable.stakeholders.length}
          totalAuthorisedShares={processedData.totalAuthorisedShares}
          totalOutstandingShares={processedData.totalOutstandingShares}
          availableForGrant={capTable.availableForGrant.reduce(
            (sum, grant) => sum + grant.shares,
            0
          )}
        />
        <div className="bg-card rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Cap Table Summary</h2>
          <SummaryTable data={processedData.summaryTableData} />
        </div>
        <ValuationChart data={processedData.valuationChartData} />
        <div className="bg-card rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Stakeholders</h2>
          <StakeholdersTable data={capTable.stakeholders} />
        </div>
      </div>
    </main>
  );
}
