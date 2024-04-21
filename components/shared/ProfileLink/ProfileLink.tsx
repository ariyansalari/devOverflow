import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
interface ProfileLinkProps {
    imgUrl:string;
href?:string;
title:string;
}
const ProfileLink = ({imgUrl,href,title}:ProfileLinkProps) => {
  return (
    <div className='flex-center gap-1 '>
        <Image  src={imgUrl} alt='icon' width={20} height={20} />
        {href?(<Link href={href} target='_blank' className='paragraph-medium text-blue-500'>{title}</Link>):(<p className='paragraph-medium text-dark-400_light700'>{title}</p>)}
    </div>
  )
}

export default ProfileLink