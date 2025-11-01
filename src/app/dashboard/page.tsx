"use client";

import { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { levelStore } from '@/lib/levelStore';
import { courseStore } from '@/lib/courseStore';
import { EducationalLevel } from '@/types/level';
import { Course } from '@/types/course';

interface EntityStats {
  total: number;
  active: number;
  inactive: number;
  activePercentage: number;
  inactivePercentage: number;
}

interface DashboardData {
  levels: EntityStats & {
    items: EducationalLevel[];
  };
  courses: EntityStats & {
    items: Course[];
    byLevel: Record<string, number>;
  };
}

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    levels: {
      total: 0,
      active: 0,
      inactive: 0,
      activePercentage: 0,
      inactivePercentage: 0,
      items: [],
    },
    courses: {
      total: 0,
      active: 0,
      inactive: 0,
      activePercentage: 0,
      inactivePercentage: 0,
      items: [],
      byLevel: {},
    },
  });

  useEffect(() => {
    try {
      // Get levels
      const levelsResult = levelStore.getPaginatedLevels(1, 1000, { includeInactive: true });
      const levels = levelsResult.levels;
      const activeLevels = levels.filter((l) => l.isActive).length;
      const inactiveLevels = levels.length - activeLevels;

      // Get courses
      const coursesResult = courseStore.getPaginatedCourses(1, 1000, { includeInactive: true });
      const courses = coursesResult.courses;
      const activeCourses = courses.filter((c) => c.active).length;
      const inactiveCourses = courses.length - activeCourses;

      // Calculate courses by level
      const coursesByLevel: Record<string, number> = {};
      courses.forEach((course) => {
        const level = course.level || 'Sin nivel';
        coursesByLevel[level] = (coursesByLevel[level] || 0) + 1;
      });

      setDashboardData({
        levels: {
          total: levels.length,
          active: activeLevels,
          inactive: inactiveLevels,
          activePercentage: levels.length > 0 ? (activeLevels / levels.length) * 100 : 0,
          inactivePercentage: levels.length > 0 ? (inactiveLevels / levels.length) * 100 : 0,
          items: levels,
        },
        courses: {
          total: courses.length,
          active: activeCourses,
          inactive: inactiveCourses,
          activePercentage: courses.length > 0 ? (activeCourses / courses.length) * 100 : 0,
          inactivePercentage: courses.length > 0 ? (inactiveCourses / courses.length) * 100 : 0,
          items: courses,
          byLevel: coursesByLevel,
        },
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  }, []);

  const KPICard = ({ 
    icon, 
    label, 
    value, 
    color 
  }: {
    icon: string;
    label: string;
    value: number;
    color: string;
  }) => (
    <Card className={`border-0 h-100`}>
      <Card.Body className={`text-white d-flex align-items-center justify-content-between`} style={{
        backgroundColor: color,
        padding: '1.5rem'
      }}>
        <div>
          <Card.Text className="mb-1 opacity-75 small">{label}</Card.Text>
          <Card.Title className="mb-0 fs-2 fw-bold">{value}</Card.Title>
        </div>
        <div className="fs-1">{icon}</div>
      </Card.Body>
    </Card>
  );

  // Note: Pie charts used instead of progress bars for state visualization

  return (
    <Container fluid className="py-4">
      {/* Header */}
      <Row className="mb-5">
        <Col>
          <h1 className="mb-2">📊 Dashboard</h1>
          <p className="text-muted mb-0">Resumen estadístico del sistema educacional</p>
        </Col>
      </Row>

      {/* Niveles Educacionales Card */}
      <Row className="mb-4">
        <Col lg={6}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Header className="bg-primary text-white border-0">
              <h5 className="mb-0">📊 Niveles Educacionales</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                {/* Left: KPIs stacked */}
                <Col xs={6}>
                  <div className="mb-3">
                    <KPICard
                      icon="📚"
                      label="Total"
                      value={dashboardData.levels.total}
                      color="#4A90E2"
                    />
                  </div>
                  <div className="mb-3">
                    <KPICard
                      icon="✅"
                      label="Activos"
                      value={dashboardData.levels.active}
                      color="#2ECC71"
                    />
                  </div>
                </Col>

                {/* Right: Pie Chart */}
                <Col xs={6} className="d-flex align-items-center justify-content-center">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Activos', value: dashboardData.levels.active },
                          { name: 'Inactivos', value: dashboardData.levels.inactive },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={70}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        <Cell fill="#2ECC71" />
                        <Cell fill="#E8E8E8" />
                      </Pie>
                      <Tooltip formatter={(value) => `${value}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        {/* Cursos Card */}
        <Col lg={6}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Header className="bg-info text-white border-0">
              <h5 className="mb-0">📚 Cursos</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                {/* Left: KPIs stacked */}
                <Col xs={6}>
                  <div className="mb-3">
                    <KPICard
                      icon="📖"
                      label="Total"
                      value={dashboardData.courses.total}
                      color="#17A2B8"
                    />
                  </div>
                  <div className="mb-3">
                    <KPICard
                      icon="✅"
                      label="Activos"
                      value={dashboardData.courses.active}
                      color="#2ECC71"
                    />
                  </div>
                </Col>

                {/* Right: Pie Chart */}
                <Col xs={6} className="d-flex align-items-center justify-content-center">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Activos', value: dashboardData.courses.active },
                          { name: 'Inactivos', value: dashboardData.courses.inactive },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={70}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        <Cell fill="#2ECC71" />
                        <Cell fill="#E8E8E8" />
                      </Pie>
                      <Tooltip formatter={(value) => `${value}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </Col>
              </Row>

              {/* Distribution by Level */}
              <div className="mt-4 pt-4 border-top">
                <h6 className="fw-bold mb-3">Distribución por Nivel</h6>
                <div className="space-y-2">
                  {Object.entries(dashboardData.courses.byLevel)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 8)
                    .map(([level, count]) => {
                      const total = dashboardData.courses.total;
                      const percentage = (count / total) * 100;
                      return (
                        <div key={level} className="mb-2">
                          <div className="d-flex justify-content-between mb-1 small">
                            <span className="text-truncate">{level}</span>
                            <span className="text-muted fw-bold">{count}</span>
                          </div>
                          <div className="progress" style={{ height: '8px' }}>
                            <div
                              className="progress-bar"
                              style={{ width: `${percentage}%`, backgroundColor: '#17A2B8' }}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Coming Soon */}
      <Row className="mt-5">
        <Col lg={6} className="mb-4">
          <Card className="shadow-sm border-0 opacity-50">
            <Card.Header className="bg-warning text-dark border-0">
              <h5 className="mb-0">❓ Preguntas (Próximo)</h5>
            </Card.Header>
            <Card.Body className="text-center text-muted">
              <p>Estadísticas de preguntas próximamente...</p>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6} className="mb-4">
          <Card className="shadow-sm border-0 opacity-50">
            <Card.Header className="bg-danger text-white border-0">
              <h5 className="mb-0">📋 Evaluaciones (Próximo)</h5>
            </Card.Header>
            <Card.Body className="text-center text-muted">
              <p>Estadísticas de evaluaciones próximamente...</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
