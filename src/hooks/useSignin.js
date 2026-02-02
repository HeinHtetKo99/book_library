import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import {auth} from '../firebase'
export default function useSignin() {
    let [error,setError] = useState('')
    let [loading,setLoading] = useState(false)
    let signIn = async(email,password) => {
        try{
            setLoading(true)
            let res = await signInWithEmailAndPassword(auth,email,password)
            setError('')
            setLoading(false)
            return res.user
        }catch(e){
            setError(e.message)
            setLoading(false)
        }
    }
  return {error,loading,signIn}
}
