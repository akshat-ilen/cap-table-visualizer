import { CapTable, CapRound, Stakeholder, Share } from "ocx-parser";

export function calculateTotalFundsRaised(
  rounds: CapRound[],
  stakeholders: Stakeholder[]
): number {
  return rounds.reduce((total, round) => {
    const roundShares = getTotalSharesForRound(stakeholders, round.name);
    const roundTotal =
      roundShares *
      (round.issuePrice?.value || 0) *
      (round.liquidationMultiple || 1);
    return total + roundTotal;
  }, 0);
}

export function getTotalSharesForRound(
  stakeholders: Stakeholder[],
  roundName: string
): number {
  return stakeholders.reduce((total, stakeholder) => {
    const roundShares = stakeholder.sharesByRound.find(
      (share) => share.name === roundName
    );
    return total + (roundShares ? roundShares.shares : 0);
  }, 0);
}

export function getCapRoundsData(
  capTable: CapTable
): { name: string; amount: number; shares: number }[] {
  return capTable.rounds.map((round) => ({
    name: round.name,
    amount: (round.issuePrice?.value || 0) * (round.liquidationMultiple || 1),
    shares: getTotalSharesForRound(capTable.stakeholders, round.name),
  }));
}

export function getStakeholderData(stakeholder: Stakeholder): {
  name: string;
  shares: number;
  type: string;
  sharesByRound: { [key: string]: number };
  sharesByStockPlan: { [key: string]: number };
} {
  const totalShares =
    stakeholder.sharesByRound.reduce(
      (total, share) => total + share.shares,
      0
    ) +
    stakeholder.sharesByStockPlan.reduce(
      (total, share) => total + share.shares,
      0
    );
  return {
    name: stakeholder.name,
    shares: totalShares,
    type: stakeholder.additionaDetails.secondaryStakeholderType || "N/A",
    sharesByRound: stakeholder.sharesByRound.reduce((acc, share) => {
      acc[share.name] = share.shares;
      return acc;
    }, {} as { [key: string]: number }),
    sharesByStockPlan: stakeholder.sharesByStockPlan.reduce((acc, share) => {
      acc[share.name] = share.shares;
      return acc;
    }, {} as { [key: string]: number }),
  };
}

export function getAvailableForGrantTotal(availableForGrant: Share[]): number {
  return availableForGrant.reduce((total, grant) => total + grant.shares, 0);
}
