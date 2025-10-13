import SidebarLayout from '@/components/SidebarLayout';
import NavigationBar from '@/components/NavigationBar';
import PageWrapper from '@/components/PageWrapper';

const qbMenu = [
  { label: 'Banco de Preguntas', href: '/questions-bank' },
  { label: 'Crear Pregunta', href: '/questions-bank/create' },
  { label: 'Importar', href: '/questions-bank/import' },
  { label: 'Taxonomía Curricular', href: '/questions-bank/taxonomy' },
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
