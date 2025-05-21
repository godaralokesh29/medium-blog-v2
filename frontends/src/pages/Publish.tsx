import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const Navigate = useNavigate();
  return (
    <div>
      <Appbar />
      <div className=" flex flex-row p-5 justify-center w-full ">
        <input
          type="text"
          id="default-input"
          placeholder="Title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className="w-full bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div className=" flex flex-row p-5 justify-center w-full ">
        <textarea
          id="default-input"
          placeholder="Content"
          onChange={(e) => {
            setContent(e.target.value);
          }}
          className="w-full h-96 bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="flex flex-row justify-center ">
        <button
          onClick={async () => {
            const response = await axios.post(
              `${BACKEND_URL}/api/v1/blog`,
              {
                title,
                content,
              },
              {
                headers: {
                  Authorization: localStorage.getItem("token"),
                },
              }
            );
            Navigate(`/blogs/${response.data.id}`);
          }}
          type="button"
          className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </div>
    </div>
  );
};
