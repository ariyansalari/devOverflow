import Filter from '@/components/shared/Filter/Filter'
import NoResult from '@/components/shared/NoResult/NoResult'
import Pagination from '@/components/shared/Pagination/Pagination'
import LocalSearchBar from '@/components/shared/search/LocalSearchBar/LocalSearchBar'
import { TagFilters } from '@/constants/filters'
import { getAllTags } from '@/lib/actions/tag.action'
import { SearchParamsProps } from '@/types'
import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

export const metadata:Metadata ={
   title:"Tags | Dev Overflow",
 
 }
const page =async ({searchParams}:SearchParamsProps) => {
  const result=await getAllTags({
     searchQuery:searchParams.q,
     filter:searchParams.filter,
     page:searchParams.page?+searchParams.page:1,

  })
  
  return (
    <>
    <h1 className='h1-bold text-dark100_light900'>All Tags</h1>
    
   <div className='mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center'>
  <LocalSearchBar route='/tags' iconPosition='left' imgSrc='/assets/icons/search.svg' otherClasses="flex-1" placeholder={'Search for tags'}/>
      <Filter filters={TagFilters} otherClasses={'min-h-[56px] sm:min-w-[170px] '} />
   </div>
   <section className='mt-12 flex flex-wrap gap-4 '>
{result.tags.length>0?(result.tags.map((tag)=>(
<Link href={`/tags/${tag._id}`} key={tag._id} className='shadow-light100-darknone '>
  <article className=' background-light900_dark200 light-border flex w-full flex-col rounded-2xl border px-8 py-10 sm:w-[260px]'>
<div className='background-light800_dark400 rounded-sm px-5 py-1.5 w-fit'><p className='paragraph-semibold text-dark300_ligth900'>{tag.name}</p></div>
<p className='small-medium text-dark-400_ligth500 mt-3.5'><span className='body-semibold primary-text-gradient mr-2.5'>{tag.questions?.length}+</span> Questions</p>
  </article>
   </Link>
))):(
<NoResult title='No Tags Found' desc='It looks like there are no tags found.' link='/ask-question' linkTitle='Ask a question'/>)}
   </section>
   <div className='mt-10'>

<Pagination pageNumber={searchParams?.page?+searchParams.page:1} isNext={result.isNext} />
</div>
   </>

  )
}

export default page