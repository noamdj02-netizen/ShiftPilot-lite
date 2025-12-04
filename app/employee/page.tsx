// Redirect to employee dashboard
import { redirect } from 'next/navigation'

export default function EmployeePage() {
  redirect('/dashboard/employee')
}

