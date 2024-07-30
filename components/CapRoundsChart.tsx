import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface CapRound {
  name: string;
  amount: {
    value: number;
    currency: string;
  };
  shares: number;
}

interface CapRoundsChartProps {
  data: CapRound[];
}

const CapRoundsChart: React.FC<CapRoundsChartProps> = ({ data }) => {
  const chartData = data.map((round) => ({
    name: round.name,
    amount: round.amount.value,
    shares: round.shares,
  }));

  const getCurrencyCode = (currency: string) => {
    return currency === "$" || !currency ? "USD" : currency;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
        <Tooltip
          formatter={(value, name, props) => {
            if (name === "amount") {
              const currencyCode = getCurrencyCode(
                data[props.payload.name].amount.currency
              );
              return [
                new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: currencyCode,
                }).format(value as number),
                "Amount",
              ];
            }
            return [value, name];
          }}
        />
        <Legend />
        <Bar yAxisId="left" dataKey="amount" name="Amount" fill="#8884d8" />
        <Bar yAxisId="right" dataKey="shares" name="Shares" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CapRoundsChart;
