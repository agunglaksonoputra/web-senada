import { Link, useParams } from "react-router-dom";
import { useUserDetail } from "../../hooks/useUserDetail";
import { useOrdersByUserId } from "../../hooks/useOrderByUserId";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserDetail = () => {
  const { userId } = useParams();
  const { user, loading, error } = useUserDetail(userId);
  const { orders } = useOrdersByUserId(userId);

  return (
    <div className="text-black flex flex-col overflow-auto h-full">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold mb-4">User Detail</h1>
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>{userId}</li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col rounded-box bg-gray-800 p-6 gap-6 h-full">
        {loading ? (
          <p className="text-white text-center">Memuat data...</p>
        ) : error ? (
          <p className="text-red-500 text-center">Terjadi kesalahan: {error}</p>
        ) : user ? (
          <div className="flex flex-col gap-4 text-white">
            <fieldset className="fieldset rounded-box border border-white p-4">
              <legend className="text-base font-semibold">Informasi User</legend>
              <div className="space-y-3">
                <div>
                  <span className="text-sm opacity-70">User ID:</span>
                  <p className="font-medium text-lg">{userId}</p>
                </div>
                <div>
                  <span className="text-sm opacity-70">Nama:</span>
                  <p className="font-medium">{user.fullName}</p>
                </div>
                <div>
                  <span className="text-sm opacity-70">Email:</span>
                  <p className="font-medium">{user.email}</p>
                </div>
                <div>
                  <span className="text-sm opacity-70">No Handphone:</span>
                  <p className="font-medium">{user.phoneNumber}</p>
                </div>
                <div>
                  <span className="text-sm opacity-70">Role:</span>
                  <p className="font-medium">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
                </div>
              </div>
            </fieldset>
          </div>
        ) : (
          <p className="text-white text-center">Order tidak ditemukan.</p>
        )}

        <div>
          <h2 className="text-lg font-semibold mb-2 text-white">Riwayat Order</h2>
          <table className="table text-white">
            <thead>
              <tr className="text-gray-400 text-left border-b border-gray-600">
                <th>
                  <input type="checkbox" className="checkbox" />
                </th>
                <th>Order ID</th>
                <th>Tanggal Order</th>
                <th>Total Pembayaran</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((orders) => (
                <tr key={orders.id} className="border-b border-gray-700 hover:bg-gray-700/25 cursor-pointer">
                  <td>
                    <input type="checkbox" className="checkbox" />
                  </td>
                  <td>{orders.id}</td>
                  <td>
                    {orders.createdAt?.seconds
                      ? new Date(orders.createdAt.seconds * 1000).toLocaleDateString("id-ID", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "—"}
                  </td>
                  <td>{orders.totalPrice ? `Rp${orders.totalPrice.toLocaleString("id-ID")}` : "—"}</td>
                  <td>
                    <span className={`badge ${orders.status === "success" ? "badge-success" : "badge-warning"}`}>{orders.status.charAt(0).toUpperCase() + orders.status.slice(1)}</span>
                  </td>
                  <td className="flex gap-2">
                    <Link to={`/orders/${orders.id}`} className="text-lg hover:bg-gray-700 px-2 py-1 rounded-box cursor-pointer">
                      <FontAwesomeIcon icon={faEye} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
