import SidebarLayout from '@/components/SidebarLayout';
import NavigationBar from '@/components/NavigationBar';
import PageWrapper from '@/components/PageWrapper';

const evalMenu = [
  { label: 'Mis Evaluaciones', href: '/evaluation-management' },
  { label: 'Crear Evaluación', href: '/evaluation-management/create' },
  { label: 'Resultados', href: '/evaluation-management/results' },
];

export default function EvaluationLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageWrapper>
      <NavigationBar />
      <SidebarLayout items={evalMenu}>
        <div className="p-4">{children}</div>
      </SidebarLayout>
    </PageWrapper>
  );
}
