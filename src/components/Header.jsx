const Header = () => {
  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold text-black">Admin Dashboard</h2>
      <div className="avatar">
        <div className="w-8 rounded-full">
          <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
        </div>
      </div>
    </div>
  );
};

export default Header;
