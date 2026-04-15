import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

const employees = [
  // ── Historical (2015–2023) ──────────────────────────────────────────
  {
    first_name: 'Sam',       last_name: 'Hall',
    email: 'sam.hall@hrportal.com',
    area: 'Engineering', seniority: 'Lead', status: 'active', hire_date: '2015-12-01',
  },
  {
    first_name: 'Isabella',  last_name: 'Anderson',
    email: 'isabella.anderson@hrportal.com',
    area: 'HR', seniority: 'Lead', status: 'active', hire_date: '2016-11-30',
  },
  {
    first_name: 'Henry',     last_name: 'Garcia',
    email: 'henry.garcia@hrportal.com',
    area: 'Sales', seniority: 'Senior', status: 'inactive', hire_date: '2017-09-25',
  },
  {
    first_name: 'Rachel',    last_name: 'Walker',
    email: 'rachel.walker@hrportal.com',
    area: 'Sales', seniority: 'Lead', status: 'active', hire_date: '2017-04-28',
  },
  {
    first_name: 'Bob',       last_name: 'Martinez',
    email: 'bob.martinez@hrportal.com',
    area: 'Engineering', seniority: 'Lead', status: 'active', hire_date: '2018-07-01',
  },
  {
    first_name: 'Noah',      last_name: 'Harris',
    email: 'noah.harris@hrportal.com',
    area: 'Engineering', seniority: 'Senior', status: 'inactive', hire_date: '2018-02-14',
  },
  {
    first_name: 'Carol',     last_name: 'Smith',
    email: 'carol.smith@hrportal.com',
    area: 'HR', seniority: 'Senior', status: 'active', hire_date: '2019-01-20',
  },
  {
    first_name: 'Kate',      last_name: 'Thomas',
    email: 'kate.thomas@hrportal.com',
    area: 'Marketing', seniority: 'Lead', status: 'active', hire_date: '2019-05-06',
  },
  {
    first_name: 'Alice',     last_name: 'Johnson',
    email: 'alice.johnson@hrportal.com',
    area: 'Engineering', seniority: 'Senior', status: 'active', hire_date: '2020-03-15',
  },
  {
    first_name: 'James',     last_name: 'Taylor',
    email: 'james.taylor@hrportal.com',
    area: 'Finance', seniority: 'Senior', status: 'active', hire_date: '2020-08-17',
  },
  {
    first_name: 'Uma',       last_name: 'Young',
    email: 'uma.young@hrportal.com',
    area: 'Marketing', seniority: 'Senior', status: 'active', hire_date: '2020-06-29',
  },
  {
    first_name: 'David',     last_name: 'Lee',
    email: 'david.lee@hrportal.com',
    area: 'Sales', seniority: 'Mid', status: 'active', hire_date: '2021-06-14',
  },
  {
    first_name: 'Olivia',    last_name: 'Clark',
    email: 'olivia.clark@hrportal.com',
    area: 'Finance', seniority: 'Mid', status: 'active', hire_date: '2021-11-22',
  },
  {
    first_name: 'Victor',    last_name: 'King',
    email: 'victor.king@hrportal.com',
    area: 'Sales', seniority: 'Mid', status: 'active', hire_date: '2021-03-08',
  },
  {
    first_name: 'Frank',     last_name: 'Brown',
    email: 'frank.brown@hrportal.com',
    area: 'Marketing', seniority: 'Mid', status: 'active', hire_date: '2022-04-11',
  },
  {
    first_name: 'Liam',      last_name: 'Jackson',
    email: 'liam.jackson@hrportal.com',
    area: 'Engineering', seniority: 'Mid', status: 'active', hire_date: '2022-10-03',
  },
  {
    first_name: 'Quinn',     last_name: 'Robinson',
    email: 'quinn.robinson@hrportal.com',
    area: 'HR', seniority: 'Mid', status: 'active', hire_date: '2022-01-17',
  },
  {
    first_name: 'Emma',      last_name: 'Wilson',
    email: 'emma.wilson@hrportal.com',
    area: 'Finance', seniority: 'Junior', status: 'active', hire_date: '2023-02-01',
  },
  {
    first_name: 'Mia',       last_name: 'White',
    email: 'mia.white@hrportal.com',
    area: 'Sales', seniority: 'Junior', status: 'active', hire_date: '2023-07-19',
  },
  {
    first_name: 'Tina',      last_name: 'Allen',
    email: 'tina.allen@hrportal.com',
    area: 'Finance', seniority: 'Junior', status: 'inactive', hire_date: '2023-09-11',
  },
  {
    first_name: 'Grace',     last_name: 'Davis',
    email: 'grace.davis@hrportal.com',
    area: 'Engineering', seniority: 'Junior', status: 'active', hire_date: '2024-01-08',
  },
  {
    first_name: 'Paul',      last_name: 'Lewis',
    email: 'paul.lewis@hrportal.com',
    area: 'Marketing', seniority: 'Junior', status: 'active', hire_date: '2024-03-04',
  },

  // ── Recent hires — last 12 months (2025–2026) ───────────────────────
  {
    first_name: 'Sofia',     last_name: 'Reyes',
    email: 'sofia.reyes@hrportal.com',
    area: 'Engineering', seniority: 'Mid', status: 'active', hire_date: '2025-05-12',
  },
  {
    first_name: 'Daniel',    last_name: 'Nguyen',
    email: 'daniel.nguyen@hrportal.com',
    area: 'HR', seniority: 'Junior', status: 'active', hire_date: '2025-06-03',
  },
  {
    first_name: 'Laura',     last_name: 'Patel',
    email: 'laura.patel@hrportal.com',
    area: 'Finance', seniority: 'Senior', status: 'active', hire_date: '2025-06-18',
  },
  {
    first_name: 'Marco',     last_name: 'Ferrari',
    email: 'marco.ferrari@hrportal.com',
    area: 'Sales', seniority: 'Mid', status: 'active', hire_date: '2025-07-07',
  },
  {
    first_name: 'Aisha',     last_name: 'Okafor',
    email: 'aisha.okafor@hrportal.com',
    area: 'Engineering', seniority: 'Junior', status: 'active', hire_date: '2025-08-21',
  },
  {
    first_name: 'Chris',     last_name: 'Müller',
    email: 'chris.muller@hrportal.com',
    area: 'Marketing', seniority: 'Mid', status: 'active', hire_date: '2025-09-04',
  },
  {
    first_name: 'Yuki',      last_name: 'Tanaka',
    email: 'yuki.tanaka@hrportal.com',
    area: 'Engineering', seniority: 'Senior', status: 'active', hire_date: '2025-09-29',
  },
  {
    first_name: 'Priya',     last_name: 'Sharma',
    email: 'priya.sharma@hrportal.com',
    area: 'HR', seniority: 'Mid', status: 'active', hire_date: '2025-10-14',
  },
  {
    first_name: 'Leon',      last_name: 'Becker',
    email: 'leon.becker@hrportal.com',
    area: 'Finance', seniority: 'Junior', status: 'active', hire_date: '2025-11-03',
  },
  {
    first_name: 'Camille',   last_name: 'Dubois',
    email: 'camille.dubois@hrportal.com',
    area: 'Marketing', seniority: 'Senior', status: 'active', hire_date: '2025-11-20',
  },
  {
    first_name: 'Omar',      last_name: 'Hassan',
    email: 'omar.hassan@hrportal.com',
    area: 'Sales', seniority: 'Lead', status: 'active', hire_date: '2025-12-08',
  },
  {
    first_name: 'Nina',      last_name: 'Johansson',
    email: 'nina.johansson@hrportal.com',
    area: 'Engineering', seniority: 'Mid', status: 'active', hire_date: '2026-01-13',
  },
  {
    first_name: 'Rafael',    last_name: 'Soto',
    email: 'rafael.soto@hrportal.com',
    area: 'Sales', seniority: 'Junior', status: 'active', hire_date: '2026-02-05',
  },
  {
    first_name: 'Elena',     last_name: 'Kovač',
    email: 'elena.kovac@hrportal.com',
    area: 'Finance', seniority: 'Mid', status: 'active', hire_date: '2026-03-17',
  },
  {
    first_name: 'Ben',       last_name: 'Osei',
    email: 'ben.osei@hrportal.com',
    area: 'Engineering', seniority: 'Junior', status: 'active', hire_date: '2026-04-01',
  },
]

async function seed() {
  console.log('🗑️  Clearing existing employees...')
  const { error: deleteError } = await supabase
    .from('employees')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000') // delete all

  if (deleteError) {
    console.error('❌ Failed to clear table:', deleteError.message)
    process.exit(1)
  }

  console.log(`🌱 Seeding ${employees.length} employees...`)
  const { error } = await supabase.from('employees').insert(employees)

  if (error) {
    console.error('❌ Seed failed:', error.message)
    process.exit(1)
  }

  console.log('✅ Seed complete!')
  process.exit(0)
}

seed()