const Sidebar = () => {
  return (
    <div className="w-60 bg-gray-900 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>

      <ul className="space-y-3">
        <li>Home</li>
        <li>Add Food</li>
        <li>My Foods</li>
        <li>My Requests</li>
      </ul>
    </div>
  );
};

export default Sidebar;
