import React, { useEffect, useState } from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import { useSession } from "next-auth/react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const { data: session } = useSession();
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: { data: number[]; backgroundColor:string[];hoverOffset:number;cutout:string;}[];
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
        console.log("Sales Data:", salesData);

        let upiCount = 0;
        let bankCount = 0;

        salesData.forEach((d: { provider: string }) => {
          if (d.provider === "UPI") {
            upiCount++;
          } else {
            bankCount++;
          }
        });

        console.log("UPI Count:", upiCount, "Bank Count:", bankCount);

        setChartData({
          labels: ["UPI", "Bank Transfers"],
          datasets: [
            {
              data: [upiCount, bankCount],
              backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
              hoverOffset: 4,
              cutout: "20%",
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
    <div className="flex mx-auto justify-center items-center">
      {chartData.labels.length > 0 ? <Doughnut data={chartData} /> : <p>Loading...</p>}
    </div>
  );
};

export default PieChart;
