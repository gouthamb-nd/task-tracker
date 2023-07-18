import { useQuery } from '@tanstack/react-query'
import axios from "axios"

const fetchTask = ()=>{
    axios.get("http://localhost:4000/tasks")
}

export const useGetTasks = ()=>{
    return useQuery({queryKey: [""], queryFn: fetchTask })
}