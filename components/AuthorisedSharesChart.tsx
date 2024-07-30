import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AuthorisedSharesChartProps {
  data: {
    name: string;
    authorisedShares: number;
  }[];
}

const COLORS = [
  "#4299E1",
  "#48BB78",
  "#F6AD55",
  "#F56565",
  "#9F7AEA",
  "#ED64A6",
];

const AuthorisedSharesChart: React.FC<AuthorisedSharesChartProps> = ({
  data,
}) => {
  return (
    <Card className="h-[450px]">
      <CardHeader>
        <CardTitle className="text-gray-800">
          Authorised Shares Distribution
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[370px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="authorisedShares"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AuthorisedSharesChart;
