import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface LifeSpanData {
    name: string;
    years: number;
}

interface LifeSpanProps {
    lifeSpanData: LifeSpanData[];
}
  
export const LifeSpan = ({ lifeSpanData }: LifeSpanProps) => {
    return (
        <div className="bg-white dark:bg-gray-300 p-4 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Life Span Distribution</h2>
            <div className="h-[300px]">
                <ResponsiveContainer>
                    <LineChart data={lifeSpanData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="years" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
  