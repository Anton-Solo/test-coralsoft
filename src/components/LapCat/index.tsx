import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { COLORS } from "../../constants"

interface LapData {
    name: string;
    value: number;
}

interface LapCatProps {
    lapData: LapData[];
}
  
export const LapCat = ({ lapData }: LapCatProps) => {
    return (
        <div className="bg-white dark:bg-gray-500 p-4 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Lap Cat Distribution</h2>
            <div className="h-[300px]">
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={lapData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label>
                            {lapData.map((_, index: number) => (
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
  