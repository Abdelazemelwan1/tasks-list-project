import Link from 'next/link';
import prisma from '@/utils/db';
import StatusBadge from './_components/StatusBadge';

export const dynamic = "force-dynamic";


export default async function HomePage() {
  const tasks = await prisma.task.findMany();
  return (
    <section>
      <div className='flex justify-between items-start'>
        <h1 className='text-2xl xl:text-4xl font-semibold'>Tasks List App</h1>
        <div className='flex items-center justify-end mb-20'>
          <Link href="/task/add" className='bg-cyan-300 hover:bg-cyan-400 transition-colors text-black py-1 px-2 text-xl font-semibold rounded-md'>Add Task</Link>
        </div>
      </div>
      <table className='table w-full text-left mt-5'>
        <thead className='border-t-2 border-b-2 border-gray-300 text-xl'>
          <tr>
            <th className='p-3'>#</th>
            <th className=''>Task Title</th>
            <th className=''>Task Status</th>
            <th className=''>Task Details</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task , index) => (
            <tr key={task.id} className='border-b border-gray-500'>
              <td className='p-3'>{index + 1}</td>
              <td>{task.title}</td>
              <td><StatusBadge status={task.status} /></td>
              <td>
                <Link href={`/task/${task.id}`} className='bg-blue-600 hover:bg-blue-800 transition-colors text-white rounded-md p-2'>Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
