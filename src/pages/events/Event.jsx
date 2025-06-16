import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPencil, faTrashCan, faCircleCheck, faEye } from "@fortawesome/free-solid-svg-icons";
import useEvents from "../../hooks/useEvent";

const Event = () => {
  const events = useEvents();

  return (
    <div className="text-black flex flex-col overflow-auto h-full">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold mb-4">Events</h1>
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <Link to="/">SENADA</Link>
            </li>
            <li>Event</li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col rounded-box bg-gray-800 p-6 gap-2 h-full">
        <div className="flex justify-end">
          <Link to="/events/new" className="btn btn-primary">
            <FontAwesomeIcon icon={faPlus} /> Add Event
          </Link>
        </div>

        <table className="table text-white">
          <thead>
            <tr className="text-gray-400 text-left border-b border-gray-600">
              <th>
                <input type="checkbox" className="checkbox" />
              </th>
              <th>ID</th>
              <th>Title</th>
              <th>Active</th>
              <th>CreatedAt</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="border-b border-gray-600 hover:bg-gray-700/25 cursor-pointer">
                <td>
                  <input type="checkbox" className="checkbox" />
                </td>
                <td>{event.id}</td>
                <td>{event.title}</td>
                <td className="text-xl">
                  <FontAwesomeIcon icon={faCircleCheck} className="text-green-400" />
                  {/* <FontAwesomeIcon icon={faCircleXmark} className='text-red-400'/> */}
                </td>
                <td>{event.createdAt.toDate().toLocaleDateString()}</td>
                <td className="flex gap-2">
                  <button className="text-lg hover:bg-gray-700 px-2 py-1 rounded-box cursor-pointer">
                    <FontAwesomeIcon icon={faPencil} />
                  </button>
                  <button className="text-lg hover:bg-red-500 px-2 py-1 rounded-box cursor-pointer text-red-500 hover:text-white">
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                  <Link to={`/events/${event.id}`} className="text-lg hover:bg-gray-700 px-2 py-1 rounded-box cursor-pointer">
                    <FontAwesomeIcon icon={faEye} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {events.length === 0 && <p className="text-white mt-4 text-center">Tidak ada event</p>}
      </div>
    </div>
  );
};

export default Event;
