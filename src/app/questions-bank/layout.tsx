import SidebarLayout from '@/components/SidebarLayout';
import NavigationBar from '@/components/NavigationBar';
import PageWrapper from '@/components/PageWrapper';

const qbMenu = [
  { 
    label: 'Banco de Preguntas', 
    icon: '📚',
    href: '/questions-bank' 
  },
  { 
    label: 'Crear Pregunta', 
    icon: '➕',
    href: '/questions-bank/create' 
  },
  { 
    label: 'Importar', 
    icon: '📥',
    href: '/questions-bank/import' 
  },
  { 
    label: 'Taxonomía Curricular', 
    icon: '🏷️',
    children: [
      { 
        label: 'Ver Taxonomías', 
        icon: '📋',
        href: '/questions-bank/taxonomy' 
      },
    ]
  },
];

export default function QuestionsBankLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageWrapper>
      <NavigationBar />
      <SidebarLayout items={qbMenu}>
        <div className="p-4">{children}</div>
      </SidebarLayout>
    </PageWrapper>
  );
}
