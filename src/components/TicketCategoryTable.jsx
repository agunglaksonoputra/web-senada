// src/components/TicketCategoryTable.jsx
import { useEffect, useState } from "react";
import { getTicketCategoriesByEventId } from "../services/ticketService";

const TicketCategoryTable = ({ eventId }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("eventId di TicketCategoryTable:", eventId);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getTicketCategoriesByEventId(eventId);
        setCategories(data);
      } catch (error) {
        console.error("Gagal memuat kategori tiket:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (eventId) fetchCategories();
  }, [eventId]);

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2 text-white">Kategori Tiket</h2>

      {loading ? (
        <p className="text-gray-300">Memuat kategori tiket...</p>
      ) : categories.length === 0 ? (
        <p className="text-gray-300 text-center">Belum ada kategori tiket.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table text-white">
            <thead>
              <tr className="text-gray-400 text-left border-b border-gray-600">
                <th>ID</th>
                <th>Nama</th>
                <th>Harga</th>
                <th>Deskripsi</th>
                <th>Catatan</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id} className="border-b border-gray-700">
                  <td>{cat.id}</td>
                  <td>{cat.name}</td>
                  <td>{cat.price?.toLocaleString("id-ID", { style: "currency", currency: "IDR" }) || "Rp 0"}</td>
                  <td>{cat.description || "-"}</td>
                  <td>{cat.note || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TicketCategoryTable;
