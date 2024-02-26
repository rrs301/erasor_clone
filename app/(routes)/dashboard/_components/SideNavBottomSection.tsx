import { Button } from '@/components/ui/button'
import { Archive, Flag, Github } from 'lucide-react'
import React, { useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import Constant from '@/app/_constant/Constant'
import PricingDialog from './PricingDialog'
function SideNavBottomSection({onFileCreate,totalFiles}:any) {
  const menuList=[
    {
      id:1,
      name:'Getting Started',
      icon:Flag,
      path:''
    },
    {
      id:2,
      name:'Github',
      icon:Github,
      path:''
    },
    {
      id:3,
      name:'Archive',
      icon:Archive,
      path:''
    }
  ]
  const [fileInput,setFileInput]=useState('');
  return (
    <div>
      {menuList.map((menu,index)=>(
        <h2 key={index} className='flex gap-2 p-1 px-2 text-[14px] 
        hover:bg-gray-100 rounded-md cursor-pointer'>
          <menu.icon className='h-5 w-5'/>
          {menu.name}</h2>
      ))}

      {/* Add New File Button  */}
      <Dialog>
  <DialogTrigger className='w-full' asChild>
  <Button className='w-full bg-blue-600 
      hover:bg-blue-700 justify-start mt-3'>New File</Button>
  </DialogTrigger>
  {totalFiles<Constant.MAX_FREE_FILE? 
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create New File</DialogTitle>
      <DialogDescription>
          <Input placeholder='Enter File Name' 
          className='mt-3'
          onChange={(e)=>setFileInput(e.target.value)}
          />
      </DialogDescription>
    </DialogHeader>
    <DialogFooter className="">
          <DialogClose asChild>
            <Button type="button" 
            className='bg-blue-600
            hover:bg-blue-700'
            disabled={!(fileInput&&fileInput.length>3)}
            onClick={()=>onFileCreate(fileInput)}
            >
              Create
            </Button>
          </DialogClose>
        </DialogFooter>
  </DialogContent>:
  <PricingDialog/>}
</Dialog>

     
      
      {/* Progress Bar  */}
      <div className='h-4 w-full bg-gray-200 rounded-full mt-5'>
          <div className={`h-4  bg-blue-600 rounded-full`}
          style={{ width: `${(totalFiles/5)*100}%` }}
         >
          </div>
      </div>

      <h2 className='text-[12px] mt-3'>
        <strong>{totalFiles}</strong> out of <strong>{Constant.MAX_FREE_FILE}</strong> files used</h2>
      <h2 className='text-[12px] mt-1'>Upgrade your plan for unlimited access.</h2>  

     </div>
  )
}

export default SideNavBottomSection