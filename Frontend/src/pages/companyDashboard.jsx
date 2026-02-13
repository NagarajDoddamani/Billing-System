import { useEffect, useState } from "react";
import API from "../services/api";
import SummaryCard from "../components/SummaryCard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer } from "recharts";

function CompanyDashboard() {
  const [daily, setDaily] = useState(null);
  const [monthly, setMonthly] = useState(null);
  const companyId = localStorage.getItem("companyId");
  const [chartData, setChartData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const dailyData = await API.get(
        `/bills/daily/summary?companyId=${companyId}`
      );

      const monthlyData = await API.get(
        `/bills/monthly/summary?companyId=${companyId}`
      );

      setDaily(dailyData.data);
      setMonthly(monthlyData.data);

      // 🔹 Prepare chart data (group by date)
      const grouped = {};

      monthlyData.data.bills.forEach((bill) => {
        const date = new Date(bill.createdAt).getDate();

        if (!grouped[date]) {
          grouped[date] = 0;
        }

        grouped[date] += bill.grandTotal;
      });

      const formatted = Object.keys(grouped).map((day) => ({
        day,
        sales: grouped[day]
      }));

      setChartData(formatted);
    };

    fetchData();
  }, []);

  if (!daily || !monthly) return <div>Loading...</div>;

  return (
    <div>

      <h1 className="text-4xl font-bold text-[#2872A1] mb-10">
        Company Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        <SummaryCard title="Today's Sales" value={`₹ ${daily.totalSales}`} />
        <SummaryCard title="Today's Bills" value={daily.count} />
        <SummaryCard title="Monthly Sales" value={`₹ ${monthly.totalSales}`} />
        <SummaryCard title="Monthly Bills" value={monthly.count} />
      </div>

      {/* Sales Graph */}
      <div className="bg-white p-6 rounded-2xl shadow-md mt-10">
        <h2 className="text-2xl font-semibold mb-6 text-[#2872A1]">
          Monthly Sales Trend
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#2872A1"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>


    </div>
  );
}

export default CompanyDashboard;
