"use server"
import prisma from '@/utils/db';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { CreateTaskDto } from './dtos';
import { Status } from '@/generated/prisma/enums';
import { UpdatedTaskFormProps } from '@/app/_components/UpdatedTaskForm';

// create Task
export async function createTask({title , description} : CreateTaskDto) {

    if (typeof title !== 'string' || title.length < 2 ) return;
    if (typeof description !== 'string' || description.length < 4 ) return;
    
    try {
        await prisma.task.create({data: {title, description}})
    } catch (error) {
        throw new Error("could not create the task, please try again")
    }
    
    // revalidatePath("/")
    redirect("/" )
    
    
}

// Delete Task
export async function deleteTask(formData:FormData) {
    const id = formData.get('id')?.toString();
    if(!id) return


    try {
        await prisma.task.delete({where: {id : parseInt(id)}})
    } catch (error) {
        throw new Error("could not delete the task, please try again")
    }
    // revalidatePath("/")
    redirect("/")
}

// Update Task
export async function updateTask({task}:UpdatedTaskFormProps) {
    // const title = formData.get('title')?.toString();
    // const description = formData.get('description')?.toString();
    // const status = formData.get('status') as Status;
    // const id = formData.get('id')?.toString();

    if(typeof task.title !== 'string' || task.title.length < 2) return;
    if(typeof task.description !== 'string' || task.description.length < 4) return;
    if(!task.status) return;
    if(typeof task.id !== 'number' ) return;

    try {
        await prisma.task.update({
            where: {id : task.id},
            data: {
                title : task.title,
                description : task.description,
                status : task.status
            }
        });
    } catch (error) {
        throw new Error("could not update the task, please try again")
    }
    // revalidatePath("/")
    revalidatePath(`/task/${task.id}`)
    redirect(`/task/${task.id}`)

}