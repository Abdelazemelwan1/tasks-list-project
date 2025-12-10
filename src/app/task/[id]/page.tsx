import StatusBadge from "@/app/_components/StatusBadge";
import { deleteTask } from "@/utils/actions";
import prisma from "@/utils/db"
import Link from "next/link";
import { notFound } from "next/navigation"
import { FaArrowLeft } from "react-icons/fa";


interface TaskDetailsPageProps{
    params : {id : string}
}
export default async function TaskDetailsPage({params} : TaskDetailsPageProps) {
    const resolvedParams = await params;

   const task = await prisma.task.findUnique({
        where: {id : parseInt(resolvedParams.id)}
    })
    
    if (!task) notFound();

  return (
    <section>
        <div className="flex items-center justify-between">
            <div className="flex justify-between items-start  w-full">
                <Link href="/" className="underline  mb-10 flex items-center gap-3">
                    <span className='bg-cyan-300 p-1.5 rounded-full text-white'><FaArrowLeft /></span> Back to tasks table
                </Link>
                <div className="flex items-center">
                    <Link href={`/task/${task.id}/edit`} className="bg-green-700 hover:bg-green-600 transition-colors rounded-lg py-1 px-2 me-3 text-xl">Edit</Link>
                    <form action={deleteTask}>
                        <input type="hidden" name="id" value={task.id}/>
                        <button type="submit" className="bg-red-700 hover:bg-red-600 transition-colors rounded-lg py-1 px-2 text-xl">Delete</button>
                    </form>
                </div>
            </div>
        </div>
        <div className="mt-16 p-5 rounded-lg bg-gray-600">
            <div className="flex items-center justify-between">
                <h2 className="font-bold text-3xl">{task.title}</h2>
                <StatusBadge status={task.status}/>
            </div>
            <small className="text-yellow-400">
                {new Date(task.createdAt).toDateString()}
            </small>
            <p className="mt-5 text-xl">{task.description}</p>
        </div>
    </section>
  )
}
