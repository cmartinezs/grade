import SidebarLayout from '@/components/SidebarLayout';
import NavigationBar from '@/components/NavigationBar';
import PageWrapper from '@/components/PageWrapper';

const dashboardMenu = [
  { 
    label: 'PRINCIPAL', 
    isSection: true,
    children: [
      { 
        label: 'Resumen', 
        icon: '📊',
        href: '/dashboard' 
      },
      { 
        label: 'Reportes', 
        icon: '📈',
        href: '/dashboard/reports' 
      },
    ]
  },
  { 
    label: 'CONFIGURACIÓN', 
    isSection: true,
    children: [
      { 
        label: 'Configuración', 
        icon: '⚙️',
        href: '/dashboard/settings' 
      },
    ]
  },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageWrapper>
      <NavigationBar />
      <SidebarLayout items={dashboardMenu} sidebarTitle="Panel de Control">
        <div className="p-4">{children}</div>
      </SidebarLayout>
    </PageWrapper>
  );
}
