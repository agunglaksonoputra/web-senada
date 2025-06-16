import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faCogs, faCalendarAlt, faCartShopping } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-gray-800 text-white p-4">
      <h1 className="text-2xl font-bold mb-8">Admin</h1>
      <nav className="flex flex-col gap-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded-md ${
              isActive ? 'bg-[#AE691D] text-white' : 'hover:bg-[#AE691D]'
            }`
          }
        >
          <FontAwesomeIcon icon={faTachometerAlt} />
          Dashboard
        </NavLink>
        

        <NavLink
          to="/events"
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded-md ${
              isActive ? 'bg-[#AE691D] text-white' : 'hover:bg-[#AE691D]'
            }`
          }
        >
          <FontAwesomeIcon icon={faCalendarAlt} />
          Events
        </NavLink>

        <NavLink
          to="/users"
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded-md ${
              isActive ? 'bg-[#AE691D] text-white' : 'hover:bg-[#AE691D]'
            }`
          }
        >
          <FontAwesomeIcon icon={faUsers} />
          Users
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded-md ${
              isActive ? 'bg-[#AE691D] text-white' : 'hover:bg-[#AE691D]'
            }`
          }
        >
          <FontAwesomeIcon icon={faCartShopping} />
          Orders
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded-md ${
              isActive ? 'bg-[#AE691D] text-white' : 'hover:bg-[#AE691D]'
            }`
          }
        >
          <FontAwesomeIcon icon={faCogs} />
          Settings
        </NavLink>
        
      </nav>
    </div>
  );
};

export default Sidebar;
