import axios from "axios";
import cogoToast from "cogo-toast";
import { useState } from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import Form from "../components/form";
import User from "../types/User";

const Add = () => {
  const [data, setData] = useState<User[]>([]);
  const router = useRouter();

  const { mutate } = useMutation(
    (data: User[]) => axios.post("/api/createUser", data),
    {
      onSuccess: (res) => {
        cogoToast.success("Users Added Successfully");
        router.push("/");
      },
    }
  );

  const addToArray = (newUser) => {
    setData([...data, newUser]);
    cogoToast.success("User added");
  };

  const removeFromArray = (i: number) => {
    let temp = [...data];
    cogoToast.info(i);
    temp.splice(i, 1);
    setData(temp);
  };

  const handleSubmit = () => {
    if (data.length > 0) mutate(data);
  };

  return (
    <div className="container w-10/12 mx-auto mt-20">
      <div className="flex justify-center">
        <div className="w-50">
          {data.map((user, index) => (
            <div key={index} className="flex mb-7">
              <Form initialValues={user} disabled={true} />

              {index === data.length - 1 && (
                <button
                  onClick={() => removeFromArray(index)}
                  className="px-2 py-1 ml-10 text-white bg-red-500"
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <Form addToArray={addToArray}>
            <button
              className="px-2 py-1 text-white bg-green-500 rounded shadow"
              type="submit"
            >
              Add
            </button>
          </Form>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="p-2 text-lg text-white rounded shadow bg-violet-700 my-9"
        >
          Submit{" "}
        </button>
      </div>
    </div>
  );
};

export default Add;
