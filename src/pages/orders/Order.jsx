import { Link } from "react-router-dom";
import useOrders from "../../hooks/useOrders";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Orders = () => {
  const { orders, loading, error } = useOrders();

  return (
    <div className="text-black flex flex-col overflow-auto h-full">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold mb-4">Order</h1>
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <Link to="/">SENADA</Link>
            </li>
            <li>Order</li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col rounded-box bg-gray-800 p-6 gap-2 h-full">
        {loading ? (
          <p className="text-white text-center">Memuat data...</p>
        ) : error ? (
          <p className="text-red-500">Terjadi kesalahan: {error}</p>
        ) : (
          <table className="table text-white">
            <thead>
              <tr className="text-gray-400 text-left border-b border-gray-600">
                <th>
                  <input type="checkbox" className="checkbox" />
                </th>
                <th>Order ID</th>
                <th>Nama Pelanggan</th>
                <th>Tanggal Order</th>
                <th>Total Pembayaran</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-700 hover:bg-gray-700/25 cursor-pointer">
                  <td>
                    <input type="checkbox" className="checkbox" />
                  </td>
                  <td>{order.id}</td>
                  <td>{order.userName || "—"}</td>
                  <td>
                    {order.createdAt?.seconds
                      ? new Date(order.createdAt.seconds * 1000).toLocaleDateString("id-ID", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "—"}
                  </td>
                  <td>{order.totalPrice ? `Rp${order.totalPrice.toLocaleString("id-ID")}` : "—"}</td>
                  <td>
                    <span className={`badge ${order.status === "success" ? "badge-success" : "badge-warning"}`}>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                  </td>
                  <td className="flex gap-2">
                    <Link to={`/orders/${order.id}`} className="text-lg hover:bg-gray-700 px-2 py-1 rounded-box cursor-pointer">
                      <FontAwesomeIcon icon={faEye} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Orders;
