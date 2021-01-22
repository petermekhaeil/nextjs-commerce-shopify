import { useCallback } from 'react'

export function useLogin() {
  const useLogin = async (options = {}) => {
    return useCallback(async function login() {
      return Promise.resolve()
    }, [])
  }

  return useLogin
}

export default useLogin
