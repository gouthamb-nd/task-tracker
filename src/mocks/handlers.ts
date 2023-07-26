import { rest } from 'msw'


export const rows = [
    {
      id: 1,
      taskName: "Task 1",
      taskDescription: "Task Desc 1",
      taskStatus: "pending",
    },
    {
      id: 2,
      taskName: "Task 2",
      taskDescription: "Task Desc 2",
      taskStatus: "pending",
    },
    {
      id: 3,
      taskName: "Task 3",
      taskDescription: "Task Desc 3",
      taskStatus: "pending",
    }
    ]

export const handlers = [
    rest.get('http://localhost:4000/tasks', (req, res, ctx) => {
      return res(ctx.status(200),ctx.json(rows));
    })
,
//     rest.delete('http://localhost:4000/tasks/1', (req, res, ctx) => {
//       return res(ctx.json({message: "deleted successfully"}));
//     })
// ,
//     rest.post('http://localhost:4000/tasks/', (req, res, ctx) => {
//       return res(ctx.json({message: "posted successfully"}));
//     })
]