import SidebarLayout from '@/components/SidebarLayout';
import NavigationBar from '@/components/NavigationBar';
import PageWrapper from '@/components/PageWrapper';

const dashboardMenu = [
  { label: 'Resumen', href: '/dashboard' },
  { label: 'Reportes', href: '/dashboard/reports' },
  { label: 'Configuración', href: '/dashboard/settings' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageWrapper>
      <NavigationBar />
      <SidebarLayout items={dashboardMenu}>
        <div className="p-4">{children}</div>
      </SidebarLayout>
    </PageWrapper>
  );
}
