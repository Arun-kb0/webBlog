import React from 'react'
import { auth, provider } from '../firebase-config'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import spaceImg from '../assets/space.png'
// redux
import { useDispatch } from 'react-redux'
import { setLoginUser } from '../features/login/loginSlice'

import { useNavigate } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('')
    const [pswd, setPswd] = useState('')

    const { register, handleSubmit, formState: { errors } } = useForm()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // sigin in with email
    const onsubmit = (data) => {
        signInWithEmailAndPassword(auth, email, pswd)
            .then((res) => {
                console.log(res)
                const username = res.user.displayName
                const isAuth = true
                localStorage.setItem("isAuth", true)
                dispatch(setLoginUser({isAuth,username}))
                navigate('/')
            }).catch(err => {
                console.log(err)
            })

    }

    return (
        <div className='grid place-content-center'>
            <section className='login'
                style={{ background: `url(${spaceImg})` }}>

                <form id="emailSignup" className='grid w-64 '>

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
                    <button className='btn' onClick={handleSubmit(onsubmit)}
                    > Submit</button>


                    <div className='grid place-content-center mt-5' id="googleSignup">
                        <p className='mb-5 text-center text-zinc-200'>Or</p>
                        <p className='mb-2 text-center text-zinc-200'>Create an Account</p>
                        <button className='btn'
                            onClick={() => {
                                navigate("/signUp")
                            }}
                        >Sign Up</button>
                    </div>
                </form>

            </section>
        </div>
    )
}

export default Login