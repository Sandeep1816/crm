// app/employee/[id]/page.tsx
import prisma from '@/app/lib/prisma';
import { notFound } from 'next/navigation';
import EmployeeLeads from '@/app/components/leads/getleads';
import LeadForm from '@/app/components/employee/LeadForm';

interface EmployeePageProps {
  params: { id?: string };
}

export default async function EmployeePage({ params }: EmployeePageProps) {
  if (!params?.id) {
    return notFound();
  }

  // Fetch basic employee info (you can include leads here if you want SSR for that, but here we'll fetch leads client-side)
  const employee = await prisma.employee.findUnique({
    where: { id: params.id },
    include: { department: true },
  });

  if (!employee) {
    return notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">
        Welcome to Your Dashboard, {employee.name}
      </h2>
      <p>
        <strong>Email:</strong> {employee.email}
      </p>
      <p>
        <strong>Role:</strong> {employee.role}
      </p>
      <p>
        <strong>Project:</strong> {employee.department?.name || 'No department'}
      </p>
      <LeadForm />
      {/* Render the EmployeeLeads component */}
      <EmployeeLeads employeeId={employee.id} />
    </div>
  );
}
