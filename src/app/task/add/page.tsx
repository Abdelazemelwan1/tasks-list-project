import Link from 'next/link'

import { FaArrowLeft } from 'react-icons/fa';
import AddTaskForm from '@/app/_components/AddTaskForm';

export default function AddTaskPage() {
  return (
    <section>
        <Link href="/" className='underline  mb-10 flex items-center gap-3'>
            <span className='bg-cyan-300 p-1.5 rounded-full text-white'><FaArrowLeft /></span> Back to tasks table
        </Link>
        <div className='w-full md:w-2/3 mx-auto rounded-md p-5 bg-slate-800 border-2 border-gray-300'>
            <h1 className='mb-7 font-bold text-3xl'>Add Your Taske</h1>
            <AddTaskForm />
        </div>
    </section>
  )
}
