import React from 'react'
import { auth, provider } from '../firebase-config'
import { signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

// redux
import {useDispatch} from 'react-redux'
import { setLoginUser } from '../features/login/loginSlice'

import { useNavigate } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('')
    const [pswd, setPswd] = useState('')

    const { register, handleSubmit, formState: { errors } } = useForm()

    const dispatch = useDispatch()
    const navigate = useNavigate()
  
    //sign in with google -- not working 
    const SignInwithGoogle = () => {
        signInWithPopup(auth, provider)
            .then(res => {
                console.log(res)
                const isAuth=true
                localStorage.setItem("isAuth", true)
                navigate('/')
            }).catch(err => {
                console.log(err.message)
            })
    }


    // sigin in with email
    const onsubmit = (data) => {
        createUserWithEmailAndPassword(auth, email, pswd)
            .then(res => {
                console.log(res)
                const isAuth=true
                localStorage.setItem("isAuth", true)
                dispatch(setLoginUser(isAuth))
                
                navigate('/')
            }).catch(err => {
                console.log(err)
            })
    }

    return (
        <div className='block justify-center items-center bg-gray-300 rounded-lg  mt-20 w-38 p-12 '>
            <form id="emailSignup" className='block mt-8'>

                <input className={errors.Email ? 'loginInput border-red-500 text-red-300' : 'loginInput'}
                    placeholder='Email' id='email' type='text'
                    {...register('Email', {
                        required: true,
                        pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    })}
                    onChange={(e) => setEmail(e.target.value)}
                /><br />
                {errors.Email && <p className='ml-5 text-red-500'>Enter a valid Email</p>}
                <input className={errors.Password ? 'loginInput border-red-500' : 'loginInput'}
                    placeholder='Password' id='pswd' type='password'
                    {...register('Password', {
                        required: true,
                        minLength: 6,
                        // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
                    })}
                    onChange={(e) => setPswd(e.target.value)}
                /><br />
                {errors.Password && <p className='ml-5  text-red-500'>Enter a valid Password</p>}

                <button className='btn ml-20' onClick={handleSubmit(onsubmit)}
                > Submit</button>
            </form>

            <div className='block justify-between mt-5' id="googleSignup">
                <p className='ml-28 mb-5'>Or</p>
                <p className='mb-2 '>Sign In With Google to Continue</p>
                <button className='btn ml-12'
                    onClick={SignInwithGoogle}
                >Sign In With Google</button>
            </div>
        </div>
    )
}

export default Login