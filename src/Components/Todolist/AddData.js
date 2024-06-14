import { columnsFromBackend, data } from "./KanbanData";
import React, { useId, useState } from "react";
import { v4 as uuidv4 } from "uuid"; // Import uuid
const AddData = ({
  setColumns,
  values,
  setValues,
  openModal,
  setOpenModal,
  editItem,
  setEditItem,
}) => {
  const [errors, setErrors] = useState({});

  const formValidation = () => {
    let isFormValid = true;
    let newErrors = {};

    if (!values?.Task || values?.Task.trim() === "") {
      isFormValid = false;
      newErrors["Task"] = "Please enter a task name";
    }
    if (!values?.status || values?.status.trim() === "") {
      isFormValid = false;
      newErrors["status"] = "Please select a task status";
    }

    setErrors(newErrors);
    return isFormValid;
  };
  const handleOnChange = (e, taskId) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };
  const handleOnSubmitTask = () => {
    if (editItem) {
      if (formValidation()) {

      data.map((item) => {
        if (item.id === editItem) {
          item.Task = values.Task;
          item.status = values.status;
        }
      });

      setColumns(columnsFromBackend(data));
      setOpenModal(false);}
    } else {
      if (formValidation()) {
        const Taskvalue = {
          id: data.length + 1,
          ...values,
          Due_Date: "05-Jan-2021",
        };
        data.push(Taskvalue);
        setColumns(columnsFromBackend(data));
        setValues({ Task: "", status: "" });
        setOpenModal(false);
      }
    }
  };

  return (
    <div>
      {/* Add Modal Start */}
      <button
        onClick={() => {
          setOpenModal(true);
          setEditItem(null);
          setValues({});
        }}
        class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        type="button"
      >
        Add Task
      </button>
      {openModal && (
        <div class=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0">
          <div class="relative  w-full h-full">
            <div class="relative bg-white rounded-lg ">
              <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                  Task
                </h3>
                <button
                  type="button"
                  class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:text-white"
                  data-modal-hide="static-modal"
                  onClick={() => {
                    setOpenModal(false);
                  }}
                >
                  <svg
                    class="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
              <div class="p-4 md:p-5 space-y-4">
                <div>
                  <label
                    for="first_name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Task name
                  </label>
                  <input
                    type="text"
                    id="Task"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter task name"
                    required
                    name="Task"
                    value={values.Task}
                    onChange={(e) => {
                      handleOnChange(e);
                    }}
                  />
                </div>
                {errors.Task && (
                  <span className="text-danger">{errors.Task}</span>
                )}
                <form class="max-w-sm block">
                  <label
                    for="countries"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select Status
                  </label>
                  <select
                    id="countries"
                    name="status"
                    value={values.status}
                    onChange={handleOnChange}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option selected>Choose a task status</option>
                    <option value="todo">To Do</option>
                    <option value="inprogres">In Progress</option>
                    <option value="done">Done</option>
                    <option value="qatest">QA Test</option>
                  </select>
                  {errors.status && (
                    <span className="text-danger">{errors.status}</span>
                  )}
                </form>
              </div>
              <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  type="button"
                  onClick={handleOnSubmitTask}
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
                <button
                  onClick={() => {
                    setOpenModal(false);
                  }}
                  type="button"
                  class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal End */}
    </div>
  );
};

export default AddData;
