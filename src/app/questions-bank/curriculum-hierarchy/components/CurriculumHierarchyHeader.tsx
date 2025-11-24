import { Dropdown } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

export function CurriculumHierarchyHeader() {
  const router = useRouter();

  return (
    <div className="d-flex justify-content-between align-items-center">
      <div>
        <h1>Jerarquía Curricular</h1>
        <p className="text-muted mb-0">
          Gestiona la estructura jerárquica: Asignaturas → Unidades → Temas
        </p>
      </div>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-import">
          📥 Importar
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => router.push('/questions-bank/curriculum-hierarchy/import')}>
            📄 Importar Jerarquía desde CSV
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item disabled>
            <small className="text-muted">Próximamente: Más opciones</small>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
