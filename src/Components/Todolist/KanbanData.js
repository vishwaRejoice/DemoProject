import { v4 as uuidv4 } from "uuid";
export const data = [
  {
    id: "1",
    Task: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent.",
    status: "todo",
    Due_Date: "25-May-2020",
  },
  {
    id: "2",
    Task: "Fix Styling",
    status: "todo",

    Due_Date: "26-May-2020",
  },
  {
    id: "3",
    Task: "Handle Door Specs",
    status: "inprogres",

    Due_Date: "27-May-2020",
  },
  {
    id: "4",
    Task: "morbi",
    status: "done",

    Due_Date: "23-Aug-2020",
  },
  {
    id: "5",
    Task: "proin",
    status: "qatest",

    Due_Date: "05-Jan-2021",
  },
];


export const columnsFromBackend = (data) => {
  return [
    {
      id: uuidv4(),
      title: "To-do",
      items: data?.filter((item) => item.status === "todo"),
    },
    {
      id: uuidv4(),
      title: "In-Progress",
      items: data?.filter((item) => item.status === "inprogres"),
    },
    {
      id: uuidv4(),
      title: "Done",
      items: data?.filter((item) => item.status === "done"),
    },
    {
      id: uuidv4(),
      title: "QA-Test",
      items: data?.filter((item) => item.status === "qatest"),
    }
  ];
};
