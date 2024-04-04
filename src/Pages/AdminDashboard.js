import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const AdminDashboard = () => {
    const [report, setReport] = useState("");
    const [plotsPerMonth, setPlotsPerMonth] = useState([]);
    const fetchReport = async () => {
        try {
            const response = await axios.get('/api/admin/report');
            setReport(response.data);

            const monthlyPlots = response.data;
            const formattedData = Object.entries(monthlyPlots).map(([month, count]) => ({
                month,
                count,
            }));
            setPlotsPerMonth(formattedData);
        } catch (error) {
            console.error('Error fetching report:', error);
        }
    };
    useEffect(() => {
        fetchReport();
    }, []);

    const plotsPerMonthChartData = {
        labels: plotsPerMonth.map((data) => data.month),
        datasets: [
            {
                label: 'Plots per Month',
                data: plotsPerMonth.map((data) => data.count),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 capitalize">Welcome Admin</h1>

            {/*{report ? (*/}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Total Plots</h2>
                        <p className="text-4xl font-bold text-gray-600">{report.totalPlots?"":""}</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Total Plot Owners</h2>
                        <p className="text-4xl font-bold text-gray-600">{report.totalPlotOwners?"":""}</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Total Clients</h2>
                        <p className="text-4xl font-bold text-gray-600">{report.totalClients?"":""}</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6 col-span-2">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Top Plot Owner</h2>
                        <p className="text-lg text-gray-600">Name: {/*{report.topPlotOwner.name?"":""}*/}</p>
                        <p className="text-lg text-gray-600">Email: {/*{report.topPlotOwner.email?"":""}*/}</p>
                        <p className="text-lg text-gray-600">Telephone: {/*{report.topPlotOwner.telephone?"":""}*/}</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6 col-span-3">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Plots per Month</h2>
                        <Bar data={plotsPerMonthChartData} />
                    </div>
                </div>
            {/*) : (*/}
            {/*    <p>Loading...</p>*/}
            {/*)}*/}
        </div>
    );
};

export default AdminDashboard;