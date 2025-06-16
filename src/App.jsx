import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/dashboard";
import Settings from "./pages/Settings";
import Event from "./pages/events/Event";
import EventAdd from "./pages/events/EventAdd";
import EventDetail from "./pages/events/EventDetail";
import Login from "./pages/Login";
import Orders from "./pages/orders/Order";
import OrderDetail from "./pages/orders/OrderDetail";
import Users from "./pages/users/User";
import UserDetail from "./pages/users/UserDetail";
import TicketAdd from "./pages/tickets/TicketAdd";

function App() {
  return (
    <Router>
      <Routes>
        {/* Route tanpa layout */}
        <Route path="/login" element={<Login />} />

        {/* Routes dengan DashboardLayout */}
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />

          {/* Route User */}
          <Route path="users" element={<Users />} />
          <Route path="users/:userId" element={<UserDetail />} />

          {/* Route Event */}
          <Route path="events" element={<Event />} />
          <Route path="events/new" element={<EventAdd />} />
          <Route path="events/:id" element={<EventDetail />} />
          <Route path="events/:eventId/tickets/new" element={<TicketAdd />} />

          {/* Route Order */}
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:orderId" element={<OrderDetail />} />

          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
