import React, { useState } from 'react'
import { BiBell, BiCog, BiMovie, BiPlay, BiSearch } from 'react-icons/bi'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Navbar = () => {
  const [rev, setRev] = useState<boolean>(false)
  const [searchInput, setSearchInput] = useState('')
  const router = useRouter()

  const detectChange = (e: any) => {
    if (e.target.value !== '') {
      setRev(true)
      setSearchInput(e.target.value)
    } else {
      setRev(false)
    }
  }

  const subSearch = (e: any) => {
    e.preventDefault()
    if (searchInput !== '') {
      router.push(`/store/search/${searchInput}`)
    }
  }

  return (
    <div className="sm:px-11 z-[60] flex h-[60px] w-full items-center justify-between bg-stone-800 p-3 shadow-lg">
      <div className="flex ">
        <div className="flex items-center text-pink-600">
          <BiPlay className="three:text-[3em] text-3xl" />
          <p className="three:text-2xl font-extrabold">1Play</p>
        </div>
      </div>
      {/* <form onSubmit={subSearch}
         className="flex ml-4 xtab:w-full">
            <div className={`flex tr sm:ml-0 w-[120px]  three:w-[200px] tablet:w-[300px] ml- bg-stone-900 text-sm tablet:text-lg text-white
              ${rev && 'flex-row-reverse'}  rounded-xl items-center px-3 py-1`}>
                <label htmlFor="s1" className='cursor-pointer'>
                <BiSearch className='text-sm mt-1 tablet:text-xl' />
                </label>
                <input
                onChange={detectChange}
                className='sm:w-full text-[0.9em] w-full px-2 outline-none bg-transparent'
                 type="text" placeholder='Search ' />
            </div>
            <input type="submit" id='s1' className='hidden' />
        </form> */}
      <div className="flex items-center">
        <BiBell className="cursor-pointer rounded-full bg-stone-900 p-2  text-4xl text-gray-700" />
        <BiCog className="ml-2 cursor-pointer rounded-full bg-stone-900  p-2 text-4xl text-gray-700" />
      </div>
    </div>
  )
}

export default Navbar
