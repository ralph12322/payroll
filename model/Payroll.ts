import mongoose from 'mongoose';

const DeductionSchema = new mongoose.Schema({
  sss: { type: Number, required: true },
  philHealth: { type: Number, required: true },
  pagIbig: { type: Number, required: true },
  withholdingTax: { type: Number, required: true },
  total: { type: Number, required: true }
});

const EmployeeSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  employeeId: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  department: { type: String, required: true },
  grossPay: { type: Number, required: true },
  deductions: { type: DeductionSchema, required: true },
  netPay: { type: Number, required: true },
  status: { 
    type: String,
    enum: ["verified", "pending", "flagged"],
    default: "pending"
  },
  bankAccount: { type: String, required: true },
  bankName: { type: String, required: true }
});

const PayrollSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  period: {
    start: { type: String, required: true },
    end: { type: String, required: true },
    label: { type: String, required: true }
  },
  status: {
    type: String,
    enum: ["draft", "submitted", "approved", "processed"],
    default: "draft"
  },
  audit: {
    createdBy: { type: mongoose.Schema.Types.ObjectId, 
                 ref: "User",
                 required: true },
    createdAt: { type: Date, required: true },
    submittedBy: { type: mongoose.Schema.Types.ObjectId,
                   ref: "User", required: true },
    submittedAt: { type: Date, default: null }
  },
  payment: {
    dueDate: { type: String, required: true },
    disbursementMethod: {
      type: String,
      enum: ["bank_transfer", "cash", "check"],
      required: true
    }
  },
  totals: {
    grossPay: { type: Number, required: true },
    govtDeductions: { type: Number, required: true },
    withholdingTax: { type: Number, required: true },
    netPay: { type: Number, required: true },
    employeeCount: { type: Number, required: true }
  },
  employees: { type: [EmployeeSchema], required: true }
}, {
  timestamps: true
});

export default mongoose.models.Payroll || mongoose.model("Payroll", PayrollSchema);

/*for sample run:

{
  "payroll_run": {
    "id": "string",

    "client": {
      "id": "string",
      "name": "string",
      "contact": "string"
    },

    "status": "draft | submitted | approved | processed",

    "audit": {
      "createdBy": "accountant_id",
      "createdAt": "2025-01-01T08:30:00Z",

      "submittedBy": "accountant_id | null",
      "submittedAt": "2025-01-01T10:00:00Z | null"
    },

    "payment": {
      "dueDate": "YYYY-MM-DD",
      "disbursementMethod": "bank_transfer | cash | check"
    },

    "totals": {
      "grossPay": 0,
      "govtDeductions": 0,
      "withholdingTax": 0,
      "netPay": 0,
      "employeeCount": 0
    },

    "employees": [
      {
        "employeeId": "EMP-001",
        "name": "John Doe",
        "role": "Software Engineer",
        "department": "IT",

        "grossPay": 30000,

        "deductions": {
          "sss": 1200,
          "philHealth": 450,
          "pagIbig": 200,
          "withholdingTax": 3000,
          "total": 4850
        },

        "netPay": 25150,

        "status": "verified | pending | flagged",

        "bank": {
          "bankAccount": "1234567890",
          "bankName": "BPI"
        }
      }
    ]
  }
}
*/
