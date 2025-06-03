import { AuditLogComponent } from '@/components/AuditLogComponent';

export default function AuditLogPage() {
  // In a real app, you might fetch the sessionId here if needed by AuditLogComponent directly
  // or rely on a context/store if it's passed differently.
  return <AuditLogComponent />;
}
