import SidebarLayout from '@/components/SidebarLayout';
import NavigationBar from '@/components/NavigationBar';
import PageWrapper from '@/components/PageWrapper';
import Footer from '@/components/Footer';

const qbMenu = [
  { 
    label: 'GESTIÓN', 
    isSection: true,
    children: [
      { 
        label: 'Listar Preguntas', 
        icon: '📋',
        href: '/questions-bank' 
      },
      { 
        label: 'Crear Pregunta', 
        icon: '➕',
        href: '/questions-bank/create' 
      },
      { 
        label: 'Importar Preguntas', 
        icon: '📥',
        href: '/questions-bank/import' 
      },
      { 
        label: 'Estadísticas', 
        icon: '📊',
        href: '/questions-bank/statistics' 
      },
    ]
  },
  { 
    label: 'HERRAMIENTAS', 
    isSection: true,
    children: [
      { 
        label: 'Jerarquía curricular', 
        icon: '📂',
        href: '/questions-bank/curriculum-hierarchy' 
      },
      { 
        label: 'Tipos de Preguntas', 
        icon: '🏷️',
        href: '/questions-bank/question-types' 
      },
      { 
        label: 'Niveles de Dificultad', 
        icon: '📈',
        href: '/questions-bank/difficulties' 
      },
      { 
        label: 'Taxonomías', 
        icon: '🎓',
        href: '/questions-bank/taxonomies' 
      },
      { 
        label: 'Configuración', 
        icon: '⚙️',
        href: '/questions-bank/settings' 
      },
    ]
  },
];

export default function QuestionsBankLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageWrapper>
      <NavigationBar />
      <SidebarLayout items={qbMenu} sidebarTitle="Banco de Preguntas">
        <div className="p-4">{children}</div>
      </SidebarLayout>
      <Footer />
    </PageWrapper>
  );
}
