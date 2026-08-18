import { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import API from './axios'; 

export default function AnalyticsDashboard() {
    const [dashboardData, setDashboardData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch analytics data from the backend
        API.get('/dashboard')
            .then(response => {
                setDashboardData(response.data.data.dashboard);
            })
            .catch(error => {
                console.error("Failed to load dashboard analytics from Data Science engine", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="p-8 text-center text-gray-500 text-sm">Loading AI Analytics Dashboard...</div>;
    if (!dashboardData) return <div className="p-8 text-center text-red-500 text-sm">No dashboard analytics found.</div>;

    const donutChart = dashboardData.visuals?.tasks_status_donut;

    return (
        <div className="flex w-full flex-1 flex-col items-start overflow-auto p-6 md:p-16 bg-[#f8f9ff]">
            <div className="flex w-full max-w-screen-xl flex-col items-start gap-10">
                
                {/* Title & Header */}
                <div className="flex flex-col items-start gap-2">
                    <h1 className="m-0 font-['Geist-Bold',Helvetica] text-4xl font-bold text-[#0b1c30]">
                        Analytics Dashboard
                    </h1>
                    <p className="m-0 text-base text-[#434655]">
                        Insights and performance metrics powered by your Data Science engine.
                    </p>
                </div>

                {/* KPI Cards */}
                <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-[#c3c6d7] shadow-sm flex flex-col gap-2">
                        <span className="text-sm font-medium text-[#434655]">Task Completion Rate</span>
                        <span className="text-3xl font-bold text-[#0b1c30]">
                            {dashboardData.kpis?.task_completion_rate}%
                        </span>
                    </div>
                </div>

                {/* Visuals / Plotly Chart Section */}
                {donutChart && (
                    <div className="w-full bg-white p-6 rounded-xl border border-[#c3c6d7] shadow-sm flex flex-col gap-4">
                        <h3 className="font-['Geist-SemiBold',Helvetica] text-xl font-semibold text-[#0b1c30]">
                            Tasks Status Breakdown
                        </h3>
                        <div className="w-full h-[400px]">
                            <Plot
                                data={donutChart.data}
                                layout={{
                                    ...donutChart.layout,
                                    autosize: true,
                                    paper_bgcolor: 'transparent',
                                    plot_bgcolor: 'transparent',
                                    margin: { t: 30, b: 30, l: 30, r: 30 },
                                }}
                                useResizeHandler={true}
                                style={{ width: '100%', height: '100%' }}
                            />
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}