import { useEffect, useState } from 'react'
import { getUserAddressList } from '../services/api-service'

export default function useProfile(user, token) {
  const [profile, setProfile] = useState()

  useEffect(() => {
    getUserAddressList(token, user.username)
      .then(setProfile)
      .catch()
      .finally(console.log)
  }, [user, token])

  const loadProfile = () => {
    getUserAddressList(token, user.username)
      .then(setProfile)
      .catch()
      .finally(console.log)
  }

  return { profile, loadProfile }
}
