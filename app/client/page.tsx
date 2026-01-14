'use client'
import React, { useEffect, useState } from 'react';
import { Users, DollarSign, FileText, Calendar, Download, Eye, ChevronRight, Bell, Settings, LogOut, Search, Filter, TrendingUp, Clock, CheckCircle, AlertCircle, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function ClientDashboard() {
    const [activeTab, setActiveTab] = useState('overview');

    const companyData = {
        name: 'ABC Manufacturing Inc.',
        currentPayroll: {
            period: 'January 1-15, 2026',
            status: 'pending_approval',
            totalGross: 3800000,
            totalDeductions: 952500,
            totalNet: 2847500,
            employeeCount: 45,
            dueDate: 'January 20, 2026'
        },
        employees: [
            { id: 1, name: 'Maria Santos', role: 'Operations Manager', department: 'Operations', gross: 85000, deductions: 12750, net: 72250, status: 'approved' },
            { id: 2, name: 'Juan Dela Cruz', role: 'Sales Lead', department: 'Sales', gross: 65000, deductions: 9750, net: 55250, status: 'approved' },
            { id: 3, name: 'Ana Reyes', role: 'Software Engineer', department: 'IT', gross: 95000, deductions: 14250, net: 80750, status: 'approved' },
            { id: 4, name: 'Carlos Mendoza', role: 'Marketing Specialist', department: 'Marketing', gross: 55000, deductions: 8250, net: 46750, status: 'approved' },
            { id: 5, name: 'Lisa Garcia', role: 'HR Manager', department: 'Human Resources', gross: 75000, deductions: 11250, net: 63750, status: 'approved' },
            { id: 6, name: 'Robert Tan', role: 'Production Supervisor', department: 'Operations', gross: 70000, deductions: 10500, net: 59500, status: 'approved' },
            { id: 7, name: 'Elena Cruz', role: 'Accountant', department: 'Finance', gross: 60000, deductions: 9000, net: 51000, status: 'approved' },
            { id: 8, name: 'Michael Santos', role: 'Quality Control', department: 'Operations', gross: 50000, deductions: 7500, net: 42500, status: 'approved' }
        ],
        history: [
            { id: 1, period: 'Dec 16-31, 2025', gross: 3800000, net: 2847500, processed: 'Dec 31, 2025', status: 'completed', employees: 45 },
            { id: 2, period: 'Dec 1-15, 2025', gross: 3800000, net: 2847500, processed: 'Dec 15, 2025', status: 'completed', employees: 45 },
            { id: 3, period: 'Nov 16-30, 2025', gross: 3800000, net: 2847500, processed: 'Nov 30, 2025', status: 'completed', employees: 45 },
            { id: 4, period: 'Nov 1-15, 2025', gross: 3800000, net: 2847500, processed: 'Nov 15, 2025', status: 'completed', employees: 44 }
        ]
    };

    const formatCurrency = (amount : any) => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const router = useRouter();
    useEffect(() => {
        const role = localStorage.getItem("role");
        

        if(role !== "client"){
            router.push('/')
        }
    },[])

    return (
        <div className="min-h-screen bg-neutral-50">
            {/* Header */}
            <Navbar/>

            {/* Navigation Tabs */}
            <div className="bg-white border-b border-neutral-200">
                <div className="max-w-7xl mx-auto px-6">
                    <nav className="flex items-center gap-8">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`py-4 text-sm font-medium transition-colors border-b-2 ${
                                activeTab === 'overview' 
                                    ? 'border-neutral-900 text-neutral-900' 
                                    : 'border-transparent text-neutral-600 hover:text-neutral-900'
                            }`}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab('employees')}
                            className={`py-4 text-sm font-medium transition-colors border-b-2 ${
                                activeTab === 'employees' 
                                    ? 'border-neutral-900 text-neutral-900' 
                                    : 'border-transparent text-neutral-600 hover:text-neutral-900'
                            }`}
                        >
                            Employees
                        </button>
                        <button
                            onClick={() => setActiveTab('history')}
                            className={`py-4 text-sm font-medium transition-colors border-b-2 ${
                                activeTab === 'history' 
                                    ? 'border-neutral-900 text-neutral-900' 
                                    : 'border-transparent text-neutral-600 hover:text-neutral-900'
                            }`}
                        >
                            Payroll History
                        </button>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                {activeTab === 'overview' && (
                    <div className="space-y-6">
                        {/* Welcome Section */}
                        <div>
                            <h2 className="text-3xl font-bold text-neutral-900 mb-2">Payroll Overview</h2>
                            <p className="text-neutral-600">Current pay period: {companyData.currentPayroll.period}</p>
                        </div>

                        {/* Current Payroll Alert */}
                        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <AlertCircle className="text-yellow-600" size={24} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-neutral-900 mb-1">Payroll Awaiting Your Approval</h3>
                                    <p className="text-neutral-600 mb-4">
                                        Your accountant has prepared the payroll for {companyData.currentPayroll.period}. 
                                        Please review and approve before {companyData.currentPayroll.dueDate}.
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <button className="px-4 py-2 bg-white border-2 border-neutral-300 rounded-lg font-medium text-neutral-700 hover:border-neutral-400 transition-colors flex items-center gap-2">
                                            <Eye size={18} />
                                            Review Details
                                        </button>
                                        <button className="px-6 py-2 bg-neutral-900 text-white rounded-lg font-medium hover:bg-neutral-800 transition-colors flex items-center gap-2">
                                            Approve Payroll
                                            <ChevronRight size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="bg-white p-6 rounded-lg border-2 border-neutral-200">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center">
                                        <DollarSign className="text-neutral-900" size={24} />
                                    </div>
                                </div>
                                <div className="text-2xl font-bold text-neutral-900 mb-1">
                                    {formatCurrency(companyData.currentPayroll.totalNet)}
                                </div>
                                <div className="text-sm text-neutral-600">Net Payroll Amount</div>
                            </div>

                            <div className="bg-white p-6 rounded-lg border-2 border-neutral-200">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center">
                                        <Users className="text-neutral-900" size={24} />
                                    </div>
                                </div>
                                <div className="text-2xl font-bold text-neutral-900 mb-1">
                                    {companyData.currentPayroll.employeeCount}
                                </div>
                                <div className="text-sm text-neutral-600">Total Employees</div>
                            </div>

                            <div className="bg-white p-6 rounded-lg border-2 border-neutral-200">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center">
                                        <Calendar className="text-neutral-900" size={24} />
                                    </div>
                                </div>
                                <div className="text-2xl font-bold text-neutral-900 mb-1">Jan 20</div>
                                <div className="text-sm text-neutral-600">Payment Due Date</div>
                            </div>

                            <div className="bg-white p-6 rounded-lg border-2 border-neutral-200">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center">
                                        <Clock className="text-neutral-900" size={24} />
                                    </div>
                                </div>
                                <div className="text-2xl font-bold text-neutral-900 mb-1">5 days</div>
                                <div className="text-sm text-neutral-600">Time Remaining</div>
                            </div>
                        </div>

                        {/* Payroll Breakdown */}
                        <div className="bg-white p-8 rounded-lg border-2 border-neutral-200">
                            <h3 className="text-xl font-bold text-neutral-900 mb-6">Payroll Breakdown</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div>
                                    <div className="text-sm text-neutral-600 mb-2">Total Gross Pay</div>
                                    <div className="text-3xl font-bold text-neutral-900">{formatCurrency(companyData.currentPayroll.totalGross)}</div>
                                    <div className="text-sm text-neutral-600 mt-1">Base salaries and overtime</div>
                                </div>
                                <div>
                                    <div className="text-sm text-neutral-600 mb-2">Total Deductions</div>
                                    <div className="text-3xl font-bold text-red-600">{formatCurrency(companyData.currentPayroll.totalDeductions)}</div>
                                    <div className="text-sm text-neutral-600 mt-1">Taxes, SSS, PhilHealth, Pag-IBIG</div>
                                </div>
                                <div>
                                    <div className="text-sm text-neutral-600 mb-2">Net Pay (Take Home)</div>
                                    <div className="text-3xl font-bold text-green-600">{formatCurrency(companyData.currentPayroll.totalNet)}</div>
                                    <div className="text-sm text-neutral-600 mt-1">Amount to be disbursed</div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white p-6 rounded-lg border-2 border-neutral-200">
                            <h3 className="text-lg font-bold text-neutral-900 mb-4">Recent Activity</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4 pb-4 border-b border-neutral-100">
                                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <AlertCircle className="text-yellow-600" size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-medium text-neutral-900">Payroll ready for approval</div>
                                        <div className="text-sm text-neutral-600">January 13, 2026 • Period: Jan 1-15, 2026</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 pb-4 border-b border-neutral-100">
                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <CheckCircle className="text-green-600" size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-medium text-neutral-900">Payroll disbursed successfully</div>
                                        <div className="text-sm text-neutral-600">December 31, 2025 • {formatCurrency(2847500)}</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <FileText className="text-blue-600" size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-medium text-neutral-900">Payroll approved by you</div>
                                        <div className="text-sm text-neutral-600">December 28, 2025 • Period: Dec 16-31, 2025</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'employees' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-3xl font-bold text-neutral-900 mb-2">Employee Payroll</h2>
                                <p className="text-neutral-600">Current period: {companyData.currentPayroll.period}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Search employees..."
                                        className="pl-10 pr-4 py-2 bg-white border-2 border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900 transition-colors"
                                    />
                                </div>
                                <button className="px-4 py-2 bg-white border-2 border-neutral-200 rounded-lg font-medium text-neutral-700 hover:border-neutral-300 transition-colors flex items-center gap-2">
                                    <Filter size={18} />
                                    Filter
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg border-2 border-neutral-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-neutral-50 border-b border-neutral-200">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-sm font-medium text-neutral-900">Employee</th>
                                            <th className="px-6 py-4 text-left text-sm font-medium text-neutral-900">Department</th>
                                            <th className="px-6 py-4 text-right text-sm font-medium text-neutral-900">Gross Pay</th>
                                            <th className="px-6 py-4 text-right text-sm font-medium text-neutral-900">Deductions</th>
                                            <th className="px-6 py-4 text-right text-sm font-medium text-neutral-900">Net Pay</th>
                                            <th className="px-6 py-4 text-center text-sm font-medium text-neutral-900">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-100">
                                        {companyData.employees.map((employee) => (
                                            <tr key={employee.id} className="hover:bg-neutral-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-neutral-900">{employee.name}</div>
                                                    <div className="text-sm text-neutral-600">{employee.role}</div>
                                                </td>
                                                <td className="px-6 py-4 text-neutral-600">{employee.department}</td>
                                                <td className="px-6 py-4 text-right font-medium text-neutral-900">
                                                    {formatCurrency(employee.gross)}
                                                </td>
                                                <td className="px-6 py-4 text-right text-red-600">
                                                    {formatCurrency(employee.deductions)}
                                                </td>
                                                <td className="px-6 py-4 text-right font-bold text-green-600">
                                                    {formatCurrency(employee.net)}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                                        Approved
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot className="bg-neutral-50 border-t-2 border-neutral-200">
                                        <tr>
                                            <td colSpan={2} className="px-6 py-4 font-bold text-neutral-900">TOTAL</td>
                                            <td className="px-6 py-4 text-right font-bold text-neutral-900">
                                                {formatCurrency(companyData.currentPayroll.totalGross)}
                                            </td>
                                            <td className="px-6 py-4 text-right font-bold text-red-600">
                                                {formatCurrency(companyData.currentPayroll.totalDeductions)}
                                            </td>
                                            <td className="px-6 py-4 text-right font-bold text-green-600">
                                                {formatCurrency(companyData.currentPayroll.totalNet)}
                                            </td>
                                            <td></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'history' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-3xl font-bold text-neutral-900 mb-2">Payroll History</h2>
                                <p className="text-neutral-600">View and download past payroll records</p>
                            </div>
                            <button className="px-4 py-2 bg-white border-2 border-neutral-200 rounded-lg font-medium text-neutral-700 hover:border-neutral-300 transition-colors flex items-center gap-2">
                                <Download size={18} />
                                Export All
                            </button>
                        </div>

                        <div className="space-y-4">
                            {companyData.history.map((record) => (
                                <div key={record.id} className="bg-white p-6 rounded-lg border-2 border-neutral-200 hover:border-neutral-300 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-4 mb-3">
                                                <h3 className="text-lg font-bold text-neutral-900">{record.period}</h3>
                                                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                                    Completed
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-4 gap-6">
                                                <div>
                                                    <div className="text-sm text-neutral-600 mb-1">Processed Date</div>
                                                    <div className="font-medium text-neutral-900">{record.processed}</div>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-neutral-600 mb-1">Employees</div>
                                                    <div className="font-medium text-neutral-900">{record.employees}</div>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-neutral-600 mb-1">Gross Amount</div>
                                                    <div className="font-medium text-neutral-900">{formatCurrency(record.gross)}</div>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-neutral-600 mb-1">Net Disbursed</div>
                                                    <div className="font-bold text-green-600">{formatCurrency(record.net)}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 ml-6">
                                            <button className="px-4 py-2 bg-white border-2 border-neutral-200 rounded-lg font-medium text-neutral-700 hover:border-neutral-300 transition-colors flex items-center gap-2">
                                                <Eye size={18} />
                                                View
                                            </button>
                                            <button className="px-4 py-2 bg-white border-2 border-neutral-200 rounded-lg font-medium text-neutral-700 hover:border-neutral-300 transition-colors flex items-center gap-2">
                                                <Download size={18} />
                                                PDF
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}