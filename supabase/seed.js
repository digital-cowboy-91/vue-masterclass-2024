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

const seedWrapper = async (tableName, callback) => {
  logStep(`Seeding ${tableName}...`)

  const { data, error } = await callback()

  if (error) return logErr(tableName, error)

  logStep(`Seeding ${tableName} successful`)

  return data
}

//  table projects
const seedProjects = async (iterations) => {
  const tableName = 'projects'

  return seedWrapper(tableName, async () => {
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

    return supabase.from(tableName).insert(mockData).select()
  })
}

// table tasks
const seedTasks = async (iterations, projectIds) => {
  const tableName = 'tasks'

  return seedWrapper(tableName, async () => {
    const mockData = []

    for (let i = 0; i < iterations; i++) {
      mockData.push({
        name: faker.lorem.words(3),
        status: faker.helpers.arrayElement(['in-progress', 'completed']),
        description: faker.lorem.paragraph(),
        due_date: faker.date.future(),
        project_id: faker.helpers.arrayElement(projectIds),
        collaborators: faker.helpers.arrayElements([1, 2, 3]),
      })
    }

    return supabase.from('tasks').insert(mockData).select('id')
  })
}

// seed database
const seedDb = async () => {
  const projectIds = await seedProjects(10).then((data) => data.map((item) => item.id))
  await seedTasks(10, projectIds)
}

seedDb()
