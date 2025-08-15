import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { useSession } from "next-auth/react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  LineElement,
  PointElement,
  Legend,
  Title,
  BarElement,
  Tooltip,
} from "chart.js";
import axios from "axios";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = () => {
  const { data: session } = useSession();
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: { data: number[]; backgroundColor: string; borderWidth: number; tension: number }[];
  }>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    if (!session?.user?.id) return;

    const fetchData = async () => {
      try {
        const response = await axios.get("/api/onramp", {
          params: { userId: 26 },
        });

        
        let upiCount = 0;
        let bankCount = 0;

        const salesData = response.data; 
        
        salesData.forEach((d: { provider: string }) => {
            if (d.type === "Credited") {
              upiCount++
            } else {
              bankCount++;
            }
          });
        
        
        setChartData({
          labels: ["Crideted","Debited"],
          datasets: [
            {
              data: upiCount,
              backgroundColor: "rgba(70, 127, 90)",
              borderColor: "rgba(13, 180, 185)",
              borderWidth: 1,
              tension: 0.2,
            },
            {
                data: bankCount,
                backgroundColor:"rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2,
                tension: 0.2,
              },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [session]);

  return (
    <div className="flex max-w-3xl mx-auto justify-center items-center">
      {chartData.labels.length > 0 ? <Bar data={chartData} /> : <p>Loading...</p>}
      
    </div>
  );
};

export default BarChart;