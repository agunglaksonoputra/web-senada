import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import { getEventById, getKategoriEvent } from "../../services/eventService";
import TicketTable from "../../components/TicketTable";
import TicketCategoryTable from "../../components/TicketCategoryTable";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categoryNames, setCategoryNames] = useState([]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const [eventData, kategoriData] = await Promise.all([getEventById(id), getKategoriEvent()]);

        setEvent(eventData);

        // Proses langsung nama kategori
        const names = eventData.category.map((catId) => {
          const match = kategoriData.find((k) => k.id === catId);
          return match ? match.name : "(Tidak ditemukan)";
        });
        setCategoryNames(names);
      } catch (error) {
        console.error("Gagal memuat event:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchEvent();
  }, [id]);

  return (
    <div className="text-black flex flex-col overflow-auto h-full">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold mb-4">Events Detail</h1>
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <Link to="/events">Events</Link>
            </li>
            <li>{id}</li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col rounded-box bg-gray-800 p-6 gap-6 h-full">
        {loading ? (
          <p className="text-white">Memuat data...</p>
        ) : event ? (
          <>
            <div className="flex gap-6">
              {/* Left */}
              <div className="w-1/2 flex flex-col gap-4 text-white">
                {event.thumbnail ? (
                  <img src={event.thumbnail} alt="Thumbnail" className="rounded-lg w-full" />
                ) : (
                  <div className="bg-gray-600 h-48 rounded-lg flex items-center justify-center">
                    <span>No Image</span>
                  </div>
                )}
              </div>

              {/* Right */}
              <div className="w-1/2 flex flex-col gap-4 text-white">
                <fieldset className="fieldset rounded-box border border-white p-4">
                  <legend className="text-base font-semibold">Informasi Dasar</legend>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm opacity-70">Judul Event:</span>
                      <p className="font-medium text-lg">{event.title}</p>
                    </div>
                    <div>
                      <span className="text-sm opacity-70">Lokasi:</span>
                      <p className="font-medium">{event.location}</p>
                    </div>
                    <div>
                      <span className="text-sm opacity-70">No. Telepon:</span>
                      <p className="font-medium">{event.phone_number}</p>
                    </div>
                  </div>
                </fieldset>

                <fieldset className="fieldset rounded-box border border-white p-4">
                  <legend className="text-base font-semibold">Kategori Event</legend>
                  <div className="flex flex-wrap gap-2">
                    {categoryNames.map((name, index) => (
                      <span key={index} className="badge badge-primary">
                        {name}
                      </span>
                    ))}
                  </div>
                </fieldset>
              </div>
            </div>

            <fieldset className="fieldset rounded-box border border-white p-4 text-white">
              <legend className="text-base font-semibold">Deskripsi Event</legend>
              <p className="text-sm leading-relaxed text-justify">{event.description}</p>
            </fieldset>

            {/* Tampilkan Tabel Tiket */}
            <TicketTable eventId={id} />
            <TicketCategoryTable eventId={id} />
          </>
        ) : (
          <p className="text-white">Event tidak ditemukan.</p>
        )}
      </div>
    </div>
  );
};

export default EventDetail;
