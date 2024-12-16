import { createClient } from '@supabase/supabase-js'
import { fakerEN_GB as faker } from '@faker-js/faker'

// init supabase instance
const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY

if (!supabaseUrl || !supabaseServiceKey)
  throw new Error('Supabase URL and/or SERVICE KEY undefined')

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// logger
const logStep = (msg) => console.log(msg)
const logErr = (tableName, error) => {
  console.error(
    `An error occurred in table '${tableName}' with code ${error.code}: ${error.message}`,
  )
  process.exit(1)
}

//  table projects
const seedProjects = async (iterations) => {
  const TABLE_NAME = 'projects'

  logStep(`Seeding ${TABLE_NAME}...`)

  const mockData = []

  for (let i = 0; i < iterations; i++) {
    const name = faker.lorem.words(3)

    mockData.push({
      name,
      slug: name.toLocaleLowerCase().replace(/\s/g, '-'),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      collaborators: faker.helpers.arrayElements([1, 2, 3]),
    })
  }

  const { data, error } = await supabase.from(TABLE_NAME).insert(mockData).select()

  if (error) return logErr(TABLE_NAME, error)

  logStep(`Seeding ${TABLE_NAME} successful`)

  return data
}

// seed database
const seedDb = async () => {
  await seedProjects(10)
}

seedDb()
