import {useMutation, useQueryClient, useQuery} from '@tanstack/react-query'
import { gridObject } from '../types/CommonTypes'
import {client} from '../utils/axios-utils'  


const tasksKey = ()=> ["tasks"]


export const useGetTasks = ()=>{
        return useQuery({queryKey: tasksKey(), queryFn: ()=> client.get('/')                
    })
}

export const useSubmitTasks = ()=>{
    const queryClient = useQueryClient()  
    return useMutation({
        mutationFn: (data: gridObject)=> client.put(`/${data.id}`,data), 
        onSuccess: (data) => {
            queryClient.invalidateQueries(tasksKey())
          }
    })
}



 export const useDeleteTasks = ()=>{
    const queryClient = useQueryClient()
    
    return useMutation(
        (id?: number|null)=> client.delete(`http://localhost:4000/tasks/${id}`), {
            onSuccess: () => {
              queryClient.invalidateQueries(tasksKey())
            },})
    
}


export const useAddTasks = ()=>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data:gridObject)=> client.post("http://localhost:4000/tasks/", data),
        onSuccess: (data) => {
            queryClient.invalidateQueries(tasksKey())
          }
    })
}


