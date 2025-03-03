'use client'
import { SidebarLinks } from '@/Constants'
import { cn } from '@/lib/utils'
import { link } from 'fs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
    const pathname =usePathname ();
  return (
    <section className='sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]'>
        <div className='flex flex-1 flex-col gap-6'>
            {SidebarLinks.map((link) =>{
                const IsActive =  pathname === link.route || pathname.startsWith(`${link.route}/`);   //checking if pathename is active and if the route is same
                 return(
                    <Link href={link.route} key={link.route} className={cn('flex gap-4 items-center p-4 rounded-lg justify-start',
                        {"bg-blue-1":IsActive}
                    )}>
                        <Image 
                        src={link.imgUrl}
                        alt={link.label}
                        width={24}
                        height={24}/>
                        <p className='text-lg font-semibold max-lg:hidden'>
                            {link.label}
                        </p>
                    </Link>
                 )
            })}
        </div>
    </section>
  )
}

export default Sidebar