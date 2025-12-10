"use client"
import { updateTask } from "@/utils/actions"
import { UpdatedTaskSchema } from "@/utils/validationSchemaUpdated";
import { FormEvent } from "react";
import { toast } from "react-toastify";

export interface UpdatedTaskFormProps {
    task: {
        id: number;
        title: string;
        description: string;
        status:  "TODO" | "IN_PROGRESS" | "COMPLETED";
    };
}
export default function UpdatedTaskForm({ task }: UpdatedTaskFormProps) {

    const clientAction = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const id = Number(formData.get("id"));
        const title = formData.get('title')?.toString();
        const description = formData.get('description')?.toString();
        const status = formData.get("status")?.toString() as | "TODO"| "IN_PROGRESS"| "COMPLETED";

        const validation = UpdatedTaskSchema.safeParse({id , title , description , status});
        if(!validation.success) {
            return toast.error(validation.error.issues[0].message)
        }
        await updateTask({ 
            task: { id , title: title!, description: description!,status}
        });
        e.currentTarget.reset(); 
    }

  return (
         <form onSubmit={clientAction} className="flex flex-col gap-6">
                <input type="hidden" value={task.id} name="id"/>
                <input type="text" placeholder="Task Title" name="title" className="p-2 text-xl rounded-md text-gray-950" defaultValue={task.title} />
                <select name="status" defaultValue={task.status} className="p-2 text-xl rounded-md text-gray-950" >
                    <option value="TODO">TODO</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="COMPLETED">COMPLETED</option>
                </select>
                <textarea name="description" rows={5} placeholder="Task Description" defaultValue={task.description} className="p-2 text-xl rounded-md text-gray-950 resize-none"></textarea>
                <button type="submit" className="bg-cyan-300 hover:bg-cyan-400 text-black font-semibold text-xl rounded-md p-3 transition-colors">Edit Task</button>
            </form>
  )
}
