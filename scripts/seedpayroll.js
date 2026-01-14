const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in environment variables');
  process.exit(1);
}

console.log('Using MongoDB URI:', MONGODB_URI.substring(0, 30) + '...\n');

// Define schemas directly in seed script
const DeductionSchema = new mongoose.Schema({
  sss: Number,
  philHealth: Number,
  pagIbig: Number,
  withholdingTax: Number,
  total: Number
}, { _id: false });

const EmployeeSchema = new mongoose.Schema({
  id: Number,
  employeeId: String,
  name: String,
  role: String,
  department: String,
  grossPay: Number,
  deductions: DeductionSchema,
  netPay: Number,
  status: String,
  bankAccount: String,
  bankName: String
}, { _id: false });

const PayrollSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  client: {
    id: String,
    name: String,
    contact: String
  },
  period: {
    start: String,
    end: String,
    label: String
  },
  status: String,
  audit: {
    createdBy: String,
    createdAt: Date,
    submittedBy: String,
    submittedAt: Date
  },
  payment: {
    dueDate: String,
    disbursementMethod: String
  },
  totals: {
    grossPay: Number,
    govtDeductions: Number,
    withholdingTax: Number,
    netPay: Number,
    employeeCount: Number
  },
  employees: [EmployeeSchema]
}, { timestamps: true });

const seedData = {
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
    createdAt: new Date(),
    submittedBy: null,
    submittedAt: null
  },
  payment: {
    dueDate: '2026-01-20',
    disbursementMethod: 'bank_transfer'
  },
  totals: {
    grossPay: 555000,
    govtDeductions: 47200,
    withholdingTax: 47700,
    netPay: 460100,
    employeeCount: 8
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
  ]
};

async function seed() {
  let connection = null;
  
  try {
    console.log('🌱 Starting seed process...\n');
    console.log('📡 Connecting to MongoDB...');
    
   connection = await mongoose.connect(MONGODB_URI, {
  dbName: 'payroll' 
});
    console.log('✅ Connected to MongoDB successfully\n');

    // Clear existing model if it exists
    if (mongoose.models.Payroll) {
      delete mongoose.models.Payroll;
    }

    const Payroll = mongoose.model('Payroll', PayrollSchema);

    console.log('🗑️  Clearing existing payrolls...');
    const deleteResult = await Payroll.deleteMany({});
    console.log(`✅ Cleared ${deleteResult.deletedCount} existing payroll(s)\n`);

    console.log('💾 Inserting seed data...');
    const result = await Payroll.create(seedData);
    console.log('✅ Seed data inserted successfully!\n');
    
    console.log('📊 Inserted Document Summary:');
    console.log('  Database ID (_id):', result._id);
    console.log('  Payroll ID (id):', result.id);
    console.log('  Client:', result.client.name);
    console.log('  Period:', result.period.label);
    console.log('  Status:', result.status);
    console.log('  Employees:', result.employees.length);
    console.log('  Total Net Pay:', `₱${result.totals.netPay.toLocaleString()}`);
    
    // Verify it was actually saved
    console.log('\n🔍 Verifying data in database...');
    const found = await Payroll.findOne({ id: 'PR-2026-001' });
    
    if (found) {
      console.log('✅ VERIFIED: Payroll found in database!');
      console.log('  Found document with id:', found.id);
      console.log('  Client:', found.client.name);
      console.log('  Employees count:', found.employees.length);
    } else {
      console.log('❌ WARNING: Payroll NOT found after insertion!');
    }
    
    // Show collection stats
    const count = await Payroll.countDocuments();
    console.log('\n📈 Total documents in payrolls collection:', count);
    
    console.log('\n✨ Seeding completed successfully!\n');

  } catch (error) {
    console.error('\n❌ SEED ERROR:', error.message);
    console.error('\nFull error details:');
    console.error(error);
  } finally {
    if (connection) {
      await mongoose.connection.close();
      console.log('\n🔌 Database connection closed');
    }
    process.exit(error ? 1 : 0);
  }
}

seed();