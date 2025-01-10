function Navbar() {
  return (
    <div className="col-span-2 w-full bg-gray-800 text-white flex justify-between items-center p-4">
      <div className="flex items-center space-x-4">
        {/* Company Logo and Name */}
        <div className="flex items-center space-x-2">
          <img
            src="/logo.png" // Replace with your company logo URL
            alt="Company Logo"
            className="w-10 h-10"
          />
          <h1 className="text-lg font-semibold">Aestivaults</h1>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* User Image and Name */}
        <div className="flex items-center space-x-2">
          <img
            src="https://randomuser.me/api/portraits/men/1.jpg" // Random user image
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          <p className="text-sm font-medium">Crypto User</p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
