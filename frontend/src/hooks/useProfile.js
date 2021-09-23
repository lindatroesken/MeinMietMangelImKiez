import { useEffect, useState } from 'react'
import { getUserAddress } from '../services/api-service'

export default function useProfile(user, token) {
  const [profile, setProfile] = useState()

  useEffect(() => {
    getUserAddress(token, user.username)
      .then(setProfile)
      .catch()
      .finally(console.log)
  }, [user, token])

  const loadProfile = () => {
    getUserAddress(token, user.username)
      .then(setProfile)
      .catch()
      .finally(console.log)
  }

  return { profile, loadProfile }
}
