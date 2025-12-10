"use client"
import { createTask } from "@/utils/actions"
import { CreateTaskDto } from "@/utils/dtos";
import { createTaskSchema } from "@/utils/validationSChema";
import { FormEvent } from "react";
import { toast } from "react-toastify";


export default function AddTaskForm() {

    const clientAction = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
        const title = formData.get("title")?.toString();
        const description = formData.get("description")?.toString();

        const validation = createTaskSchema.safeParse({title , description})
        if (!validation.success) {
            return toast.error(validation.error.issues[0].message)
        }

        await createTask({title , description} as CreateTaskDto)
        e.currentTarget.reset();
    }
  return (
     <form onSubmit={clientAction}
      className='flex flex-col gap-6'>
        <input type="text" name='title' className='p-2 text-xl rounded-md text-gray-950' placeholder='Task Title' />
        <textarea name="description" rows={5} placeholder='Task Description' className='p-2 text-xl rounded-md text-gray-950 resize-none'></textarea>
        <button type="submit" className='cursor-pointer bg-cyan-300 hover:bg-cyan-400 text-black font-semibold text-xl rounded-md p-3 transition-colors'>Add Task</button>
    </form>
  )
}
