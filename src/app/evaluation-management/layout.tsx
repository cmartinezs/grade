import SidebarLayout from '@/components/SidebarLayout';
import NavigationBar from '@/components/NavigationBar';
import PageWrapper from '@/components/PageWrapper';
import Footer from '@/components/Footer';

const evalMenu = [
  { 
    label: 'Evaluaciones', 
    icon: '📝',
    children: [
      { 
        label: 'Mis Evaluaciones', 
        icon: '�',
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
    label: 'Gestión Académica', 
    icon: '🎓',
    children: [
      { 
        label: 'Cursos', 
        icon: '📚',
        href: '/evaluation-management/courses' 
      },
    ]
  },
  { 
    label: 'Resultados', 
    icon: '📊',
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
      <SidebarLayout items={evalMenu}>
        <div className="p-4">{children}</div>
      </SidebarLayout>
      <Footer />
    </PageWrapper>
  );
}
