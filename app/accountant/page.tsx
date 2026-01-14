'use client'
import React, { useEffect, useState } from 'react';
import { Users, DollarSign, FileText, Calendar, Download, Eye, ChevronRight, Bell, Settings, Search, Filter, CheckCircle, AlertCircle, Plus, Send, Edit, X, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

// Type definitions matching your schema
interface Deduction {
  sss: number;
  philHealth: number;
  pagIbig: number;
  withholdingTax: number;
  total: number;
}

interface Employee {
  id: number;
  employeeId: string;
  name: string;
  role: string;
  department: string;
  grossPay: number;
  deductions: Deduction;
  netPay: number;
  status: 'verified' | 'pending' | 'flagged';
  bankAccount: string;
  bankName: string;
}

interface Payroll {
  id: string;
  client: {
    id: string;
    name: string;
    contact: string;
  };
  period: {
    start: string;
    end: string;
    label: string;
  };
  status: 'draft' | 'submitted' | 'approved' | 'processed';
  audit: {
    createdBy: string;
    createdAt: string;
    submittedBy: string | null;
    submittedAt: string | null;
  };
  payment: {
    dueDate: string;
    disbursementMethod: 'bank_transfer' | 'cash' | 'check';
  };
  totals: {
    grossPay: number;
    govtDeductions: number;
    withholdingTax: number;
    netPay: number;
    employeeCount: number;
  };
  employees: Employee[];
  notes?: string;
}

export default function AccountantDashboard() {
    const [activeTab, setActiveTab] = useState('review');
    const [editingRow, setEditingRow] = useState<number | null>(null);
    const [payrollData, setPayrollData] = useState<Payroll | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    const router = useRouter();

    // Fetch payroll data on mount
    useEffect(() => {
        const role = localStorage.getItem("role");
        if (role !== "accountant") {
            router.push("/");
            return;
        }
        
        fetchPayrollData();
    }, []);

    // Fetch payroll data from API
    const fetchPayrollData = async () => {
        try {
            setLoading(true);
            // Get the payroll ID from URL params or use default
            const payrollId = 'PR-2026-001'; // You can get this from URL params
            
            const response = await fetch(`/api/payroll/${payrollId}`);
            const result = await response.json();

            if (result.success) {
                setPayrollData(result.data);
            } else {
                setError(result.error || 'Failed to fetch payroll data');
            }
        } catch (err) {
            setError('Network error occurred');
            console.error('Error fetching payroll:', err);
        } finally {
            setLoading(false);
        }
    };

    // Save draft
    const handleSaveDraft = async () => {
        if (!payrollData) return;
        
        try {
            setSaving(true);
            const response = await fetch(`/api/payroll/${payrollData.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payrollData)
            });

            const result = await response.json();
            
            if (result.success) {
                alert('Draft saved successfully!');
            } else {
                alert('Failed to save draft: ' + result.error);
            }
        } catch (err) {
            alert('Error saving draft');
            console.error('Save error:', err);
        } finally {
            setSaving(false);
        }
    };

    // Submit to client
    const handleSubmitToClient = async () => {
        if (!payrollData) return;
        
        const confirmSubmit = confirm('Are you sure you want to submit this payroll to the client?');
        if (!confirmSubmit) return;

        try {
            setSaving(true);
            const updatedPayroll = {
                ...payrollData,
                status: 'submitted',
                audit: {
                    ...payrollData.audit,
                    submittedBy: localStorage.getItem('userEmail') || 'accountant@firm.com',
                    submittedAt: new Date().toISOString()
                }
            };

            const response = await fetch(`/api/payroll/${payrollData.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedPayroll)
            });

            const result = await response.json();
            
            if (result.success) {
                setPayrollData(result.data);
                alert('Payroll submitted to client successfully!');
            } else {
                alert('Failed to submit: ' + result.error);
            }
        } catch (err) {
            alert('Error submitting payroll');
            console.error('Submit error:', err);
        } finally {
            setSaving(false);
        }
    };

    // Update employee data
    const handleUpdateEmployee = async (employeeId: number, updatedData: Partial<Employee>) => {
        if (!payrollData) return;

        const updatedEmployees = payrollData.employees.map(emp => 
            emp.id === employeeId ? { ...emp, ...updatedData } : emp
        );

        // Recalculate totals
        const totals = calculateTotals(updatedEmployees);

        const updatedPayroll = {
            ...payrollData,
            employees: updatedEmployees,
            totals
        };

        setPayrollData(updatedPayroll);
    };

    // Calculate totals
    const calculateTotals = (employees: Employee[]) => {
        return {
            grossPay: employees.reduce((sum, e) => sum + e.grossPay, 0),
            govtDeductions: employees.reduce((sum, e) => 
                sum + e.deductions.sss + e.deductions.philHealth + e.deductions.pagIbig, 0
            ),
            withholdingTax: employees.reduce((sum, e) => sum + e.deductions.withholdingTax, 0),
            netPay: employees.reduce((sum, e) => sum + e.netPay, 0),
            employeeCount: employees.length
        };
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const getStatusColor = (status: string) => {
        const colors = {
            draft: 'bg-gray-100 text-gray-800',
            verified: 'bg-green-100 text-green-800',
            pending: 'bg-yellow-100 text-yellow-800',
            submitted: 'bg-blue-100 text-blue-800',
            approved: 'bg-blue-100 text-blue-800',
            processed: 'bg-purple-100 text-purple-800',
            flagged: 'bg-red-100 text-red-800'
        };
        return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-neutral-200 border-t-neutral-900 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-neutral-600">Loading payroll data...</p>
                </div>
            </div>
        );
    }

    if (error || !payrollData) {
        return (
            <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
                <div className="text-center">
                    <AlertCircle className="text-red-500 mx-auto mb-4" size={48} />
                    <p className="text-neutral-900 font-bold mb-2">Error Loading Payroll</p>
                    <p className="text-neutral-600 mb-4">{error || 'Payroll data not found'}</p>
                    <button 
                        onClick={fetchPayrollData}
                        className="px-6 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-50">
            <Navbar/>
            
            {/* Navigation Tabs */}
            <div className="bg-white border-b border-neutral-200">
                <div className="max-w-7xl mx-auto px-6">
                    <nav className="flex items-center gap-8">
                        <button
                            onClick={() => setActiveTab('review')}
                            className={`py-4 text-sm font-medium transition-colors border-b-2 ${activeTab === 'review'
                                ? 'border-neutral-900 text-neutral-900'
                                : 'border-transparent text-neutral-600 hover:text-neutral-900'
                            }`}
                        >
                            Payroll Review
                        </button>
                        <button
                            onClick={() => setActiveTab('calculations')}
                            className={`py-4 text-sm font-medium transition-colors border-b-2 ${activeTab === 'calculations'
                                ? 'border-neutral-900 text-neutral-900'
                                : 'border-transparent text-neutral-600 hover:text-neutral-900'
                            }`}
                        >
                            Calculations
                        </button>
                        <button
                            onClick={() => setActiveTab('reports')}
                            className={`py-4 text-sm font-medium transition-colors border-b-2 ${activeTab === 'reports'
                                ? 'border-neutral-900 text-neutral-900'
                                : 'border-transparent text-neutral-600 hover:text-neutral-900'
                            }`}
                        >
                            Reports
                        </button>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                {activeTab === 'review' && (
                    <div className="space-y-6">
                        {/* Header Section */}
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h2 className="text-3xl font-bold text-neutral-900">Payroll Review</h2>
                                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(payrollData.status)}`}>
                                        {payrollData.status.charAt(0).toUpperCase() + payrollData.status.slice(1)}
                                    </span>
                                </div>
                                <p className="text-neutral-600">
                                    {payrollData.client.name} • {payrollData.period.label}
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button 
                                    onClick={handleSaveDraft}
                                    disabled={saving}
                                    className="px-4 py-2 bg-white border-2 border-neutral-200 rounded-lg font-medium text-neutral-700 hover:border-neutral-300 transition-colors flex items-center gap-2 disabled:opacity-50"
                                >
                                    <Save size={18} />
                                    {saving ? 'Saving...' : 'Save Draft'}
                                </button>
                                <button 
                                    onClick={handleSubmitToClient}
                                    disabled={saving || payrollData.status !== 'draft'}
                                    className="px-6 py-2 bg-neutral-900 text-white rounded-lg font-medium hover:bg-neutral-800 transition-colors flex items-center gap-2 disabled:opacity-50"
                                >
                                    <Send size={18} />
                                    Submit to Client
                                </button>
                            </div>
                        </div>

                        {/* Summary Cards */}
                        <div className="grid grid-cols-4 gap-4">
                            <div className="bg-white p-6 rounded-lg border border-neutral-200">
                                <div className="text-sm text-neutral-600 mb-2">Gross Pay</div>
                                <div className="text-2xl font-bold text-neutral-900">
                                    {formatCurrency(payrollData.totals.grossPay)}
                                </div>
                                <div className="text-xs text-neutral-500 mt-1">Total salaries</div>
                            </div>
                            <div className="bg-white p-6 rounded-lg border border-neutral-200">
                                <div className="text-sm text-neutral-600 mb-2">Govt Deductions</div>
                                <div className="text-2xl font-bold text-neutral-900">
                                    {formatCurrency(payrollData.totals.govtDeductions)}
                                </div>
                                <div className="text-xs text-neutral-500 mt-1">SSS, PhilHealth, Pag-IBIG</div>
                            </div>
                            <div className="bg-white p-6 rounded-lg border border-neutral-200">
                                <div className="text-sm text-neutral-600 mb-2">Withholding Tax</div>
                                <div className="text-2xl font-bold text-neutral-900">
                                    {formatCurrency(payrollData.totals.withholdingTax)}
                                </div>
                                <div className="text-xs text-neutral-500 mt-1">Tax deductions</div>
                            </div>
                            <div className="bg-white p-6 rounded-lg border border-green-200">
                                <div className="text-sm text-neutral-600 mb-2">Net Pay</div>
                                <div className="text-2xl font-bold text-green-600">
                                    {formatCurrency(payrollData.totals.netPay)}
                                </div>
                                <div className="text-xs text-neutral-500 mt-1">To be disbursed</div>
                            </div>
                        </div>

                        {/* Employee Table */}
                        <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
                                <h3 className="text-lg font-bold text-neutral-900">Employee Payroll Details</h3>
                                <div className="flex items-center gap-3">
                                    <button className="px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-100 transition-colors flex items-center gap-2">
                                        <Download size={16} />
                                        Export
                                    </button>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-neutral-50 border-b border-neutral-200">
                                        <tr>
                                            <th className="px-4 py-3 text-left font-medium text-neutral-900">Employee</th>
                                            <th className="px-4 py-3 text-left font-medium text-neutral-900">Department</th>
                                            <th className="px-4 py-3 text-right font-medium text-neutral-900">Gross Pay</th>
                                            <th className="px-4 py-3 text-right font-medium text-neutral-900">Deductions</th>
                                            <th className="px-4 py-3 text-right font-medium text-neutral-900">Net Pay</th>
                                            <th className="px-4 py-3 text-center font-medium text-neutral-900">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-100">
                                        {payrollData.employees.map((employee) => (
                                            <tr key={employee.id} className="hover:bg-neutral-50 transition-colors">
                                                <td className="px-4 py-3">
                                                    <div className="font-medium text-neutral-900">{employee.name}</div>
                                                    <div className="text-xs text-neutral-500">{employee.role}</div>
                                                </td>
                                                <td className="px-4 py-3 text-neutral-600">{employee.department}</td>
                                                <td className="px-4 py-3 text-right font-medium text-neutral-900">
                                                    {formatCurrency(employee.grossPay)}
                                                </td>
                                                <td className="px-4 py-3 text-right text-neutral-600">
                                                    {formatCurrency(employee.deductions.total)}
                                                </td>
                                                <td className="px-4 py-3 text-right font-bold text-green-600">
                                                    {formatCurrency(employee.netPay)}
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(employee.status)}`}>
                                                        {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot className="bg-neutral-50 border-t-2 border-neutral-200">
                                        <tr className="font-bold">
                                            <td colSpan={2} className="px-4 py-3 text-neutral-900">TOTAL</td>
                                            <td className="px-4 py-3 text-right text-neutral-900">
                                                {formatCurrency(payrollData.totals.grossPay)}
                                            </td>
                                            <td className="px-4 py-3 text-right text-neutral-900">
                                                {formatCurrency(payrollData.totals.govtDeductions + payrollData.totals.withholdingTax)}
                                            </td>
                                            <td className="px-4 py-3 text-right text-green-600">
                                                {formatCurrency(payrollData.totals.netPay)}
                                            </td>
                                            <td></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Other tabs remain the same... */}
            </main>
        </div>
    );
}