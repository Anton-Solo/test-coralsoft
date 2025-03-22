import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { COLORS } from "../../constants"

interface OriginData {
    name: string;
    value: number;
}

interface TopOriginsProps {
    originData: OriginData[];
}
  
export const TopOrigins = ({ originData }: TopOriginsProps) => {
    return (
        <div className="bg-white dark:bg-gray-300 p-4 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Top Origins</h2>
            <div className="h-[300px]">
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={originData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label>
                            {originData.map((_, index) => (
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
  