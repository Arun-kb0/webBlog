import React from 'react'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import spaceImg from '../assets/space.png'
import wave from '../assets/wave1.png'

import { useDispatch, useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom'
import { userLogin } from '../features/redux/firebase/auth/authAction'

function Login() {
    const [email, setEmail] = useState('')
    const [pswd, setPswd] = useState('')

    const { register, handleSubmit, formState: { errors } } = useForm()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isAuth, currentUser } = useSelector((store) => {
        return store.user

    })

    // sigin in with email
    const onsubmit = (data) => {
        dispatch(userLogin(data))
    }

    useEffect(() => {
        if (isAuth) {
            console.log("currentUser")
            console.log(currentUser)
            navigate('/')
        }

    }, [isAuth])


    return (
        <div className='loginContainer'>
            <section className='login' >
                <div className='login-header'>
                    <img className='login-wave'
                        src={wave} alt='' />
                    <h2 className='login-title '>Login</h2>
                </div>

                <div className='login-inner-container'>

                    <form id='emailSignup' className='grid '>
                        <input className={errors.Email ? 'loginInput border-red-500 text-red-300' : 'loginInput'}
                            placeholder='Email' id='email' type='text'
                            {...register('Email', {
                                required: true,
                                pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                            })}
                            onChange={(e) => setEmail(e.target.value)}
                        /><br />
                        {errors.Email && <p className='form-error'>Enter a valid Email</p>}
                        <input className={errors.Password ? 'loginInput border-red-500' : 'loginInput'}
                            placeholder='Password' id='pswd' type='password'
                            {...register('Password', {
                                required: true,
                                minLength: 6,
                                // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
                            })}
                            onChange={(e) => setPswd(e.target.value)}
                        /><br />
                        {errors.Password && <p className='form-error'>Enter a valid Password</p>}
                        <button className='dark:btn light-btn' onClick={handleSubmit(onsubmit)}
                        > Submit</button>


                        <div className='grid place-content-center mt-4' id="googleSignup">
                            <p className='login-form-text'>Or</p>
                            <p className='login-form-text mb-2'>Create an Account</p>
                            <button className='dark:btn light-btn'
                                onClick={() => {
                                    navigate("/signUp")
                                }}
                            >Sign Up</button>
                        </div>
                    </form>
                </div>
            </section >
        </div >
    )
}

export default Login