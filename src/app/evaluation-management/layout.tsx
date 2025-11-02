import SidebarLayout from '@/components/SidebarLayout';
import NavigationBar from '@/components/NavigationBar';
import PageWrapper from '@/components/PageWrapper';
import Footer from '@/components/Footer';

const evalMenu = [
  { 
    label: 'EVALUACIONES', 
    isSection: true,
    children: [
      { 
        label: 'Mis Evaluaciones', 
        icon: '📝',
        href: '/evaluation-management' 
      },
      { 
        label: 'Crear Evaluación', 
        icon: '➕',
        href: '/evaluation-management/create' 
      },
    ]
  },
  { 
    label: 'GESTIÓN ACADÉMICA', 
    isSection: true,
    children: [
      { 
        label: 'Cursos', 
        icon: '📚',
        href: '/evaluation-management/courses' 
      },
    ]
  },
  { 
    label: 'GESTIÓN DE NIVELES', 
    isSection: true,
    children: [
      { 
        label: 'Categorías', 
        icon: '🏷️',
        href: '/evaluation-management/categories' 
      },
      { 
        label: 'Listar Niveles', 
        icon: '📊',
        href: '/evaluation-management/levels' 
      },
      { 
        label: 'Crear Nivel', 
        icon: '➕',
        href: '/evaluation-management/levels/create' 
      },
    ]
  },
  { 
    label: 'RESULTADOS', 
    isSection: true,
    children: [
      { 
        label: 'Ver Resultados', 
        icon: '📈',
        href: '/evaluation-management/results' 
      },
    ]
  },
];

export default function EvaluationLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageWrapper>
      <NavigationBar />
      <SidebarLayout items={evalMenu} sidebarTitle="Gestión de Evaluaciones">
        <div className="p-4">{children}</div>
      </SidebarLayout>
      <Footer />
    </PageWrapper>
  );
}
