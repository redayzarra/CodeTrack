"use client";

import React, { useRef, useEffect } from "react";
import { Card, Text } from "@radix-ui/themes";
import Chart, { Chart as ChartJS } from "chart.js/auto";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueChart = ({ open, inProgress, closed }: Props) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<ChartJS | null>(null);

  const data = {
    labels: ["Open", "In Progress", "Closed"],
    datasets: [
      {
        label: "Issues",
        data: [open, inProgress, closed],
        barThickness: 60,
        borderRadius: 5,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 165, 0, 0.2)", // Orange for "In Progress"
          "rgba(0, 128, 0, 0.2)", // Green for "Closed"
        ],
        borderColor: [
          "rgb(255, 99, 132)", // Red for "Open"
          "rgb(255, 165, 0)", // Orange for "In Progress"
          "rgb(0, 128, 0)", // Green for "Closed"
        ],
        borderWidth: 1.5,
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
