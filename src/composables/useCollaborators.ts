import { collaboratorsQuery } from '@/utils/dbQueries'

export const useCollaborators = () => {
  const getProfiles = async (userIds: string[]) => {
    const { data, error } = await collaboratorsQuery(userIds)

    return error ? [] : data
  }

  return {
    getProfiles,
  }
}
