import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import useOrderById from "../../hooks/useOrderDetail";

const OrderDetail = () => {
  const { orderId } = useParams();
  const { order, loading, error } = useOrderById(orderId);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (timeStr) => {
    const [hour, minute] = timeStr.split(":");
    return `${hour}:${minute}`;
  };

  return (
    <div className="text-black flex flex-col overflow-auto h-full">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold mb-4">Order Detail</h1>
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <Link to="/orders">Orders</Link>
            </li>
            <li>{orderId}</li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col rounded-box bg-gray-800 p-6 gap-6 h-full">
        {loading ? (
          <p className="text-white text-center">Memuat detail order...</p>
        ) : error ? (
          <p className="text-red-500">Terjadi kesalahan: {error}</p>
        ) : order ? (
          <>
            <div className="flex gap-6">
              <div className="w-1/2 flex flex-col gap-4 text-white">
                <fieldset className="fieldset rounded-box border border-white p-4">
                  <legend className="text-base font-semibold">Informasi Order</legend>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm opacity-70">Order ID:</span>
                      <p className="font-medium text-lg">{order.id}</p>
                    </div>
                    <div>
                      <span className="text-sm opacity-70">Tanggal Pemesanan:</span>
                      <p className="font-medium">
                        {order.createdAt?.seconds
                          ? new Date(order.createdAt.seconds * 1000).toLocaleDateString("id-ID", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          : "—"}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm opacity-70">Pembayaran:</span>
                      <p className="font-medium">{order.paymentMethod}</p>
                    </div>
                    <div>
                      <span className="text-sm opacity-70">Total Pembayaran:</span>
                      <p className="font-medium">{order.totalPrice ? `Rp${order.totalPrice.toLocaleString("id-ID")}` : "—"}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-sm opacity-70">Status Pembayaran:</span>
                      <span className={`badge ${order.paymentStatus === "success" ? "badge-success" : "badge-warning"}`}>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-sm opacity-70">Status Order:</span>
                      <span className={`badge ${order.status === "success" ? "badge-success" : "badge-warning"}`}>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                    </div>
                  </div>
                </fieldset>
              </div>

              <div className="w-1/2 flex flex-col gap-4 text-white">
                <fieldset className="fieldset rounded-box border border-white p-4">
                  <legend className="text-base font-semibold">Informasi Akun</legend>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm opacity-70">User ID:</span>
                      <p className="font-medium text-lg">{order.userId}</p>
                    </div>
                    <div>
                      <span className="text-sm opacity-70">Nama:</span>
                      <p className="font-medium">{order.user.fullName}</p>
                    </div>
                    <div>
                      <span className="text-sm opacity-70">Email:</span>
                      <p className="font-medium">{order.user.email}</p>
                    </div>
                    <div>
                      <span className="text-sm opacity-70">No Handphone:</span>
                      <p className="font-medium">{order.user.phoneNumber}</p>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>

            <div className="flex flex-col gap-3 text-white">
              <div>
                <h2 className="text-lg font-semibold mb-2 text-white">Daftar Tiket</h2>
                <p className="font-medium text-lg">{order.event.title}</p>
                <span className="text-sm opacity-70">{order.ticket?.session_start_date && order.ticket?.session_start_time ? `${formatDate(order.ticket.session_start_date)}, ${formatTime(order.ticket.session_start_time)}` : "—"}</span>
              </div>

              <table className="table text-white">
                <thead>
                  <tr className="text-gray-400 text-left border-b border-gray-600">
                    <th>No</th>
                    <th>Kategori</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {order.tickets.map((tickets, index) => (
                    <tr className="border-b border-gray-700 hover:bg-gray-700/25 cursor-pointer">
                      <th>{index + 1}</th>
                      <td>{tickets.name}</td>
                      <td>{tickets.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p>Order tidak ditemukan.</p>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;
