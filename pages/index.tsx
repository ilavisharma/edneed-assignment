import axios from "axios";
import { useQuery } from "react-query";
import { ClapSpinner } from "react-spinners-kit";
import Link from "next/link";

const Index = () => {
  const { data, isLoading } = useQuery(
    ["users"],
    () => axios.get("/api/getUsers"),
    {
      select: (res) => res.data,
    }
  );

  if (isLoading) {
    return (
      <div className="flex items-end justify-center w-10/12 mt-20">
        <ClapSpinner />
      </div>
    );
  }

  return (
    <div className="m-10 ">
      <div>
        <Link href="/add">
          <a className="p-2 mb-16 text-white bg-gray-500">Add User</a>
        </Link>
      </div>
      <table className="table w-full p-2 text-center shadow-lg">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="p-2 bg-blue-100 border-r">Name</th>
            <th className="p-2 bg-blue-100 border-r">Email</th>
            <th className="p-2 bg-blue-100 border-r">Username</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user._id}>
              <td className="px-2 py-4">{user.name}</td>
              <td className="px-2 py-4">{user.email}</td>
              <td className="px-2 py-4">{user.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Index;
