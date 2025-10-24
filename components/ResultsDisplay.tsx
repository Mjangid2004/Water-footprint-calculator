
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { FootprintResult } from '../types';

interface ResultsDisplayProps {
  results: FootprintResult;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
    const [client, setClient] = useState(false);

    useEffect(() => {
        setClient(true);
    }, []);

    const data = [
        { name: 'Diet', Liters: results.dietFootprint, fill: '#3b82f6' },
        { name: 'Hygiene', Liters: results.hygieneFootprint, fill: '#10b981' },
        { name: 'Consumption', Liters: results.consumptionFootprint, fill: '#f59e0b' },
    ];
    
    return (
        <div id="results" className="p-8 bg-white rounded-2xl shadow-lg border-2 border-blue-200 animate-fade-in">
            <h2 className="text-3xl font-bold text-center text-blue-900 mb-4">Your Estimated Daily Water Footprint</h2>
            <div className="text-center mb-8">
                <p className="text-7xl font-extrabold text-blue-600 tracking-tight">{results.totalFootprint.toLocaleString()}</p>
                <p className="text-xl text-gray-600">Liters per Day</p>
            </div>

            <h3 className="text-2xl font-semibold text-center text-blue-900 mb-4">Breakdown</h3>
            <div style={{ width: '100%', height: 300 }}>
               {client && (
                 <ResponsiveContainer>
                    <BarChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Liters" name="Liters per day" fill="#8884d8" barSize={50}>
                            {data.map((entry, index) => (
                                <Bar key={`cell-${index}`} dataKey="Liters" fill={entry.fill} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
               )}
            </div>
        </div>
    );
};
