"use client";

import { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { levelStore } from '@/lib/levelStore';
import { courseStore } from '@/lib/courseStore';

interface DashboardStats {
  totalLevels: number;
  activeLevels: number;
  totalCourses: number;
  activeCourses: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalLevels: 0,
    activeLevels: 0,
    totalCourses: 0,
    activeCourses: 0,
  });

  useEffect(() => {
    try {
      // Get levels stats
      const levelsResult = levelStore.getPaginatedLevels(1, 1000, { includeInactive: true });
      const activeLevels = levelsResult.levels.filter((l) => l.isActive).length;

      // Get courses stats
      const coursesResult = courseStore.getPaginatedCourses(1, 1000, { includeInactive: true });
      const activeCourses = coursesResult.courses.filter((c) => c.active).length;

      setStats({
        totalLevels: levelsResult.total,
        activeLevels,
        totalCourses: coursesResult.total,
        activeCourses,
      });
    } catch (error) {
      console.error('Error loading dashboard stats:', error);
    }
  }, []);

  const StatCard = ({ icon, label, value, color }: {
    icon: string;
    label: string;
    value: number;
    color: string;
  }) => (
    <Card className={`h-100 border-0 bg-${color} text-white`}>
      <Card.Body className="d-flex align-items-center justify-content-between">
        <div>
          <Card.Text className="mb-1 opacity-75">{label}</Card.Text>
          <Card.Title className="mb-0 fs-3">{value}</Card.Title>
        </div>
        <div className="fs-1">{icon}</div>
      </Card.Body>
    </Card>
  );

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="mb-1">Dashboard</h1>
          <p className="text-muted mb-0">Resumen general del sistema</p>
        </Col>
      </Row>

      {/* Niveles Educacionales */}
      <Row className="mb-4">
        <Col lg={6} className="mb-3">
          <StatCard
            icon="📊"
            label="Total de Niveles"
            value={stats.totalLevels}
            color="primary"
          />
        </Col>
        <Col lg={6} className="mb-3">
          <StatCard
            icon="✅"
            label="Niveles Activos"
            value={stats.activeLevels}
            color="success"
          />
        </Col>
      </Row>

      {/* Cursos */}
      <Row className="mb-4">
        <Col lg={6} className="mb-3">
          <StatCard
            icon="📚"
            label="Total de Cursos"
            value={stats.totalCourses}
            color="info"
          />
        </Col>
        <Col lg={6} className="mb-3">
          <StatCard
            icon="✅"
            label="Cursos Activos"
            value={stats.activeCourses}
            color="success"
          />
        </Col>
      </Row>
    </Container>
  );
}
