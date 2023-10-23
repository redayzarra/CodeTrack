"use client";

import React, { useRef, useEffect } from "react";
import { Card, Text } from "@radix-ui/themes";
import Chart, { Chart as ChartJS } from "chart.js/auto"; // Import the Chart type

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueChart = ({ open, inProgress, closed }: Props) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<ChartJS | null>(null); // Specify the type here

  const data = {
    labels: ["Open", "In Progress", "Closed"],
    datasets: [
      {
        label: "Issues",
        data: [open, inProgress, closed],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    if (chartRef && chartRef.current) {
      // Destroy the old chart instance if it exists
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      // Create a new chart instance and store it in the ref
      chartInstanceRef.current = new Chart(chartRef.current, {
        type: "bar",
        data: data,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [chartRef, data]);

  return (
    <Card>
      <canvas ref={chartRef} height={200}></canvas>
    </Card>
  );
};

export default IssueChart;
