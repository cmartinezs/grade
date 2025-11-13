/**
 * Componente de debug para ver el contenido del caché de taxonomía
 * Se usa durante desarrollo para diagnosticar problemas de jerarquía
 */

import { useState } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { debugGetFullCache } from '@/lib/curriculumHierarchyStore';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface DebugInfo {
  subjects: Record<string, any>[];
  units: Record<string, any>[];
  topics: Record<string, any>[];
  totalUnits: number;
  totalTopics: number;
  unitsBySubject: Record<string, number>;
  topicsByUnit: Record<string, number>;
  hierarchyAnalysis: string;
}

export function CurriculumHierarchyDebug() {
  const [isOpen, setIsOpen] = useState(false);
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null);

  const handleDebug = () => {
    const cacheData = debugGetFullCache();

    // Contar units por subject
    const unitsBySubject: Record<string, number> = {};
    Object.entries(cacheData.unitsBySubject).forEach(([subjectId, units]) => {
      unitsBySubject[subjectId] = units.length;
    });

    // Contar topics por unit
    const topicsByUnit: Record<string, number> = {};
    Object.entries(cacheData.topicsByUnit).forEach(([unitId, topics]) => {
      topicsByUnit[unitId] = topics.length;
    });

    // Análisis de jerarquía
    let hierarchyAnalysis = '';
    (cacheData.subjects || []).forEach((subject: Record<string, any>) => {
      const subjectUnits = cacheData.unitsBySubject[subject.subject_id] || [];
      hierarchyAnalysis += `${subject.name} (${subject.subject_id}): ${subjectUnits.length} units\n`;
      subjectUnits.forEach((unit: Record<string, any>) => {
        const unitTopics = cacheData.topicsByUnit[unit.unit_id] || [];
        hierarchyAnalysis += `  └─ ${unit.name} (${unit.unit_id}): ${unitTopics.length} topics\n`;
      });
    });

    setDebugInfo({
      subjects: (cacheData.subjects || []).map((s: Record<string, any>) => ({
        id: s.subject_id,
        name: s.name,
        code: s.code,
        active: s.active,
      })),
      units: (cacheData.units || []).slice(0, 10).map((u: Record<string, any>) => ({
        id: u.unit_id,
        name: u.name,
        subject_fk: u.subject_fk,
        active: u.active,
      })),
      topics: (cacheData.topics || []).slice(0, 10).map((t: Record<string, any>) => ({
        id: t.topic_id,
        name: t.name,
        unit_fk: t.unit_fk,
        active: t.active,
      })),
      totalUnits: (cacheData.units || []).length,
      totalTopics: (cacheData.topics || []).length,
      unitsBySubject,
      topicsByUnit,
      hierarchyAnalysis,
    });
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9999 }}>
      <Button
        variant="danger"
        size="sm"
        onClick={handleDebug}
        title="Debug - Toggle cache info"
      >
        🐛 Debug
      </Button>

      {isOpen && debugInfo && (
        <Card
          style={{
            position: 'fixed',
            bottom: 70,
            right: 20,
            width: '600px',
            maxHeight: '700px',
            overflowY: 'auto',
            zIndex: 10000,
          }}
          className="shadow-lg"
        >
          <Card.Header className="bg-danger text-white">
            <strong>Debug - CurriculumHierarchy Cache Hierarchy</strong>
          </Card.Header>
          <Card.Body style={{ fontSize: '0.85rem' }}>
            <div>
              <h6>📊 Hierarchy Analysis</h6>
              <pre
                style={{
                  background: '#f5f5f5',
                  padding: '8px',
                  borderRadius: '4px',
                  maxHeight: '200px',
                  overflowY: 'auto',
                  whiteSpace: 'pre-wrap',
                  wordWrap: 'break-word',
                  fontFamily: 'monospace',
                  fontSize: '0.8rem',
                }}
              >
                {debugInfo.hierarchyAnalysis || 'No data loaded'}
              </pre>
            </div>

            <hr />

            <div>
              <h6>📚 Subjects: {debugInfo.subjects.length}</h6>
              <pre
                style={{
                  background: '#f5f5f5',
                  padding: '8px',
                  borderRadius: '4px',
                  maxHeight: '150px',
                  overflowY: 'auto',
                }}
              >
                {JSON.stringify(debugInfo.subjects, null, 2)}
              </pre>
            </div>

            <div>
              <h6>📖 Units: {debugInfo.totalUnits} total</h6>
              <p>
                <strong>Units by Subject:</strong>
              </p>
              {Object.entries(debugInfo.unitsBySubject).length === 0 ? (
                <p className="text-muted">No data</p>
              ) : (
                Object.entries(debugInfo.unitsBySubject).map(([subjectId, count]) => (
                  <div key={subjectId}>
                    <Badge bg="info">
                      {subjectId}: {count} units
                    </Badge>
                  </div>
                ))
              )}
              <p style={{ marginTop: '8px' }}>
                <strong>Sample Units (first 10):</strong>
              </p>
              <pre
                style={{
                  background: '#f5f5f5',
                  padding: '8px',
                  borderRadius: '4px',
                  maxHeight: '150px',
                  overflowY: 'auto',
                }}
              >
                {JSON.stringify(debugInfo.units, null, 2)}
              </pre>
            </div>

            <div>
              <h6>📝 Topics: {debugInfo.totalTopics} total</h6>
              <p style={{ marginTop: '8px' }}>
                <strong>Sample Topics (first 10):</strong>
              </p>
              <pre
                style={{
                  background: '#f5f5f5',
                  padding: '8px',
                  borderRadius: '4px',
                  maxHeight: '150px',
                  overflowY: 'auto',
                }}
              >
                {JSON.stringify(debugInfo.topics, null, 2)}
              </pre>
            </div>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}
