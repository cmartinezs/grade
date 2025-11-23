"use client";

import { Card } from "react-bootstrap";
import { Chart } from "react-google-charts";

interface PieChartCardProps {
  title: string;
  icon?: string;
  data: (string | number)[][];
  options?: Record<string, unknown>;
  headerColor?: string;
}

export function PieChartCard({
  title,
  icon,
  data,
  options,
  headerColor = "#6c757d",
}: PieChartCardProps) {
  const defaultOptions = {
    pieHole: 0.4,
    is3D: false,
    legend: { position: "bottom" },
    chartArea: { width: "90%", height: "70%" },
    ...options,
  };

  return (
    <Card className="shadow-sm border-0 h-100">
      <Card.Header
        className="text-white border-0"
        style={{ backgroundColor: headerColor }}
      >
        <h5 className="mb-0">
          {icon && <span className="me-2">{icon}</span>}
          {title}
        </h5>
      </Card.Header>
      <Card.Body>
        {data.length > 1 ? (
          <Chart
            chartType="PieChart"
            data={data}
            options={defaultOptions}
            width="100%"
            height="300px"
          />
        ) : (
          <div className="text-center text-muted py-5">
            <p>No hay datos disponibles</p>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
