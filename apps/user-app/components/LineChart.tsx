import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useSession } from "next-auth/react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  LineElement,
  PointElement,
  Legend,
  Title,
} from "chart.js";
import axios from "axios";

ChartJS.register(LinearScale, CategoryScale, LineElement, PointElement, Legend, Title);

const LineChart = () => {
  const { data: session } = useSession();
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: { data: number[]; borderColor: string; borderWidth: number; tension: number }[];
  }>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    if (!session?.user?.id) return;

    const fetchData = async () => {
      try {
        const response = await axios.get("/api/onramp", {
          params: { userId: session.user.id },
        });



        

        const salesData = response.data; 
            console.log(response.data);
        const balance = salesData.map((d: { amount: Number; })=>(d.amount))    
        const datesOnly = salesData.map((d: { startTime: string; }) => d.startTime.split("T")[0]);
        console.log(datesOnly);
        
        // const d = date.split[" "]
        // console.log(d);
        
            
        setChartData({
          labels: datesOnly,
          datasets: [
            {
              data: balance,
              borderColor: "purple",
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
    <div className="flex max-w-3xl mx-auto justify-center items-center min-h-screen">
      {chartData.labels.length > 0 ? <Line data={chartData} /> : <p>Loading...</p>}
      
    </div>
  );
};

export default LineChart;
