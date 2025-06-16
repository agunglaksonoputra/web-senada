import { useEffect, useState } from "react";
import { getTicketsByEventId } from "../services/ticketService";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const TicketTable = () => {
  const { id } = useParams();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await getTicketsByEventId(id);
        setTickets(data);
      } catch (err) {
        console.error("Gagal memuat tiket:", err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTickets();
  }, [id]);

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold mb-2 text-white">Daftar Tiket</h2>
        <div className="flex justify-end">
          <Link to={`/events/${id}/tickets/new`} className="btn btn-primary">
            <FontAwesomeIcon icon={faPlus} /> Add Ticket
          </Link>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-300">Memuat tiket...</p>
      ) : tickets.length === 0 ? (
        <p className="text-gray-300 text-center">Belum ada tiket untuk event ini.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table text-white">
            <thead>
              <tr className="text-gray-400 text-left border-b border-gray-600">
                <th>ID</th>
                <th>Nama</th>
                <th>Quota</th>
                <th>Active</th>
                <th>Tanggal</th>
                <th>Waktu</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="border-b border-gray-700">
                  <td>{ticket.id}</td>
                  <td>{ticket.name || "-"}</td>
                  <td>{ticket.quota || 0}</td>
                  <td>
                    <span className={`badge px-3 py-1 text-sm ${ticket.is_active ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>{ticket.is_active ? "Aktif" : "Nonaktif"}</span>
                  </td>
                  <td>{ticket.session_start_date || "-"}</td>
                  <td>{ticket.session_start_time || "-"}</td>
                  <td>
                    <button className="btn btn-sm btn-outline btn-primary">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TicketTable;
