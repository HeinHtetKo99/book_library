import { signOut } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from '../firebase'

export default function useSignout() {
    let [error,setError] = useState('')
    let [loading,setLoading] = useState(false)
    let logOut = async() => {
        try{
            setLoading(true)
            let res = await signOut(auth)
            setError('')
            setLoading(false)
            return res.user
        }catch(e){
            setLoading(false)
            setError(e.message)
        }
    }
  return {error,loading,logOut}
}
