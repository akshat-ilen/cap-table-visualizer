import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StakeholderTypeChartProps {
  data: {
    type: string;
    shares: number;
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

const StakeholderTypeChart: React.FC<StakeholderTypeChartProps> = ({
  data,
}) => {
  return (
    <Card className="h-[400px]">
      <CardHeader>
        <CardTitle className="text-gray-800">
          Stakeholder Type Distribution
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="shares"
              nameKey="type"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default StakeholderTypeChart;
