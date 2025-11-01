import { Card } from 'react-bootstrap';

interface KPICardProps {
  icon: string;
  label: string;
  value: number;
  color: string;
}

export const KPICard = ({ 
  icon, 
  label, 
  value, 
  color 
}: KPICardProps) => (
  <Card className={`border-0 h-100`}>
    <Card.Body className={`text-white d-flex align-items-center justify-content-between`} style={{
      backgroundColor: color,
      padding: '1.5rem'
    }}>
      <div>
        <Card.Text className="mb-1 opacity-75 small">{label}</Card.Text>
        <Card.Title className="mb-0 fs-2 fw-bold">{value}</Card.Title>
      </div>
      <div className="fs-1">{icon}</div>
    </Card.Body>
  </Card>
);
