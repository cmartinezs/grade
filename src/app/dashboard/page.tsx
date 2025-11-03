"use client";

import { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { EntityStatsCard } from '@/components/EntityStatsCard';
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
        const levelId = course.levelId;
        coursesByLevel[levelId] = (coursesByLevel[levelId] || 0) + 1;
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

  return (
    <Container fluid className="py-4">
      {/* Header */}
      <Row className="mb-5">
        <Col>
          <h1 className="mb-2">📊 Dashboard</h1>
          <p className="text-muted mb-0">Resumen estadístico del sistema educacional</p>
        </Col>
      </Row>

      {/* Niveles Educacionales & Cursos Cards */}
      <Row className="mb-4">
        <EntityStatsCard
          title="Niveles Educacionales"
          icon="📊"
          headerColor="#4A90E2"
          stats={dashboardData.levels}
          totalIcon="📚"
          activeIcon="✅"
          totalColor="#4A90E2"
          activeColor="#2ECC71"
        />

        <EntityStatsCard
          title="Cursos"
          icon="📚"
          headerColor="#17A2B8"
          stats={dashboardData.courses}
          totalIcon="📖"
          activeIcon="✅"
          totalColor="#17A2B8"
          activeColor="#2ECC71"
        >
          {/* Distribution by Level - Only for Courses */}
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
        </EntityStatsCard>
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
