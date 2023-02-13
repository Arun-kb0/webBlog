import React, { useState, useEffect } from 'react'

import { useForm } from 'react-hook-form'
import spaceImg from '../assets/space.png'
import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { registerInitiate } from '../features/redux/firebase/auth/authAction'

function SignUp() {

  const { register, handleSubmit, formState: { errors } } = useForm()

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { currentUser,isAuth } = useSelector((store) => {
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
    if (currentUser) {
      console.log("is Auth");
      console.log(isAuth)
      navigate('/')
    }
  }, [isAuth])



  return (
    <div className='grid place-content-center sm:mt-16'>
      <section className='signUp'
        style={{ background: `url(${spaceImg})` }}>
        <form id="emailSignup" className='grid sm:w-80 xs:64   '>

          <div className='sm:flex sm:mb-2'>

            <div className='grid'>
              <input placeholder='First name' id="firstName" type="text"
                className={errors.fname ? 'signUpInput mr-2  border-red-500 text-red-300' : 'signUpInput mr-2'}
                {...register("fname", {
                  required: true,
                  maxLength: 10,
                  pattern: /[a-zA-Z]$/
                })}
              />
              {errors.fname && <p className='ml-1 text-red-500'>Invalid first name</p>}
            </div>

            <div className='grid '>
              <input placeholder='Last name' id='lastName' type="text"
                className={errors.lname ? 'signUpInput  border-red-500 text-red-300' : 'signUpInput'}
                {...register('lname', {
                  required: true,
                  maxLength: 8,
                  pattern: /[a-zA-Z]$/
                })}

              />
              {errors.lname && <p className='ml-1 text-red-500'>Invalid last name</p>}
            </div>

          </div>

          <div className='mb-3'>

            <input className={errors.Email ? 'loginInput border-red-500 text-red-300' : 'loginInput'}
              placeholder='Email' id='email' type='text'
              {...register('Email', {
                required: true,
                pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              })}
            />
            {errors.Email && <p className='ml-5 text-red-500'>Enter a valid Email</p>}
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
            {errors.Password && <p className='ml-5  text-red-500'>Enter a valid Password</p>}
          </div>

          <button className='btn ' onClick={handleSubmit(onsubmit)}
          > Submit</button>
        </form>

      </section>
    </div>
  )
}

export default SignUp