import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { AuthContext } from "../Contetexts/AuthProvider"; 

const COLORS = ["#22c55e", "#3b82f6", "#ef4444"];

const DashboardHome = () => {
  const { user } = useContext(AuthContext); 
  const [stats, setStats] = useState([]);
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);

  const API = "https://plate-share-server-blue.vercel.app"; 

  useEffect(() => {
    if (!user?.email) return; 

    const fetchDashboardData = async () => {
      try {
        
        const myFoodsRes = await axios.get(`${API}/myFoods/${user.email}`);
        const requestsRes = await axios.get(`${API}/requests/user/${user.email}`);

        const myFoods = myFoodsRes.data || [];
        const requests = requestsRes.data || [];

        
        const mealsSaved = myFoods.reduce((acc, f) => {
          const qty = parseInt(f.food_quantity) || 0;
          return acc + qty;
        }, 0);

        setStats([
          { title: "Foods Shared", value: myFoods.length, color: "bg-primary" },
          { title: "Requests Made", value: requests.length, color: "bg-secondary" },
           { title: "Meals Saved", value: mealsSaved, color: "bg-green-500" },
          // { title: "Active Days", value: 2, color: "bg-orange-500" }, // compute if you have a log
        ]);

        
        const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        const barChartData = weekDays.map((day) => {
          const count = myFoods.filter(f => {
            const date = new Date(f.created_at);
            const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
            return dayName === day;
          }).length;
          return { name: day, food: count };
        });
        setBarData(barChartData);

        
        const collected = myFoods.filter(f => f.food_status === "Collected").length;
        const available = myFoods.filter(f => f.food_status === "Available").length;
        const expired = myFoods.filter(f => f.food_status === "Expired").length;
        setPieData([
          { name: "Collected", value: collected },
          { name: "Available", value: available },
          { name: "Expired", value: expired },
        ]);

        // Recent Activities (latest 5 foods)
        const recent = myFoods
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 5)
          .map((f) => ({
            id: f._id,
            food: f.food_name,
            status: f.food_status,
            date: new Date(f.created_at).toLocaleDateString(),
          }));
        setRecentActivities(recent);

      } catch (err) {
        console.error(err);
      }
    };

    fetchDashboardData();
  }, [user]);

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome to your PlateShare dashboard.</p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow border border-gray-200 dark:border-gray-700"
          >
            <div className={`w-12 h-12 rounded-lg ${stat.color} mb-4`}></div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {stat.value}
            </h3>
            <p className="text-gray-500">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* BAR CHART */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow border border-gray-200 dark:border-gray-700 text-white">
          <h3 className="text-xl font-semibold mb-4 text-white">Weekly Food Sharing</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="food" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4 text-white">Food Status Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white  rounded-xl p-6 shadow border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="py-3">Food</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentActivities.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-100 dark:border-gray-700"
                >
                  <td className="py-3">{item.food}</td>
                  <td
                    className={`font-medium ${
                      item.status === "Collected"
                        ? "text-green-500"
                        : item.status === "Available"
                        ? "text-blue-500"
                        : "text-red-500"
                    }`}
                  >
                    {item.status}
                  </td>
                  <td className="text-gray-800">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
