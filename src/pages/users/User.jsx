import { Link } from "react-router-dom";
import useUsers from "../../hooks/useUser";
import { faEye, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Users = () => {
  const users = useUsers();

  return (
    <div className="text-black flex flex-col overflow-auto h-full">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold mb-4">User</h1>
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <Link to="/">SENADA</Link>
            </li>
            <li>User</li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col rounded-box bg-gray-800 p-6 gap-2 h-full">
        <table className="table text-white">
          <thead>
            <tr className="text-gray-400 text-left border-b border-gray-600">
              <th>
                <input type="checkbox" className="checkbox" />
              </th>
              <th>User ID</th>
              <th>Nama</th>
              <th>Email</th>
              <th>No Handphone</th>
              <th>Role</th>
              {/* <th>Status</th> */}
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((users) => (
              <tr key={users.id} className="border-b border-gray-700 hover:bg-gray-700/25 cursor-pointer">
                <td>
                  <input type="checkbox" className="checkbox" />
                </td>
                <td>{users.id}</td>
                <td>{users.fullName}</td>
                <td>{users.email}</td>
                <td>{users.phoneNumber}</td>
                <td>{users.role.charAt(0).toUpperCase() + users.role.slice(1)}</td>
                <td className="flex gap-2">
                  <button className="text-lg hover:bg-gray-700 px-2 py-1 rounded-box cursor-pointer">
                    <FontAwesomeIcon icon={faPencil} />
                  </button>
                  {/* <button className='text-lg hover:bg-red-500 px-2 py-1 rounded-box cursor-pointer text-red-500 hover:text-white'>
                        <FontAwesomeIcon icon={faTrashCan}/>
                    </button> */}
                  <Link to={`/users/${users.id}`} className="text-lg hover:bg-gray-700 px-2 py-1 rounded-box cursor-pointer">
                    <FontAwesomeIcon icon={faEye} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
