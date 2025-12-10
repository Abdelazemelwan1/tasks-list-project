import UpdatedTaskForm from "@/app/_components/UpdatedTaskForm";
import { updateTask } from "@/utils/actions";
import prisma from "@/utils/db"
import Link from "next/link";
import { notFound } from "next/navigation"
import { FaArrowLeft } from "react-icons/fa";


interface EditTaskPaeProps {
    params: {id: string}
}
export default async function EditTaskPage({params} : EditTaskPaeProps) {
    const resolvedParams = await params;
    const task = await prisma.task.findUnique({
        where: {id: parseInt(resolvedParams.id)}
    })
    if(!task) notFound()

  return (
    <section>
        <Link href={`/task/${task.id}`} className="underline  mb-10 flex items-center gap-3">
            <span className='bg-cyan-300 p-1.5 rounded-full text-white'><FaArrowLeft /></span> Back to tasks details
        </Link>
        <div className="w-full lg:w-2/3 mx-auto rounded-md p-5 bg-slate-800 border-2 border-gray-300">
            <h1 className="mb-7 font-bold text-3xl">Edit Task</h1>
            <UpdatedTaskForm task={task}/>
            {/* <form action={updateTask} className="flex flex-col gap-6">
                <input type="hidden" value={task.id} name="id"/>
                <input type="text" placeholder="Task Title" name="title" className="p-2 text-xl rounded-md text-gray-950" defaultValue={task.title} />
                <select name="status" defaultValue={task.status} className="p-2 text-xl rounded-md text-gray-950" >
                    <option value="TODO">TODO</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="COMPLETED">COMPLETED</option>
                </select>
                <textarea name="description" rows={5} placeholder="Task Description" defaultValue={task.description} className="p-2 text-xl rounded-md text-gray-950 resize-none"></textarea>
                <button type="submit" className="bg-cyan-300 hover:bg-cyan-400 text-black font-semibold text-xl rounded-md p-3 transition-colors">Edit Task</button>
            </form> */}
        </div>
    </section>
  )
}
