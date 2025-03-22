import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface AffectionData {
    name: string;
    value: number;
}

interface AffectionLevelsProps {
    affectionData: AffectionData[];
}
  
export const AffectionLevels = ({ affectionData }: AffectionLevelsProps) => {
    return (
        <div className="bg-white dark:bg-gray-300 p-4 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Affection Levels</h2>
            <div className="h-[300px]">
                <ResponsiveContainer>
                    <BarChart data={affectionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#00C49F" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
  