import Metric from '@/components/shared/Metric/Metric';
import RenderTag from '@/components/shared/RenderTag/RenderTag';
import { formatNumbers, getTimestamp } from '@/lib/utils';
import Link from 'next/link';
import React from 'react'

interface QuestionProps {
_id:string;
title:string;
tags:{
    _id:string;
    name:string;
}[];
author :{
    _id :string;
    name:string;
    picture:string;

};
upvotes:number;
createdAt:Date;
views:number;
answers:Array<object>
}
const QuestionCard = ({_id,title,tags,author,upvotes,createdAt,answers,views}:QuestionProps) => {
    console.log(views);
    
  return (
    <div className='card-wrapper rounded-[10px] p-9 sm:px-11'>

        <div className='flex flex-col-reverse items-start justify-between gap-5 sm:flex-row '>
            <div><span className='subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden '>{getTimestamp(createdAt)}</span>
            

            <Link href={`/question/${_id}`}>
<h3 className='sm:h3-bold base-semibold  text-dark400_light700  line-clamp-1  flex-1 '>
{title}
    </h3>
    </Link>
            </div>



        </div>
        <div className='mt-3.5 flex flex-wrap gap-2'>{tags?.map((tag)=>(
            <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}</div>

        <div className='flex-between mt-6 w-full flex-wrap gap-3 '>
        <Metric 
            imgUrl={author?.picture}
            alt="Upvotes"
            value={author?.name}

            title={` - asked ${getTimestamp(createdAt)}`}
            href={`/profile/${author?._id}`}
            isAuthor
            textStyles="body-medium text-dark400_light700"
            />
            <Metric 
            imgUrl="/assets/icons/like.svg"
            alt="Upvotes"
            value={formatNumbers(upvotes?.length)}
            title="Votes"
            textStyles="small-medium text-dark400_light800"
            />
                  <Metric 
            imgUrl="/assets/icons/message.svg"
            alt="message"
            value={answers?.length}
            title="Answers"
            textStyles="small-medium text-dark400_light800"
            />
                  <Metric 
            imgUrl="/assets/icons/eye.svg"
            alt="eye"
            value={formatNumbers(views??0)}
            title="Views"
            textStyles="small-medium text-dark400_light800"
            />
        </div>
    </div>
  )
}

export default QuestionCard