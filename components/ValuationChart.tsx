import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ValuationChartProps {
  data: {
    date: string;
    pricePerShare: number;
    valuationFirm: string;
  }[];
}

const ValuationChart: React.FC<ValuationChartProps> = ({ data }) => {
  return (
    <Card className="w-full h-[400px]">
      <CardHeader>
        <CardTitle>Valuation Time Series</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-2 border">
                      <p>Date: {data.date}</p>
                      <p>Price Per Share: ${data.pricePerShare.toFixed(2)}</p>
                      <p>Valuation Firm: {data.valuationFirm}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="pricePerShare"
              stroke="hsl(var(--primary))"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ValuationChart;
