import React from "react";
import { useSelector } from "react-redux";
import Header from "../layout/Header";
const Users = () => {
  const { users, loading } = useSelector((state) => state.user);
  const dateFormat = (timeStamp) => {
    const date = new Date(timeStamp);
    const formatedDate = `${String(date.getDate()).padStart(2, "0")}/${String(
      date.getMonth() + 1
    ).padStart(2, "0")}/${date.getFullYear()}`;
    const formattedtime = `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
    const result = `${formatedDate} ${formattedtime}`;
    return result;
  };

  return (
    <>
      <main className="relative flex-1 p-6 pt-28">
       <Header/>
       <header className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
        <h2 className="text-xl font-medium md:text-2xl md:font-semibold">Registered Users</h2>
       </header>
       {/* table */}
       {users && users.filter((u)=>u.role === 'user').length > 0 ? (
        <div className="overflow-x-auto mt-6 bg-white rounded-md shadow-lg">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left py-3 px-6">ID</th>
                <th className="text-left py-3 px-6">Name</th>
                <th className="text-left py-3 px-6">Email</th>
                <th className="text-left py-3 px-6">Role</th>
                <th className="text-center py-3 px-6">No of Books Borrowed</th>
                <th className="text-center py-3 px-6">Created At</th>
              </tr>
            </thead>
            <tbody>
              {users && users.filter((u)=>u.role === 'user').length > 0 ? users.filter((u)=>u.role === 'user').map((user, index)=>(
                <tr key={user._id} className={`${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                  <td className="text-left py-3 px-6">{user._id}</td>
                  <td className="text-left py-3 px-6">{user.name}</td>
                  <td className="text-left py-3 px-6">{user.email}</td>
                  <td className="text-left py-3 px-6">{user.role}</td>
                  <td className="text-center py-3 px-6">{user.borrowedBook.length}</td>
                  <td className="text-center py-3 px-6">{dateFormat(user.createdAt)}</td>
                </tr>
              )) : <tr><td colSpan="6" className="text-center py-3 px-6">No users found</td></tr>}
            </tbody>

          </table>

        </div>
       ) :""}
      </main>
    </>
  );
};

export default Users;
