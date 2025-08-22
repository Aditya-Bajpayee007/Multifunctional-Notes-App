export const Profile = ({ name, onLogout }) => {
  const initial = (names) => {
    if (!names) return "";
    const word = String(names).split(" ");
    let initial = "";
    for (let i = 0; i < Math.min(word.length, 2); i++) {
      if (word[i]) {
        initial += word[i][0];
      }
    }
    return initial.toUpperCase();
  };

  return (
    <div className="flex items-center space-x-3">
      {/* Avatar */}
      <div className="relative">
        <div className="font-bold h-12 w-12 flex items-center justify-center border-2 border-gray-200 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 shadow-sm hover:shadow-md transition-all duration-200">
          {initial(name.username)}
        </div>
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
      </div>

      {/* User Info */}
      <div className="flex flex-col">
        <h4 className="font-semibold text-gray-800 text-sm leading-tight">
          {name.username}
        </h4>
        <button
          className="text-xs text-gray-500 hover:text-red-600 transition-colors duration-200 text-left font-medium"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
