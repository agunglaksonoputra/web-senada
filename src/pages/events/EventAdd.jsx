import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { storeEvent, getKategoriEvent } from "../../services/eventService";

const EventAdd = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    phone: "",
    thumbnail: "",
    description: "",
    location: "",
    experience: "",
    categoryIds: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const data = await getKategoriEvent();
    setCategories(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;

    setFormData((prev) => {
      const categoryIds = prev.categoryIds || [];
      return {
        ...prev,
        categoryIds: checked ? [...categoryIds, value] : categoryIds.filter((id) => id !== value),
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const phoneWithPrefix = formData.phone.startsWith("0") ? "+62" + formData.phone.substring(1) : "+62" + formData.phone;

    const event = {
      title: formData.title,
      phone_number: phoneWithPrefix,
      thumbnail: formData.thumbnail,
      description: formData.description,
      location: formData.location,
      experience: formData.experience,
      categoryIds: formData.categoryIds,
    };

    const res = await storeEvent(event);

    if (res.success) {
      alert("Event berhasil disimpan!");
      navigate("/events");
    } else {
      alert("Gagal menyimpan event: " + res.message);
    }
  };

  return (
    <div className="text-black flex flex-col overflow-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold mb-4">Events Create</h1>
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <Link to="/events">Events</Link>
            </li>
            <li>Form Create</li>
          </ul>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="text-white flex flex-col rounded-box bg-gray-800 p-6 min-h-full" method="POST">
        <h2 className="text-2xl font-bold mb-2">Detail Event</h2>
        <div className="flex gap-6">
          <div className="flex flex-col gap-4 w-1/2">
            <fieldset className="fieldset">
              <legend className="text-base">Judul</legend>
              <input type="text" className="input w-full" name="title" value={formData.title} onChange={handleChange} placeholder="Judul" />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="text-base">No Telepon</legend>
              <label className="input w-full">
                <span className="label">+62</span>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="No Telepon" />
              </label>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="text-base">URL Thumbnail</legend>
              <input type="text" className="input w-full" name="thumbnail" value={formData.thumbnail} onChange={handleChange} placeholder="Thumbnail" />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="text-base">Deskripsi</legend>
              <textarea className="textarea h-24 w-full" name="description" value={formData.description} onChange={handleChange} placeholder="Deskripsi"></textarea>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="text-base">Lokasi</legend>
              <textarea className="textarea h-24 w-full" name="location" value={formData.location} onChange={handleChange} placeholder="Lokasi"></textarea>
            </fieldset>
          </div>

          <div className="flex flex-col gap-4 w-1/2">
            <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-full border p-4">
              <legend className="text-base">Kategori</legend>
              {categories.map((category) => (
                <label key={category.id} className="label cursor-pointer gap-2">
                  <input type="checkbox" className="checkbox" onChange={handleCategoryChange} checked={formData.categoryIds.includes(category.id)} value={category.id} />
                  <span>{category.name}</span>
                </label>
              ))}
            </fieldset>

            <fieldset className="fieldset">
              <legend className="text-base">Experience</legend>
              <textarea className="textarea h-24 w-full" name="experience" value={formData.experience} onChange={handleChange} placeholder="Experience"></textarea>
            </fieldset>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button type="submit" className="btn btn-primary">
            Simpan Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventAdd;
