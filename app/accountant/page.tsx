'use client'
import React, { useState } from 'react';
import { Users, DollarSign, FileText, Calendar, Download, Eye, ChevronRight, Bell, Settings, Search, Filter, CheckCircle, AlertCircle, Plus, Send, Edit, X, Save } from 'lucide-react';

export default function AccountantDashboard() {
    const [activeTab, setActiveTab] = useState('review');
    const [editingRow, setEditingRow] = useState<number | null>(null);

    // DATA SCHEMA: Complete Payroll Run Object from Accountant's Perspective
    const payrollData = {
        id: 'PR-2026-001',
        client: {
            id: 'CLIENT-ABC-001',
            name: 'ABC Manufacturing Inc.',
            contact: 'client@abc-mfg.com'
        },
        period: {
            start: '2026-01-01',
            end: '2026-01-15',
            label: 'January 1-15, 2026'
        },
        status: 'draft',
        
        audit: {
            createdBy: 'accountant@firm.com',
            createdAt: '2026-01-13T08:00:00Z',
            submittedBy: null,
            submittedAt: null
        },
        
        payment: {
            dueDate: '2026-01-20',
            disbursementMethod: 'bank_transfer'
        },
        
        totals: {
            grossPay: 3800000,
            govtDeductions: 665000,
            withholdingTax: 287500,
            netPay: 2847500,
            employeeCount: 45
        },
        
        employees: [
            { 
                id: 1,
                employeeId: 'ABC-EMP-001',
                name: 'Maria Santos',
                role: 'Operations Manager',
                department: 'Operations',
                grossPay: 85000,
                deductions: {
                    sss: 2000,
                    philHealth: 1500,
                    pagIbig: 250,
                    withholdingTax: 9000,
                    total: 12750
                },
                netPay: 72250,
                status: 'verified',
                bankAccount: '1234567890',
                bankName: 'BDO'
            },
            { 
                id: 2,
                employeeId: 'ABC-EMP-002',
                name: 'Juan Dela Cruz',
                role: 'Sales Lead',
                department: 'Sales',
                grossPay: 65000,
                deductions: {
                    sss: 1800,
                    philHealth: 1200,
                    pagIbig: 250,
                    withholdingTax: 6500,
                    total: 9750
                },
                netPay: 55250,
                status: 'verified',
                bankAccount: '2345678901',
                bankName: 'BPI'
            },
            { 
                id: 3,
                employeeId: 'ABC-EMP-003',
                name: 'Ana Reyes',
                role: 'Software Engineer',
                department: 'IT',
                grossPay: 95000,
                deductions: {
                    sss: 2200,
                    philHealth: 1600,
                    pagIbig: 250,
                    withholdingTax: 10200,
                    total: 14250
                },
                netPay: 80750,
                status: 'verified',
                bankAccount: '3456789012',
                bankName: 'BDO'
            },
            { 
                id: 4,
                employeeId: 'ABC-EMP-004',
                name: 'Carlos Mendoza',
                role: 'Marketing Specialist',
                department: 'Marketing',
                grossPay: 55000,
                deductions: {
                    sss: 1600,
                    philHealth: 1000,
                    pagIbig: 250,
                    withholdingTax: 5400,
                    total: 8250
                },
                netPay: 46750,
                status: 'verified',
                bankAccount: '4567890123',
                bankName: 'Metrobank'
            },
            { 
                id: 5,
                employeeId: 'ABC-EMP-005',
                name: 'Lisa Garcia',
                role: 'HR Manager',
                department: 'Human Resources',
                grossPay: 75000,
                deductions: {
                    sss: 1900,
                    philHealth: 1400,
                    pagIbig: 250,
                    withholdingTax: 7700,
                    total: 11250
                },
                netPay: 63750,
                status: 'verified',
                bankAccount: '5678901234',
                bankName: 'BDO'
            },
            { 
                id: 6,
                employeeId: 'ABC-EMP-006',
                name: 'Robert Tan',
                role: 'Production Supervisor',
                department: 'Operations',
                grossPay: 70000,
                deductions: {
                    sss: 1850,
                    philHealth: 1300,
                    pagIbig: 250,
                    withholdingTax: 7100,
                    total: 10500
                },
                netPay: 59500,
                status: 'verified',
                bankAccount: '6789012345',
                bankName: 'BPI'
            },
            { 
                id: 7,
                employeeId: 'ABC-EMP-007',
                name: 'Elena Cruz',
                role: 'Accountant',
                department: 'Finance',
                grossPay: 60000,
                deductions: {
                    sss: 1700,
                    philHealth: 1100,
                    pagIbig: 250,
                    withholdingTax: 5950,
                    total: 9000
                },
                netPay: 51000,
                status: 'verified',
                bankAccount: '7890123456',
                bankName: 'BDO'
            },
            { 
                id: 8,
                employeeId: 'ABC-EMP-008',
                name: 'Michael Santos',
                role: 'Quality Control',
                department: 'Operations',
                grossPay: 50000,
                deductions: {
                    sss: 1500,
                    philHealth: 900,
                    pagIbig: 250,
                    withholdingTax: 4850,
                    total: 7500
                },
                netPay: 42500,
                status: 'verified',
                bankAccount: '8901234567',
                bankName: 'Metrobank'
            }
        ],
        
        notes: 'All calculations verified. Ready for client submission.',
        
        clients: [
            { id: 1, name: 'ABC Manufacturing Inc.', activePayrolls: 1, employees: 45, lastPayroll: '2025-12-31' },
            { id: 2, name: 'XYZ Retail Corp.', activePayrolls: 0, employees: 32, lastPayroll: '2025-12-30' },
            { id: 3, name: 'Tech Solutions Ltd.', activePayrolls: 1, employees: 28, lastPayroll: '2025-12-31' }
        ]
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
            pending_approval: 'bg-yellow-100 text-yellow-800',
            approved: 'bg-blue-100 text-blue-800',
            disbursed: 'bg-purple-100 text-purple-800'
        };
        return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="min-h-screen bg-neutral-50">
            {/* Header */}
            <header className="bg-white border-b border-neutral-200">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <h1 className="text-2xl font-bold text-neutral-900">Payroll System</h1>
                        <div className="hidden md:block text-sm text-neutral-600">
                            ABC Manufacturing Inc.
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-neutral-600 hover:text-neutral-900 transition-colors">
                            <Bell size={20} />
                        </button>
                        <button className="p-2 text-neutral-600 hover:text-neutral-900 transition-colors">
                            <Settings size={20} />
                        </button>
                        <div className="w-10 h-10 bg-neutral-900 text-white rounded-lg flex items-center justify-center text-sm font-bold">
                            AP
                        </div>
                    </div>
                </div>
            </header>

            {/* Navigation Tabs */}
            <div className="bg-white border-b border-neutral-200">
                <div className="max-w-7xl mx-auto px-6">
                    <nav className="flex items-center gap-8">
                        <button
                            onClick={() => setActiveTab('review')}
                            className={`py-4 text-sm font-medium transition-colors border-b-2 ${
                                activeTab === 'review' 
                                    ? 'border-neutral-900 text-neutral-900' 
                                    : 'border-transparent text-neutral-600 hover:text-neutral-900'
                            }`}
                        >
                            Payroll Review
                        </button>
                        <button
                            onClick={() => setActiveTab('calculations')}
                            className={`py-4 text-sm font-medium transition-colors border-b-2 ${
                                activeTab === 'calculations' 
                                    ? 'border-neutral-900 text-neutral-900' 
                                    : 'border-transparent text-neutral-600 hover:text-neutral-900'
                            }`}
                        >
                            Calculations
                        </button>
                        <button
                            onClick={() => setActiveTab('reports')}
                            className={`py-4 text-sm font-medium transition-colors border-b-2 ${
                                activeTab === 'reports' 
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
                                        Draft
                                    </span>
                                </div>
                                <p className="text-neutral-600">
                                    {payrollData.client.name} • {payrollData.period.label}
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="px-4 py-2 bg-white border-2 border-neutral-200 rounded-lg font-medium text-neutral-700 hover:border-neutral-300 transition-colors flex items-center gap-2">
                                    <Save size={18} />
                                    Save Draft
                                </button>
                                <button className="px-6 py-2 bg-neutral-900 text-white rounded-lg font-medium hover:bg-neutral-800 transition-colors flex items-center gap-2">
                                    <Send size={18} />
                                    Submit to Client
                                </button>
                            </div>
                        </div>

                        {/* Verification Summary */}
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                            <CheckCircle className="text-green-600" size={20} />
                            <div className="flex-1">
                                <div className="font-medium text-neutral-900">All employees verified</div>
                                <div className="text-sm text-neutral-600">
                                    {payrollData.totals.employeeCount} employees ready for submission • Calculations complete
                                </div>
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

                        {/* HIGH DENSITY DATA TABLE */}
                        <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
                                <h3 className="text-lg font-bold text-neutral-900">Employee Payroll Details</h3>
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                                        <input
                                            type="text"
                                            placeholder="Search employees..."
                                            className="pl-9 pr-3 py-2 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900 transition-colors"
                                        />
                                    </div>
                                    <button className="px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-100 transition-colors flex items-center gap-2">
                                        <Filter size={16} />
                                        Filter
                                    </button>
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
                                            <th className="px-4 py-3 text-right font-medium text-neutral-900">SSS</th>
                                            <th className="px-4 py-3 text-right font-medium text-neutral-900">PhilHealth</th>
                                            <th className="px-4 py-3 text-right font-medium text-neutral-900">Pag-IBIG</th>
                                            <th className="px-4 py-3 text-right font-medium text-neutral-900">W. Tax</th>
                                            <th className="px-4 py-3 text-right font-medium text-neutral-900">Net Pay</th>
                                            <th className="px-4 py-3 text-center font-medium text-neutral-900">Status</th>
                                            <th className="px-4 py-3 text-center font-medium text-neutral-900">Actions</th>
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
                                                    {formatCurrency(employee.deductions.sss)}
                                                </td>
                                                <td className="px-4 py-3 text-right text-neutral-600">
                                                    {formatCurrency(employee.deductions.philHealth)}
                                                </td>
                                                <td className="px-4 py-3 text-right text-neutral-600">
                                                    {formatCurrency(employee.deductions.pagIbig)}
                                                </td>
                                                <td className="px-4 py-3 text-right text-neutral-600">
                                                    {formatCurrency(employee.deductions.withholdingTax)}
                                                </td>
                                                <td className="px-4 py-3 text-right font-bold text-green-600">
                                                    {formatCurrency(employee.netPay)}
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(employee.status)}`}>
                                                        Verified
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <button className="p-1 text-neutral-400 hover:text-neutral-900 transition-colors">
                                                        <Edit size={16} />
                                                    </button>
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
                                                {formatCurrency(payrollData.employees.reduce((sum, e) => sum + e.deductions.sss, 0))}
                                            </td>
                                            <td className="px-4 py-3 text-right text-neutral-900">
                                                {formatCurrency(payrollData.employees.reduce((sum, e) => sum + e.deductions.philHealth, 0))}
                                            </td>
                                            <td className="px-4 py-3 text-right text-neutral-900">
                                                {formatCurrency(payrollData.employees.reduce((sum, e) => sum + e.deductions.pagIbig, 0))}
                                            </td>
                                            <td className="px-4 py-3 text-right text-neutral-900">
                                                {formatCurrency(payrollData.totals.withholdingTax)}
                                            </td>
                                            <td className="px-4 py-3 text-right text-green-600">
                                                {formatCurrency(payrollData.totals.netPay)}
                                            </td>
                                            <td colSpan={2}></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>

                        {/* Notes Section */}
                        <div className="bg-white p-6 rounded-lg border border-neutral-200">
                            <h3 className="text-sm font-medium text-neutral-900 mb-3">Notes for Client</h3>
                            <textarea
                                className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900 transition-colors text-sm"
                                rows={3}
                                placeholder="Add any notes or special instructions for the client..."
                                defaultValue={payrollData.notes}
                            />
                        </div>
                    </div>
                )}

                {activeTab === 'reports' && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-3xl font-bold text-neutral-900 mb-2">Payroll Reports</h2>
                            <p className="text-neutral-600">Generate and export payroll reports</p>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <button className="bg-white p-6 rounded-lg border border-neutral-200 hover:border-neutral-300 transition-colors text-left group">
                                <FileText className="text-neutral-600 mb-3 group-hover:text-neutral-900 transition-colors" size={24} />
                                <h3 className="font-bold text-neutral-900 mb-2">Payroll Summary</h3>
                                <p className="text-sm text-neutral-600">Complete payroll breakdown by employee</p>
                            </button>

                            <button className="bg-white p-6 rounded-lg border border-neutral-200 hover:border-neutral-300 transition-colors text-left group">
                                <DollarSign className="text-neutral-600 mb-3 group-hover:text-neutral-900 transition-colors" size={24} />
                                <h3 className="font-bold text-neutral-900 mb-2">Government Remittances</h3>
                                <p className="text-sm text-neutral-600">SSS, PhilHealth, Pag-IBIG reports</p>
                            </button>

                            <button className="bg-white p-6 rounded-lg border border-neutral-200 hover:border-neutral-300 transition-colors text-left group">
                                <FileText className="text-neutral-600 mb-3 group-hover:text-neutral-900 transition-colors" size={24} />
                                <h3 className="font-bold text-neutral-900 mb-2">BIR Forms</h3>
                                <p className="text-sm text-neutral-600">Withholding tax forms and filing</p>
                            </button>
                        </div>

                        <div className="bg-white p-6 rounded-lg border border-neutral-200">
                            <h3 className="text-lg font-bold text-neutral-900 mb-4">Recent Reports</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                                    <div>
                                        <div className="font-medium text-neutral-900">Payroll Summary - December 2025</div>
                                        <div className="text-sm text-neutral-500">Generated on Dec 31, 2025</div>
                                    </div>
                                    <button className="px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-100 transition-colors flex items-center gap-2">
                                        <Download size={16} />
                                        Download
                                    </button>
                                </div>
                                <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                                    <div>
                                        <div className="font-medium text-neutral-900">Government Remittances - Q4 2025</div>
                                        <div className="text-sm text-neutral-500">Generated on Dec 31, 2025</div>
                                    </div>
                                    <button className="px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-100 transition-colors flex items-center gap-2">
                                        <Download size={16} />
                                        Download
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'calculations' && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-3xl font-bold text-neutral-900 mb-2">Calculation Breakdown</h2>
                            <p className="text-neutral-600">Detailed tax and deduction calculations</p>
                        </div>

                        {/* Calculation Reference Tables */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-lg border border-neutral-200">
                                <h3 className="text-lg font-bold text-neutral-900 mb-4">SSS Contribution Table</h3>
                                <div className="text-sm space-y-2 text-neutral-600">
                                    <div className="flex justify-between py-2 border-b border-neutral-100">
                                        <span>Contribution Rate</span>
                                        <span className="font-medium">15% of MSC</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-neutral-100">
                                        <span>Employee Share</span>
                                        <span className="font-medium">5% of MSC</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-neutral-100">
                                        <span>Employer Share</span>
                                        <span className="font-medium">10% of MSC + EC</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-neutral-100">
                                        <span>Minimum MSC</span>
                                        <span className="font-medium">₱5,000</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-neutral-100">
                                        <span>Maximum MSC</span>
                                        <span className="font-medium">₱35,000</span>
                                    </div>
                                    <div className="text-xs text-neutral-500 mt-3">
                                        MSC = Monthly Salary Credit. Based on 2026 SSS contribution schedule
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg border border-neutral-200">
                                <h3 className="text-lg font-bold text-neutral-900 mb-4">PhilHealth Contribution</h3>
                                <div className="text-sm space-y-2 text-neutral-600">
                                    <div className="flex justify-between py-2 border-b border-neutral-100">
                                        <span>Premium Rate</span>
                                        <span className="font-medium">5%</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-neutral-100">
                                        <span>Employee Share</span>
                                        <span className="font-medium">2.5%</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-neutral-100">
                                        <span>Income Floor</span>
                                        <span className="font-medium">₱10,000</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-neutral-100">
                                        <span>Income Ceiling</span>
                                        <span className="font-medium">₱100,000</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-neutral-100">
                                        <span>Max Contribution</span>
                                        <span className="font-medium">₱2,500/month (employee)</span>
                                    </div>
                                    <div className="text-xs text-neutral-500 mt-3">
                                        Employee contribution: 2.5% of basic salary, capped at ₱2,500
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg border border-neutral-200">
                                <h3 className="text-lg font-bold text-neutral-900 mb-4">Pag-IBIG Contribution</h3>
                                <div className="text-sm space-y-2 text-neutral-600">
                                    <div className="flex justify-between py-2 border-b border-neutral-100">
                                        <span>Rate (₱1,500 and below)</span>
                                        <span className="font-medium">1% of salary</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-neutral-100">
                                        <span>Rate (Above ₱1,500)</span>
                                        <span className="font-medium">2% of salary</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-neutral-100">
                                        <span>Maximum Fund Salary</span>
                                        <span className="font-medium">₱10,000</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-neutral-100">
                                        <span>Max Contribution</span>
                                        <span className="font-medium">₱200/month</span>
                                    </div>
                                    <div className="text-xs text-neutral-500 mt-3">
                                        Employee and employer contribute equally (2% each, capped at ₱200)
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg border border-neutral-200">
                                <h3 className="text-lg font-bold text-neutral-900 mb-4">Withholding Tax</h3>
                                <div className="text-sm space-y-2 text-neutral-600">
                                    <div className="flex justify-between py-2 border-b border-neutral-100">
                                        <span>₱0 - ₱250,000</span>
                                        <span className="font-medium">0%</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-neutral-100">
                                        <span>₱250,001 - ₱400,000</span>
                                        <span className="font-medium">15%</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-neutral-100">
                                        <span>₱400,001 - ₱800,000</span>
                                        <span className="font-medium">20%</span>
                                    </div>
                                    <div className="text-xs text-neutral-500 mt-3">
                                        Progressive tax rate on annual income
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Formula Reference */}
                        <div className="bg-neutral-900 text-white p-6 rounded-lg">
                            <h3 className="text-lg font-bold mb-4">Net Pay Formula</h3>
                            <div className="font-mono text-sm space-y-2">
                                <div>Net Pay = Gross Pay - (SSS + PhilHealth + Pag-IBIG + Withholding Tax)</div>
                                <div className="text-neutral-400 mt-4">Example (₱85,000 gross salary):</div>
                                <div className="text-neutral-300 space-y-1">
                                    <div>• SSS: 5% of ₱35,000 (max MSC) = ₱1,750</div>
                                    <div>• PhilHealth: 2.5% of ₱85,000 = ₱2,125</div>
                                    <div>• Pag-IBIG: 2% of ₱10,000 (max) = ₱200</div>
                                    <div>• Withholding Tax: ~₱9,000 (varies by annual income)</div>
                                    <div className="pt-2 border-t border-neutral-700">Net Pay: ₱85,000 - ₱13,075 = ₱71,925</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}