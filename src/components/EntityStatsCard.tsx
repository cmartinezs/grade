"use client";

import { Col, Card, Row } from 'react-bootstrap';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { KPICard } from './KPICard';

interface EntityStats {
  total: number;
  active: number;
  inactive: number;
  activePercentage: number;
  inactivePercentage: number;
}

interface EntityStatsCardProps {
  title: string;
  icon: string;
  headerColor: string;
  stats: EntityStats;
  totalIcon: string;
  activeIcon: string;
  totalColor: string;
  activeColor: string;
  children?: React.ReactNode;
}

export const EntityStatsCard = ({
  title,
  icon,
  headerColor,
  stats,
  totalIcon,
  activeIcon,
  totalColor,
  activeColor,
  children
}: EntityStatsCardProps) => {

  return (
    <Col lg={6}>
      <Card className="shadow-sm border-0 h-100">
        <Card.Header className={`text-white border-0`} style={{ backgroundColor: headerColor }}>
          <h5 className="mb-0">{icon} {title}</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            {/* Left: KPIs stacked */}
            <Col xs={6}>
              <div className="mb-3">
                <KPICard
                  icon={totalIcon}
                  label="Total"
                  value={stats.total}
                  color={totalColor}
                />
              </div>
              <div className="mb-3">
                <KPICard
                  icon={activeIcon}
                  label="Activos"
                  value={stats.active}
                  color={activeColor}
                />
              </div>
            </Col>

            {/* Right: Pie Chart */}
            <Col xs={6} className="d-flex align-items-center justify-content-center">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Activos', value: stats.active, percentage: stats.activePercentage, fill: activeColor },
                      { name: 'Inactivos', value: stats.inactive, percentage: stats.inactivePercentage, fill: '#333333' },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={75}
                    paddingAngle={2}
                    dataKey="value"
                    label={(entry: { payload?: { percentage?: number } }) => {
                      const percentage = entry.payload?.percentage || 0;
                      return `${Math.round(percentage)}%`;
                    }}
                    labelLine={false}
                  >
                    <Cell fill={activeColor} />
                    <Cell fill="#333333" />
                  </Pie>
                  <Tooltip 
                    formatter={(value) => `${value}`}
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '4px', color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Col>
          </Row>

          {/* Additional children content */}
          {children}
        </Card.Body>
      </Card>
    </Col>
  );
};
