"use client";

import React, { useRef, useEffect, useMemo } from "react";
import { Card } from "@radix-ui/themes";
import Chart, { Chart as ChartJS } from "chart.js/auto";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueChart = ({ open, inProgress, closed }: Props) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<ChartJS | null>(null);

  // Use useMemo to memoize 'data' so it doesn't change every render
  const data = useMemo(() => {
    return {
      labels: ["Open", "In Progress", "Closed"],
      datasets: [
        {
          label: "Issues",
          data: [open, inProgress, closed],
          barThickness: 60,
          borderRadius: 5,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)", // Red for "Open"
            "rgba(255, 165, 0, 0.2)", // Orange for "In Progress"
            "rgba(0, 128, 0, 0.2)", // Green for "Closed"
          ],
          borderColor: [
            "rgb(255, 99, 132)", 
            "rgb(255, 165, 0)", 
            "rgb(0, 128, 0)", 
          ],
          borderWidth: 1.5,
        },
      ],
    };
  }, [open, inProgress, closed]); // Dependencies for useMemo

  useEffect(() => {
    if (chartRef.current) {
      // Destroy the old chart instance if it exists
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      // Create a new chart instance and store it in the ref
      chartInstanceRef.current = new Chart(chartRef.current, {
        type: "bar",
        data: data, // This 'data' is the memoized one from above
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
    // Cleanup function to prevent memory leaks
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data]); // useEffect will only re-run if 'data' changes

  return (
    <Card>
      <canvas ref={chartRef} width="100%" height="100%"></canvas>
    </Card>
  );
};

export default IssueChart;
