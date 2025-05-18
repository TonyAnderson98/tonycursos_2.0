// src/app/components/ProgressDonut.tsx
"use client";
import { PieChart, Pie, Cell } from "recharts";

interface ProgressDonutProps {
    completed: number;
    total: number;
}

const COLORS = ["#00c49f", "#e0e0e0"]; // verde para concluído, cinza claro para restante

export default function ProgressDonut({ completed, total }: ProgressDonutProps) {
    const percentage = Math.round((completed / total) * 100);

    const data = [
        { name: "Concluído", value: completed },
        { name: "Restante", value: total - completed },
    ];

    return (
        <div style={{ textAlign: "center" }}>
            <PieChart width={120} height={120}>
                <Pie
                    data={data}
                    innerRadius={40}
                    outerRadius={55}
                    paddingAngle={0}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                </Pie>
            </PieChart>
            <div style={{
                fontWeight: "bold",
                fontSize: "18px",
                color: "white",
            }}>
                {percentage}%
            </div>
        </div>
    );
}
