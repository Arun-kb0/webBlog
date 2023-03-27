import React, { useState, useEffect } from 'react'

import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { registerInitiate } from '../features/redux/firebase/auth/authAction'
import space from '../assets/space.png'
import signupImage from '../assets/signupImage.webp'
function SignUp() {

  const { register, handleSubmit, formState: { errors } } = useForm()

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { currentUser, isAuth } = useSelector((store) => {
    return store.user
  })



  const onsubmit = (data) => {
    console.log("onSubmit")
    console.log(data)

    dispatch(registerInitiate(
      data.Email,
      data.Password,
      data.fname + " " + data.lname
    ))

  }

  useEffect(() => {
    if (isAuth) {
      navigate('/')
    }
  }, [isAuth])



  return (
    <section className='signup-container '>
      <div className='signup-container-inner'>
        <div className='signup-left-div   '>
          <img className='signup-image'
            src={signupImage} alt='image' />
          <h2 className='signup-title'>welcome </h2>
        </div>


        <div className='signUp'>
          <form id="" className='emailSignup'>

            <div className='sm:flex'>
              <input placeholder='First name' id="firstName" type="text"
                className={errors.fname ? 'signUpInput mr-2 border-red-500 text-red-300' : 'signUpInput mr-2'}
                {...register("fname", {
                  required: true,
                  maxLength: 10,
                  pattern: /[a-zA-Z]$/
                })}
              />
              <input placeholder='Last name' id='lastName' type="text"
                className={errors.lname ? 'signUpInput border-red-500 text-red-300' : 'signUpInput'}
                {...register('lname', {
                  required: true,
                  maxLength: 8,
                  pattern: /[a-zA-Z]$/
                })}

              />

            </div>
            {
              errors.lname && errors.fname &&
              <p className='form-error'> Enter a valid name </p>
            }


            <div className='mb-5'>
              <input className={errors.Email ? 'loginInput border-red-500 text-red-300' : 'loginInput'}
                placeholder='Email' id='email' type='text'
                {...register('Email', {
                  required: true,
                  pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                })}
              />
              {errors.Email && <p className='form-error mt-0'>Enter a valid Email</p>}
            </div>

            <div className='mb-3'>

              <input className={errors.Password ? 'loginInput border-red-500' : 'loginInput'}
                placeholder='Password' id='pswd' type='password'
                {...register('Password', {
                  required: true,
                  minLength: 6,
                  // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
                })}
              />
              {errors.Password && <p className='form-error mt-0'>Enter a valid Password</p>}
            </div>

            <button className='dark:btn light-btn' onClick={handleSubmit(onsubmit)}
            > Submit</button>
          </form>

        </div>
      </div>
    </section>
  )
}

export default SignUp