import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import {auth} from '../firebase'
export default function useSignup() {
    let [error,setError] = useState('')
    let [loading,setLoading] = useState(false)
    let signUp = async(email,password) => {
        try{
            setLoading(true)
            let res = await createUserWithEmailAndPassword(auth,email,password)
            setError('')
            setLoading(false)
            return res.user
        }catch(e){
            setLoading(false)
            setError(e.message)
        }
    }
  return {error,loading,signUp}
}
