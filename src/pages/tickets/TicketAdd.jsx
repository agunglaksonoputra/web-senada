import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createTicket } from "../../services/ticketService";
import toast from "react-hot-toast";
import TicketCategoryTable from "../../components/TicketCategoryTable";

const TicketAdd = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState({
    name: "",
    quota: "",
    session_start_date: "",
    session_start_time: "",
    session_end_date: "",
    session_end_time: "",
    category: [],
    is_active: true,
    is_sold: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicket((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setTicket((prev) => ({
      ...prev,
      category: value.split(",").map((c) => c.trim()),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTicket({ ...ticket, event_id: eventId });
      toast.success("Tiket berhasil dibuat!");
      navigate(`/events/${eventId}`);
    } catch (error) {
      toast.error("Gagal membuat tiket: " + error.message);
    }
  };

  return (
    <div className="text-black flex flex-col overflow-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold mb-4">Ticket Create</h1>
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <Link to="/events">Events</Link>
            </li>
            <li>
              <Link to={`/events/${eventId}`}>{eventId}</Link>
            </li>
            <li>Ticket Create</li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col rounded-box bg-gray-800 p-6 gap-6 h-full">
        <form onSubmit={handleSubmit} className="text-white space-y-4" method="POST">
          <div>
            <label className="block mb-1">Nama Tiket</label>
            <input type="text" name="name" value={ticket.name} onChange={handleChange} className="input input-bordered w-full" required />
          </div>

          <div>
            <label className="block mb-1">Kuota</label>
            <input type="number" name="quota" value={ticket.quota} onChange={handleChange} className="input input-bordered w-full" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Tanggal Mulai</label>
              <input type="date" name="session_start_date" value={ticket.session_start_date} onChange={handleChange} className="input input-bordered w-full" required />
            </div>
            <div>
              <label className="block mb-1">Waktu Mulai</label>
              <input type="time" name="session_start_time" value={ticket.session_start_time} onChange={handleChange} className="input input-bordered w-full" required />
            </div>
            <div>
              <label className="block mb-1">Tanggal Selesai</label>
              <input type="date" name="session_end_date" value={ticket.session_end_date} onChange={handleChange} className="input input-bordered w-full" required />
            </div>
            <div>
              <label className="block mb-1">Waktu Selesai</label>
              <input type="time" name="session_end_time" value={ticket.session_end_time} onChange={handleChange} className="input input-bordered w-full" required />
            </div>
          </div>

          <div>
            <label className="block mb-1">Kategori ID (pisahkan dengan koma)</label>
            <input type="text" name="category" onChange={handleCategoryChange} className="input input-bordered w-full" placeholder="Contoh: MWIfxjBgAzwWHmivqcL5, g3a1D4lXcmtGaJAMWb74" required />
          </div>

          <div className="flex gap-4 items-center">
            <label>Status Aktif:</label>
            <input type="checkbox" name="is_active" checked={ticket.is_active} onChange={() => setTicket((prev) => ({ ...prev, is_active: !prev.is_active }))} />
            <label>Sudah Terjual:</label>
            <input type="checkbox" name="is_sold" checked={ticket.is_sold} onChange={() => setTicket((prev) => ({ ...prev, is_sold: !prev.is_sold }))} />
          </div>

          <div className="flex justify-end">
            <button type="submit" className="btn btn-primary">
              Simpan Tiket
            </button>
          </div>
        </form>

        <TicketCategoryTable eventId={eventId} />
      </div>
    </div>
  );
};

export default TicketAdd;
