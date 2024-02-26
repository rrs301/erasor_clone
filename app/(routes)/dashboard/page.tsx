"use client"
import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useConvex, useMutation, useQuery } from 'convex/react'
import React, { useEffect } from 'react'
import Header from './_components/Header'
import FileList from './_components/FileList'

function Dashboard() {

  const convex=useConvex();
  const {user}:any=useKindeBrowserClient();
  //const getUser=useQuery(api.user.getUser,{email:user?.email});

  const createUser=useMutation(api.user.createUser);
  useEffect(()=>{
      if(user)
      {
        checkUser()
      }
  },[user])
  

  const checkUser=async()=>{
    const result=await convex.query(api.user.getUser,{email:user?.email});
    if(!result?.length)
    {
        createUser({
          name:user.given_name,
          email:user.email,
          image:user.picture
        }).then((resp)=>{
          console.log(resp)
        })
    }

  }
  return (
    <div className='p-8'>
      <Header/>

      <FileList/>
    </div>

  )
}

export default Dashboard