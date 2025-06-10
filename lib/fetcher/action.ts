'use server'

export const getAuthorizationHeader = async ({
  hasAccessToken = true,
}: {
  hasAccessToken?: boolean
}): Promise<HeadersInit> => {
  if (!hasAccessToken) return {}

  const session = {}

  if (!session) {
    return {}
  }

  // const accessToken = session.accessToken
  // if (!accessToken) {
  //   return {}
  // }

  return { Authorization: `Bearer ${''}` }
}
