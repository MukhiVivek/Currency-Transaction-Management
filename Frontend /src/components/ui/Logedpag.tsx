import { LogOut, User, Moon, ShieldCheck, BellRing } from "lucide-react";
import { Link } from "react-router-dom";
import { useUser } from "../../hooks/useUser";

const getColorFromLetter = (letter: string) => {
  const colors = [
    "bg-gradient-to-r from-pink-500 to-yellow-500",
    "bg-gradient-to-r from-blue-500 to-green-400",
    "bg-gradient-to-r from-purple-600 to-indigo-400",
    "bg-gradient-to-r from-yellow-400 to-red-500",
  ];
  const index = letter.charCodeAt(0) % colors.length;
  return colors[index];
};

function Logged() {

  const userData : any = useUser()

  const user = {
    name: userData?.data?.username || "User",
  };

  const firstLetter = user.name[0].toUpperCase();
  const bgColor = getColorFromLetter(firstLetter);

  function logout() {
    localStorage.removeItem("token");
    window.location.reload();
  }

  return (
    <div className="min-h-screen justify-between bg-gradient-to-br dark:from-gray-900 dark:via-black dark:to-gray-900 dark:text-white p-6">
      <div className="flex flex-col items-center">
        <div className={`w-28 h-28 rounded-full flex items-center justify-center text-5xl font-bold text-white shadow-lg ${bgColor}`}>
          {firstLetter}
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-wide">{user.name}</h1>
        <p className="text-sm text-gray-400">Tap to update your profile</p>

        <div className="mt-10 w-full max-w-md space-y-6" >
          <Link to="/customer/add" className="block">
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl flex hover:bg-white/20 items-center gap-4 shadow-md">
              <User className="text-blue-400" />
              <div>
                <h2 className="font-semibold text-lg">Customer Add</h2>
                <p className="text-sm text-gray-400">Manage your Customer and Details</p>
              </div>
            </div>
          </Link>
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl flex hover:bg-white/20 items-center gap-4 shadow-md">
            <ShieldCheck className="text-green-400" />
            <div>
              <h2 className="font-semibold text-lg">Security</h2>
              <p className="text-sm text-gray-400">Privacy, password, and protection</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl flex hover:bg-white/20 items-center gap-4 shadow-md">
            <Moon className="text-purple-400" />
            <div>
              <h2 className="font-semibold text-lg">Theme</h2>
              <p className="text-sm text-gray-400">Dark mode and appearance</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl flex hover:bg-white/20 items-center gap-4 shadow-md">
            <BellRing className="text-yellow-400" />
            <div>
              <h2 className="font-semibold text-lg">Notifications</h2>
              <p className="text-sm text-gray-400">Alerts and sounds</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 w-full max-w-md mx-auto">
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-blue-500 hover:bg-red-700 text-white font-semibold text-lg shadow-lg transition duration-300"
        >
          <LogOut size={22} /> Logout
        </button>
      </div>
    </div>
  );
}

export default Logged;