"use client";

import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";
import { EntityStatsCard } from "@/components/EntityStatsCard";
import { PieChartCard } from "@/components/charts/PieChartCard";
import { BarChartCard } from "@/components/charts/BarChartCard";
import { ColumnChartCard } from "@/components/charts/ColumnChartCard";
import { levelStore } from "@/lib/levelStore";
import { courseStore } from "@/lib/courseStore";
import { EducationalLevel } from "@/types/level";
import { Course } from "@/types/course";
import { useAuth } from "@/contexts/AuthContext";
import {
  getDashboardQuestions,
  getDashboardSystemData,
} from "@/dataconnect-generated";

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
  questions: {
    total: number;
    active: number;
    inactive: number;
    byTaxonomy: Record<string, number>;
    byDifficulty: Record<string, number>;
    byQuestionType: Record<string, number>;
    byMonth: Record<string, number>;
  };
  taxonomy: {
    taxonomyId: string;
    name: string;
    code: string;
    level: number;
  }[];
  difficulties: {
    difficultyId: string;
    level: string;
    weight: number;
  }[];
  questionTypes: {
    questionTypeId: string;
    name: string;
    code: string;
  }[];
  subjects: {
    total: number;
    byLevel: Record<string, number>;
  };
  contentHierarchy: {
    subjects: number;
    units: number;
    topics: number;
  };
}

export default function DashboardPage() {
  const { user } = useAuth();

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
    questions: {
      total: 0,
      active: 0,
      inactive: 0,
      byTaxonomy: {},
      byDifficulty: {},
      byQuestionType: {},
      byMonth: {},
    },
    taxonomy: [],
    difficulties: [],
    questionTypes: [],
    subjects: {
      total: 0,
      byLevel: {},
    },
    contentHierarchy: {
      subjects: 0,
      units: 0,
      topics: 0,
    },
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Función auxiliar para reintentos con backoff exponencial
  const retryWithBackoff = async <T,>(
    fn: () => Promise<T>,
    maxRetries = 3,
    initialDelay = 500
  ): Promise<T> => {
    let lastError: Error | null = null;
    
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await fn();
      } catch (err) {
        lastError = err as Error;
        if (i < maxRetries - 1) {
          const delay = initialDelay * Math.pow(2, i);
          console.log(`Retry ${i + 1}/${maxRetries} after ${delay}ms...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }
    
    throw lastError;
  };

  useEffect(() => {
    if (!user?.id || !user?.firebaseUid) return;

    const loadDashboardData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Load levels and courses from stores (with retry)
        const [levels, courses] = await Promise.all([
          retryWithBackoff(() => levelStore.loadLevels()),
          retryWithBackoff(() =>
            courseStore.loadCourses(user.id, user.firebaseUid)
          ),
        ]);

        const activeLevels = levels.filter((l) => l.isActive).length;
        const inactiveLevels = levels.length - activeLevels;

        const activeCourses = courses.filter((c) => c.active).length;
        const inactiveCourses = courses.length - activeCourses;

        // Calculate courses by level
        const coursesByLevel: Record<string, number> = {};
        courses.forEach((course) => {
          const levelId = course.levelId;
          coursesByLevel[levelId] = (coursesByLevel[levelId] || 0) + 1;
        });

        // Load system data (taxonomies, difficulties, question types, etc.)
        // These queries don't depend on specific user auth, just USER level
        const systemDataResult = await retryWithBackoff(() =>
          getDashboardSystemData()
        );

        // Load user's questions separately with retry
        let questionsResult;
        try {
          questionsResult = await retryWithBackoff(() =>
            getDashboardQuestions({
              userId: user.id,
              firebaseId: user.firebaseUid,
            })
          );
        } catch (err) {
          console.error("Error loading questions:", err);
          // Continue without questions data
          questionsResult = { data: { questions: [] } };
        }

        // Process questions data
        const questions = questionsResult.data.questions || [];
        const activeQuestions = questions.filter((q) => q.active).length;
        const inactiveQuestions = questions.length - activeQuestions;

        // Group questions by taxonomy
        const byTaxonomy: Record<string, number> = {};
        questions.forEach((q) => {
          const taxId = q.taxonomyId;
          byTaxonomy[taxId] = (byTaxonomy[taxId] || 0) + 1;
        });

        // Group questions by difficulty
        const byDifficulty: Record<string, number> = {};
        questions.forEach((q) => {
          const diffId = q.difficultyId;
          byDifficulty[diffId] = (byDifficulty[diffId] || 0) + 1;
        });

        // Group questions by question type
        const byQuestionType: Record<string, number> = {};
        questions.forEach((q) => {
          const typeId = q.questionTypeId;
          byQuestionType[typeId] = (byQuestionType[typeId] || 0) + 1;
        });

        // Group questions by month
        const byMonth: Record<string, number> = {};
        questions.forEach((q) => {
          if (q.createdAt) {
            const date = new Date(q.createdAt);
            const monthKey = `${date.getFullYear()}-${String(
              date.getMonth() + 1
            ).padStart(2, "0")}`;
            byMonth[monthKey] = (byMonth[monthKey] || 0) + 1;
          }
        });

        // Process subjects data
        const subjects = systemDataResult.data.subjects || [];
        const subjectsByLevel: Record<string, number> = {};
        subjects.forEach((s) => {
          const levelId = s.levelId;
          subjectsByLevel[levelId] = (subjectsByLevel[levelId] || 0) + 1;
        });

        // Content hierarchy
        const units = systemDataResult.data.units || [];
        const topics = systemDataResult.data.topics || [];

        setDashboardData({
          levels: {
            total: levels.length,
            active: activeLevels,
            inactive: inactiveLevels,
            activePercentage:
              levels.length > 0 ? (activeLevels / levels.length) * 100 : 0,
            inactivePercentage:
              levels.length > 0 ? (inactiveLevels / levels.length) * 100 : 0,
            items: levels,
          },
          courses: {
            total: courses.length,
            active: activeCourses,
            inactive: inactiveCourses,
            activePercentage:
              courses.length > 0 ? (activeCourses / courses.length) * 100 : 0,
            inactivePercentage:
              courses.length > 0
                ? (inactiveCourses / courses.length) * 100
                : 0,
            items: courses,
            byLevel: coursesByLevel,
          },
          questions: {
            total: questions.length,
            active: activeQuestions,
            inactive: inactiveQuestions,
            byTaxonomy,
            byDifficulty,
            byQuestionType,
            byMonth,
          },
          taxonomy: (systemDataResult.data.taxonomies || []).map((t) => ({
            taxonomyId: t.taxonomyId,
            name: t.name,
            code: t.code,
            level: t.level,
          })),
          difficulties: (systemDataResult.data.difficulties || []).map(
            (d) => ({
              difficultyId: d.difficultyId,
              level: d.level,
              weight: d.weight,
            })
          ),
          questionTypes: (systemDataResult.data.questionTypes || []).map(
            (qt) => ({
              questionTypeId: qt.questionTypeId,
              name: qt.name,
              code: qt.code,
            })
          ),
          subjects: {
            total: subjects.length,
            byLevel: subjectsByLevel,
          },
          contentHierarchy: {
            subjects: subjects.length,
            units: units.length,
            topics: topics.length,
          },
        });
      } catch (error) {
        console.error("Error loading dashboard data:", error);
        setError(
          "Error al cargar los datos del dashboard. Por favor, intenta recargar la página."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [user?.id, user?.firebaseUid]);

  return (
    <Container fluid className="py-4">
      {/* Header */}
      <Row className="mb-5">
        <Col>
          <h1 className="mb-2">📊 Dashboard</h1>
          <p className="text-muted mb-0">
            Resumen estadístico del sistema educacional
          </p>
        </Col>
      </Row>

      {/* Loading State */}
      {loading && (
        <Row className="mb-4">
          <Col>
            <Alert variant="info">
              <div className="d-flex align-items-center">
                <div
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                >
                  <span className="visually-hidden">Cargando...</span>
                </div>
                <span>Cargando datos del dashboard...</span>
              </div>
            </Alert>
          </Col>
        </Row>
      )}

      {/* Error State */}
      {error && (
        <Row className="mb-4">
          <Col>
            <Alert variant="danger" dismissible onClose={() => setError(null)}>
              <Alert.Heading>Error al cargar datos</Alert.Heading>
              <p>{error}</p>
            </Alert>
          </Col>
        </Row>
      )}

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
                      <div className="progress" style={{ height: "8px" }}>
                        <div
                          className="progress-bar"
                          style={{
                            width: `${percentage}%`,
                            backgroundColor: "#17A2B8",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </EntityStatsCard>
      </Row>

      {/* Estadísticas de Preguntas */}
      {dashboardData.questions.total > 0 && (
        <>
          <Row className="mb-5 mt-5">
            <Col>
              <h3 className="mb-3">❓ Banco de Preguntas</h3>
            </Col>
          </Row>

          <Row className="mb-4">
            {/* Question Stats Card */}
            <Col lg={4} className="mb-4">
              <Card className="shadow-sm border-0 h-100">
                <Card.Header className="bg-warning text-dark border-0">
                  <h5 className="mb-0">📊 Resumen de Preguntas</h5>
                </Card.Header>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-3 p-3 bg-light rounded">
                    <div>
                      <div className="text-muted small">Total</div>
                      <div className="h3 mb-0 text-warning">
                        {dashboardData.questions.total}
                      </div>
                    </div>
                    <div className="text-warning fs-1">❓</div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-2 p-3 bg-light rounded">
                    <div>
                      <div className="text-muted small">Activas</div>
                      <div className="h4 mb-0 text-success">
                        {dashboardData.questions.active}
                      </div>
                    </div>
                    <div className="text-success fs-2">✅</div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded">
                    <div>
                      <div className="text-muted small">Inactivas</div>
                      <div className="h4 mb-0 text-danger">
                        {dashboardData.questions.inactive}
                      </div>
                    </div>
                    <div className="text-danger fs-2">❌</div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Questions by Taxonomy (Bloom) */}
            <Col lg={4} className="mb-4">
              <PieChartCard
                title="Por Taxonomía (Bloom)"
                icon="🎯"
                headerColor="#9C27B0"
                data={[
                  ["Taxonomía", "Cantidad"],
                  ...Object.entries(dashboardData.questions.byTaxonomy).map(
                    ([taxId, count]) => {
                      const taxonomy = dashboardData.taxonomy.find(
                        (t) => t.taxonomyId === taxId
                      );
                      return [
                        taxonomy
                          ? `${taxonomy.name} (Nivel ${taxonomy.level})`
                          : "Desconocido",
                        count,
                      ];
                    }
                  ),
                ]}
              />
            </Col>

            {/* Questions by Difficulty */}
            <Col lg={4} className="mb-4">
              <PieChartCard
                title="Por Nivel de Dificultad"
                icon="⚡"
                headerColor="#FF5722"
                data={[
                  ["Dificultad", "Cantidad"],
                  ...Object.entries(dashboardData.questions.byDifficulty).map(
                    ([diffId, count]) => {
                      const difficulty = dashboardData.difficulties.find(
                        (d) => d.difficultyId === diffId
                      );
                      return [difficulty?.level || "Desconocido", count];
                    }
                  ),
                ]}
              />
            </Col>
          </Row>

          <Row className="mb-4">
            {/* Questions by Type */}
            <Col lg={6} className="mb-4">
              <BarChartCard
                title="Por Tipo de Pregunta"
                icon="📝"
                headerColor="#3F51B5"
                data={[
                  ["Tipo", "Cantidad"],
                  ...Object.entries(dashboardData.questions.byQuestionType).map(
                    ([typeId, count]) => {
                      const questionType = dashboardData.questionTypes.find(
                        (qt) => qt.questionTypeId === typeId
                      );
                      return [questionType?.name || "Desconocido", count];
                    }
                  ),
                ]}
              />
            </Col>

            {/* Questions Created by Month */}
            <Col lg={6} className="mb-4">
              <ColumnChartCard
                title="Preguntas Creadas por Mes"
                icon="📅"
                headerColor="#009688"
                data={[
                  ["Mes", "Cantidad"],
                  ...Object.entries(dashboardData.questions.byMonth)
                    .sort(([a], [b]) => a.localeCompare(b))
                    .map(([month, count]) => [month, count]),
                ]}
              />
            </Col>
          </Row>
        </>
      )}

      {/* Jerarquía de Contenido */}
      {dashboardData.contentHierarchy.subjects > 0 && (
        <>
          <Row className="mb-5 mt-5">
            <Col>
              <h3 className="mb-3">📚 Jerarquía de Contenido</h3>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col lg={6} className="mb-4">
              <Card className="shadow-sm border-0 h-100">
                <Card.Header className="bg-info text-white border-0">
                  <h5 className="mb-0">🏗️ Estructura del Contenido</h5>
                </Card.Header>
                <Card.Body>
                  <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="fw-bold">📖 Asignaturas</span>
                      <span className="badge bg-info fs-6">
                        {dashboardData.contentHierarchy.subjects}
                      </span>
                    </div>
                    <div className="progress" style={{ height: "20px" }}>
                      <div
                        className="progress-bar bg-info"
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="fw-bold">📑 Unidades</span>
                      <span className="badge bg-primary fs-6">
                        {dashboardData.contentHierarchy.units}
                      </span>
                    </div>
                    <div className="progress" style={{ height: "20px" }}>
                      <div
                        className="progress-bar bg-primary"
                        style={{
                          width: `${
                            dashboardData.contentHierarchy.subjects > 0
                              ? (dashboardData.contentHierarchy.units /
                                  dashboardData.contentHierarchy.subjects) *
                                20
                              : 0
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="fw-bold">📌 Temas</span>
                      <span className="badge bg-success fs-6">
                        {dashboardData.contentHierarchy.topics}
                      </span>
                    </div>
                    <div className="progress" style={{ height: "20px" }}>
                      <div
                        className="progress-bar bg-success"
                        style={{
                          width: `${
                            dashboardData.contentHierarchy.units > 0
                              ? (dashboardData.contentHierarchy.topics /
                                  dashboardData.contentHierarchy.units) *
                                30
                              : 0
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-top">
                    <div className="text-muted small text-center">
                      <strong>Promedio:</strong>{" "}
                      {dashboardData.contentHierarchy.subjects > 0
                        ? (
                            dashboardData.contentHierarchy.units /
                            dashboardData.contentHierarchy.subjects
                          ).toFixed(1)
                        : 0}{" "}
                      unidades por asignatura •{" "}
                      {dashboardData.contentHierarchy.units > 0
                        ? (
                            dashboardData.contentHierarchy.topics /
                            dashboardData.contentHierarchy.units
                          ).toFixed(1)
                        : 0}{" "}
                      temas por unidad
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={6} className="mb-4">
              <ColumnChartCard
                title="Asignaturas por Nivel Educacional"
                icon="📊"
                headerColor="#607D8B"
                data={[
                  ["Nivel", "Asignaturas"],
                  ...Object.entries(dashboardData.subjects.byLevel).map(
                    ([levelId, count]) => {
                      const level = dashboardData.levels.items.find(
                        (l) => l.id === levelId
                      );
                      return [level?.name || "Desconocido", count];
                    }
                  ),
                ]}
              />
            </Col>
          </Row>
        </>
      )}

      {/* Próximas Funcionalidades */}
      <Row className="mt-5">
        <Col>
          <h3 className="mb-3">🚀 Próximas Funcionalidades</h3>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col lg={6} className="mb-4">
          <Card className="shadow-sm border-0 opacity-50">
            <Card.Header className="bg-danger text-white border-0">
              <h5 className="mb-0">📋 Evaluaciones</h5>
            </Card.Header>
            <Card.Body className="text-center text-muted">
              <p>Estadísticas de evaluaciones próximamente...</p>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6} className="mb-4">
          <Card className="shadow-sm border-0 opacity-50">
            <Card.Header className="bg-secondary text-white border-0">
              <h5 className="mb-0">👥 Estudiantes</h5>
            </Card.Header>
            <Card.Body className="text-center text-muted">
              <p>Estadísticas de estudiantes próximamente...</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
