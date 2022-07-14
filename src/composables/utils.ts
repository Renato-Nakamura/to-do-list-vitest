export const remove_ = (word: string) => word.replace(/_/g, " ");

export const add_ = (word: string) => word.replace(/ /g, "_");

export interface Task {
  title: string;
  done: boolean;
}

export interface List {
  created: number;
  listTitle: string;
  _id?:string;
  tasks: Task[];
}

let todoListsMock = [//collection
    { //document
        created: Date.now(),
        listTitle: "example",
        tasks:[//collection
            {//doc
                title: 'task',
                done: false
            },
            {//doc
                title: 'task example 2',
                done: true
            }
        ]
    }
]