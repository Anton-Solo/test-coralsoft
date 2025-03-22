import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { COLORS } from "../../constants"

interface IndoorData {
    name: string;
    value: number;
}

interface IndoorChartProps {
    indoorData: IndoorData[];
}
  
export const IndoorChart = ({ indoorData }: IndoorChartProps) => {
    return (
        <div className="bg-white dark:bg-gray-400 p-4 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">
                Indoor vs Outdoor Preference
            </h2>
            <div className="h-[300px]">
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={indoorData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label>
                            {indoorData.map((_, index) => (
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
            </div>
        </div>
    );
}
  