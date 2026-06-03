// Dashoard Page
"use client";

import { useState, useEffect, useRef } from "react";
import {
  Plus,
  Search,
  Bell,
  User,
  Sparkles,
  LogOut,
  Menu,
  X,
  Clock,
  TrendingUp,
  MessageCircle,
  Lightbulb,
  LayoutDashboard,
  MessageCircleMore,
  ChevronRight,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchFriend, setSearchFriend] = useState("");
  const [searchChat, setSearchChat] = useState("");
  const [user, setUser] = useState({ name: "" });
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("friends");
  const sidebarRef = useRef(null);
  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      if (session?.user?.email) {
        setUserEmail(session.user.email);
      }
    };

    fetchSession();
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const session = await getSession();
      if (!session || !session.user) {
        router.push("/login");
        return;
      } else {
        setUser({
          name: session.user.name || "",
          image: session.user.image || "",
        });
      }
    };
    checkAuth();
  }, []);

  const [friends, setFriends] = useState([]);
  const [aiChats, setAiChats] = useState([]);

  const loadAllLists = async () => {
    if (!userEmail) return;

    try {
      // --- Load Friends ---
      const fRes = await fetch(`/api/get-friends?email=${userEmail}`);
      const fData = await fRes.json();

      // --- Load AI Chats ---
      const cRes = await fetch(`/api/fetch-ai-chats`);
      const cData = await cRes.json();

      setFriends(fData.friends || []);
      setAiChats(cData.chats || []);
    } catch (err) {
      console.error("Error loading lists:", err);
    }
  };

  useEffect(() => {
    loadAllLists();
  }, [userEmail]);

  const filteredFriends = friends.filter((f) =>
    (f.name || f.email).toLowerCase().includes(searchFriend.toLowerCase())
  );

  const filteredAIChats = aiChats.filter((c) =>
    (c.name || c.convoId).toLowerCase().includes(searchChat.toLowerCase())
  );

  // handling the logout of a user
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", { method: "POST" });

      if (res.ok) {
        // Clear LocalStorage
        localStorage.removeItem("auth_token");
        localStorage.clear(); // optional: clears all keys
        sessionStorage.clear();
        window.location.href = "/login";
        router.push("/login");
      }
    } catch (err) {
      console.error("Logout failed", err);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.closest("button") // ignore clicks on the toggle button
      ) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
//       {/* Sidebar */}
//       <div
//         ref={sidebarRef}
//         className={`fixed left-0 top-0 h-full w-64 bg-white/80 backdrop-blur-md border-r border-white/20 z-50 transform transition-transform duration-300 ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } lg:translate-x-0`}
//       >
//         <div className="p-4">
//           <div className="flex items-center justify-between mb-8">
//             <div className="flex items-center space-x-2">
//               <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
//                 <img
//                   src="/chatterly_logo.png"
//                   alt="logo"
//                   className="w-full h-full object-cover rounded-md"
//                 />
//               </div>
//               <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
//                 ChatterlyAI
//               </span>
//             </div>

//             {/* Close button pushed to the right */}
//             <div className="flex-1 flex justify-end lg:hidden">
//               <button
//                 onClick={() => setIsSidebarOpen(false)}
//                 className="p-1 hover:bg-gray-200 rounded-md"
//               >
//                 <X className="w-5 h-5 text-gray-600" />
//               </button>
//             </div>
//           </div>
//           <nav className="space-y-2">
//             <Link
//               href="/dashboard"
//               className="flex items-center space-x-3 px-4 py-3 bg-purple-100 text-purple-700 rounded-xl"
//             >
//               <LayoutDashboard className="w-5 h-5" />
//               <span>Dashboard</span>
//             </Link>
//             <Link
//               href="/ask-doubt"
//               className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
//             >
//               <Lightbulb className="w-5 h-5" />
//               <span>Chatbot</span>
//             </Link>
//             <Link
//               href="/chat"
//               className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
//             >
//               <MessageCircleMore className="w-5 h-5" />
//               <span>Chat with Friends</span>
//             </Link>
//           </nav>
//         </div>

//         <div className="absolute bottom-6 left-6 right-6">
//           <button
//             onClick={handleLogout}
//             className="flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors w-full"
//           >
//             <LogOut className="w-5 h-5" />
//             <span>Logout</span>
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="lg:ml-64">
//         {/* Header */}
//         <header className="bg-white/70 backdrop-blur-md border-b border-white/20 px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//                 className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 {isSidebarOpen ? (
//                   <X className="w-6 h-6" />
//                 ) : (
//                   <Menu className="w-6 h-6" />
//                 )}
//               </button>
//               <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
//             </div>

//             <div className="flex items-center space-x-4">
//               <Link href="/profile">
//                 <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-300 cursor-pointer">
//                   {user?.image ? (
//                     <img
//                       src={user.image}
//                       alt="User"
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <div className="w-full h-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
//                       <User className="w-4 h-4 text-white" />
//                     </div>
//                   )}
//                 </div>
//               </Link>
//             </div>
//           </div>
//         </header>

//         {/* Content */}
//         <main className="p-6">
//           {/* Welcome Section */}
//           <div className="mb-8">
//             <h2 className="text-3xl font-bold text-gray-800 mb-2">
//               Welcome back
//               {user?.name && user.name.trim() !== ""
//                 ? `, ${user.name}! 👋`
//                 : ","}
//             </h2>

//             <p className="text-gray-600">Ready to continue?</p>
//           </div>

//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
//             {/* Chat with Friends Card */}
//             <Link href="/chat" className="block">
//               {" "}
//               <div
//                 className="group relative bg-gradient-to-br from-purple-500 via-purple-500 to-purple-600 
// rounded-2xl p-8 text-white cursor-pointer overflow-hidden hover:shadow-xl transition-all 
// duration-300 hover:scale-105 h-full flex flex-col justify-between"
//               >
//                 <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
//                 <div className="relative z-10">
//                   <div className="flex items-start justify-between mb-6">
//                     <div>
//                       <h3 className="text-2xl font-bold mb-1">
//                         Chat with Friends
//                       </h3>
//                       <p className="text-purple-100 text-sm">
//                         Connect & collaborate
//                       </p>
//                     </div>
//                     <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
//                       <MessageCircle size={28} className="text-white" />
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2 text-purple-100 text-sm font-medium group-hover:translate-x-1 transition-transform">
//                     Start Chat <ChevronRight size={18} />
//                   </div>
//                 </div>
//               </div>
//             </Link>
//             <Link href="/ask-doubt" className="block">
//               {/* Chat with AI Card */}
//               <div
//                 className="group relative bg-gradient-to-br from-emerald-500 via-emerald-500 to-emerald-600 
// rounded-2xl p-8 text-white cursor-pointer overflow-hidden hover:shadow-xl transition-all 
// duration-300 hover:scale-105 h-full flex flex-col justify-between"
//               >
//                 <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
//                 <div className="relative z-10">
//                   <div className="flex items-start justify-between mb-6">
//                     <div>
//                       <h3 className="text-2xl font-bold mb-1">Chat with AI</h3>
//                       <p className="text-emerald-100 text-sm">
//                         Intelligent assistance
//                       </p>
//                     </div>
//                     <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
//                       <Sparkles size={28} className="text-white" />
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2 text-emerald-100 text-sm font-medium group-hover:translate-x-1 transition-transform">
//                     Start Chat <ChevronRight size={18} />
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           </div>
//           <div className="flex gap-1 mb-8 bg-slate-100 p-1 rounded-lg w-fit">
//             <button
//               onClick={() => setActiveTab("friends")}
//               className={`px-6 py-2.5 rounded-md font-medium transition-all ${
//                 activeTab === "friends"
//                   ? "bg-white text-purple-600 shadow-sm"
//                   : "text-slate-600 hover:text-slate-900"
//               }`}
//             >
//               <div className="flex items-center gap-2">
//                 <Users size={18} />
//                 Friends
//               </div>
//             </button>
//             <button
//               onClick={() => setActiveTab("ai")}
//               className={`px-6 py-2.5 rounded-md font-medium transition-all ${
//                 activeTab === "ai"
//                   ? "bg-white text-emerald-600 shadow-sm"
//                   : "text-slate-600 hover:text-slate-900"
//               }`}
//             >
//               <div className="flex items-center gap-2">
//                 <Sparkles size={18} />
//                 AI Chats
//               </div>
//             </button>
//           </div>

//           {/* Search and List */}
//           {activeTab === "friends" ? (
//             <div className="space-y-6">
//               {/* Search */}
//               <div className="relative">
//                 <Search
//                   className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
//                   size={20}
//                 />
//                 <input
//                   type="text"
//                   placeholder="Search friends..."
//                   value={searchFriend}
//                   onChange={(e) => setSearchFriend(e.target.value)}
//                   className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-white text-slate-900 placeholder-slate-500 transition-all"
//                 />
//               </div>

//               {/* Friends List */}
//               <div className="space-y-3">
//                 {filteredFriends.length === 0 && (
//                   <p className="text-sm text-gray-400">No friends found</p>
//                 )}

//                 {filteredFriends.map((f) => (
//                   <div
//                     key={f.chatbox_id}
//                     onClick={() =>
//                       router.push(`/chat?chatboxId=${f.chatbox_id}`)
//                     }
//                     className="flex items-center justify-between p-4 bg-white rounded-lg border border-slate-200/50 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer group"
//                   >
//                     <div className="flex items-center gap-4 flex-1">
//                       <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
//                         <Users size={24} className="text-white" />
//                       </div>
//                       <div>
//                         <p className="font-semibold text-slate-900">
//                           {f.name || f.email}
//                         </p>
//                         <p className="text-sm text-slate-500">Active chat</p>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-xs text-slate-500">
//                         {new Date(f.lastModified).toLocaleDateString()}
//                       </p>
//                       <ChevronRight
//                         size={20}
//                         className="text-slate-300 group-hover:text-purple-500 transition-colors mt-1"
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ) : (
//             <div className="space-y-6">
//               {/* Search */}
//               <div className="relative">
//                 <Search
//                   className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
//                   size={20}
//                 />
//                 <input
//                   type="text"
//                   placeholder="Search AI chats..."
//                   value={searchChat}
//                   onChange={(e) => setSearchChat(e.target.value)}
//                   className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white text-slate-900 placeholder-slate-500 transition-all"
//                 />
//               </div>

//               {/* AI Chats List */}
//               <div className="space-y-3">
//                 {filteredAIChats.length === 0 && (
//                   <p className="text-sm text-gray-400">No chats found</p>
//                 )}

//                 {filteredAIChats.map((c) => (
//                   <div
//                     key={c._id}
//                     onClick={() =>
//                       router.push(`/ask-doubt?convoId=${c.convoId}`)
//                     }
//                     className="flex items-center justify-between p-4 bg-white rounded-lg border border-slate-200/50 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group"
//                   >
//                     <div className="flex items-center gap-4 flex-1">
//                       <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
//                         <Sparkles size={24} className="text-white" />
//                       </div>
//                       <div>
//                         <p className="font-semibold text-slate-900">
//                           {c.name || "Untitled Chat"}
//                         </p>
//                         <p className="text-sm text-slate-500">AI Assistant</p>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-xs text-slate-500">
//                         {new Date(c.lastModified).toLocaleDateString()}
//                       </p>
//                       <ChevronRight
//                         size={20}
//                         className="text-slate-300 group-hover:text-emerald-500 transition-colors mt-1"
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }

return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,300&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        * { box-sizing: border-box; }
        body { font-family: 'DM Sans', sans-serif; background: #F3EDE1; margin: 0; }
        .serif { font-family: 'Fraunces', serif; }

        /* Sidebar nav links */
        .nav-item {
          display: flex; align-items: center; gap: 10px;
          padding: 9px 12px; border-radius: 8px;
          font-size: 0.875rem; color: #7A7568;
          text-decoration: none; transition: background .15s, color .15s;
        }
        .nav-item:hover { background: #EDE7DA; color: #1C1F1A; }
        .nav-item.active { background: #EDE7DA; color: #1C1F1A; font-weight: 500; }

        /* Overlay */
        .sidebar-overlay {
          position: fixed; inset: 0; background: rgba(28,31,26,0.3);
          z-index: 40; display: none;
        }
        .sidebar-overlay.show { display: block; }

        /* Quick-action cards */
        .qa-card {
          display: flex; flex-direction: column; justify-content: space-between;
          border-radius: 12px; padding: 22px; text-decoration: none;
          border: 1.5px solid; transition: transform .18s, box-shadow .18s;
          cursor: pointer; position: relative; overflow: hidden; min-height: 130px;
        }
        .qa-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.09); }

        .qa-card-friends { background: #3A4A3A; border-color: #3A4A3A; color: #FDFAF5; }
        .qa-card-ai      { background: #FDFAF5; border-color: #D6CFBF; color: #1C1F1A; }

        .qa-icon {
          width: 38px; height: 38px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .qa-icon-friends { background: rgba(253,250,245,0.15); color: #FDFAF5; }
        .qa-icon-ai      { background: #EDE7DA; color: #5C6B5C; }

        /* Tabs */
        .tab-bar { display: flex; gap: 2px; background: #EDE7DA; border-radius: 8px; padding: 3px; width: fit-content; }
        .tab-btn {
          display: flex; align-items: center; gap: 7px;
          padding: 7px 18px; border-radius: 6px; border: none;
          font-size: 0.82rem; font-weight: 400; cursor: pointer;
          background: transparent; color: #7A7568; transition: background .15s, color .15s;
          font-family: 'DM Sans', sans-serif;
        }
        .tab-btn.active { background: #FDFAF5; color: #1C1F1A; font-weight: 500; box-shadow: 0 1px 3px rgba(0,0,0,0.07); }

        /* Search */
        .search-wrap { position: relative; }
        .search-wrap svg { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #A09B92; pointer-events: none; }
        .search-input {
          width: 100%; padding: 9px 14px 9px 38px;
          border: 1.5px solid #D6CFBF; border-radius: 8px;
          background: #FDFAF5; font-size: 0.875rem; color: #1C1F1A;
          font-family: 'DM Sans', sans-serif; transition: border-color .15s;
        }
        .search-input::placeholder { color: #C4BDB0; }
        .search-input:focus { outline: none; border-color: #5C6B5C; box-shadow: 0 0 0 3px rgba(92,107,92,0.12); }

        /* List items */
        .list-item {
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 14px; background: #FDFAF5; border: 1.5px solid #E8E2D6;
          border-radius: 10px; cursor: pointer; transition: border-color .15s, background .15s;
        }
        .list-item:hover { border-color: #7A8F6F; background: #F7F2E8; }
        .list-item:hover .item-chevron { color: #5C6B5C; }

        .item-avatar {
          width: 40px; height: 40px; flex-shrink: 0; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
        }
        .item-avatar-friends { background: #EDE7DA; color: #5C6B5C; }
        .item-avatar-ai      { background: #3A4A3A; color: #FDFAF5; }

        .item-chevron { color: #D6CFBF; transition: color .15s; }

        .logout-btn {
          display: flex; align-items: center; gap: 10px;
          width: 100%; padding: 9px 12px; border-radius: 8px;
          border: none; background: transparent; cursor: pointer;
          font-size: 0.875rem; color: #A09B92; transition: background .15s, color .15s;
          font-family: 'DM Sans', sans-serif;
        }
        .logout-btn:hover { background: #FCEAEA; color: #B94040; }
      `}</style>

      <div className="min-h-screen bg-[#F3EDE1]">

        {/* Sidebar overlay (mobile) */}
        <div
          className={`sidebar-overlay ${isSidebarOpen ? "show" : ""}`}
          onClick={() => setIsSidebarOpen(false)}
        />

        {/* ─── SIDEBAR ─── */}
        <div
          ref={sidebarRef}
          className={`fixed left-0 top-0 h-full w-60 bg-[#FDFAF5] border-r border-[#D6CFBF] z-50 flex flex-col transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
        >
          {/* Logo */}
          <div className="px-4 pt-5 pb-4 border-b border-[#D6CFBF] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md overflow-hidden border border-[#D6CFBF] flex-shrink-0">
                <img src="/chatterly_logo.png" alt="logo" className="w-full h-full object-cover" />
              </div>
              <span className="serif text-[1.05rem] text-[#1C1F1A]">ChatterlyAI</span>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden w-7 h-7 flex items-center justify-center rounded-md hover:bg-[#EDE7DA] transition-colors bg-transparent border-none cursor-pointer text-[#7A7568]"
            >
              <X size={15} />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-4 space-y-0.5">
            <p className="text-[0.62rem] font-medium tracking-[0.1em] uppercase text-[#C4BDB0] px-3 mb-2">Menu</p>
            <Link href="/dashboard" className={`nav-item ${true ? "active" : ""}`}>
              <LayoutDashboard size={15} />
              Dashboard
            </Link>
            <Link href="/ask-doubt" className="nav-item">
              <Lightbulb size={15} />
              AI Chatbot
            </Link>
            <Link href="/chat" className="nav-item">
              <MessageCircleMore size={15} />
              Chat with Friends
            </Link>
          </nav>

          {/* Logout */}
          <div className="px-3 pb-5 border-t border-[#D6CFBF] pt-3">
            <button onClick={handleLogout} className="logout-btn">
              <LogOut size={15} />
              Logout
            </button>
          </div>
        </div>

        {/* ─── MAIN ─── */}
        <div className="lg:ml-60 flex flex-col min-h-screen">

          {/* Header */}
          <header className="sticky top-0 z-30 bg-[#F3EDE1]/90 backdrop-blur-md border-b border-[#D6CFBF] px-5 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden w-8 h-8 flex items-center justify-center rounded-md border border-[#D6CFBF] bg-transparent cursor-pointer text-[#7A7568] hover:bg-[#EDE7DA] transition-colors"
              >
                <Menu size={15} />
              </button>
              <h1 className="serif text-[1.25rem] text-[#1C1F1A] tracking-tight">Dashboard</h1>
            </div>

            <Link href="/profile">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-[#D6CFBF] cursor-pointer">
                {user?.image ? (
                  <img src={user.image} alt="User" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-[#3A4A3A] flex items-center justify-center">
                    <User size={14} className="text-[#F3EDE1]" />
                  </div>
                )}
              </div>
            </Link>
          </header>

          {/* Content */}
          <main className="flex-1 px-5 py-8 max-w-3xl w-full">

            {/* Welcome */}
            <div className="mb-8">
              <h2 className="serif text-[1.9rem] md:text-[2.3rem] leading-tight tracking-tight text-[#1C1F1A] mb-1">
                Welcome back{user?.name?.trim() ? `, ${user.name}` : ""}.
              </h2>
              <p className="text-sm text-[#A09B92]">Pick up where you left off.</p>
            </div>

            {/* Quick-action cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">

              <Link href="/chat" className="qa-card qa-card-friends">
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <p className="text-base font-medium mb-0.5">Chat with Friends</p>
                    <p className="text-[0.78rem] text-[#FDFAF5]/60">Connect &amp; collaborate</p>
                  </div>
                  <div className="qa-icon qa-icon-friends">
                    <MessageCircle size={20} />
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[0.78rem] text-[#FDFAF5]/70">
                  Start chat <ChevronRight size={14} />
                </div>
              </Link>

              <Link href="/ask-doubt" className="qa-card qa-card-ai">
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <p className="text-base font-medium text-[#1C1F1A] mb-0.5">Chat with AI</p>
                    <p className="text-[0.78rem] text-[#A09B92]">Intelligent assistance</p>
                  </div>
                  <div className="qa-icon qa-icon-ai">
                    <Sparkles size={20} />
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[0.78rem] text-[#7A7568]">
                  Start chat <ChevronRight size={14} />
                </div>
              </Link>
            </div>

            {/* Tabs */}
            <div className="tab-bar mb-5">
              <button
                onClick={() => setActiveTab("friends")}
                className={`tab-btn ${activeTab === "friends" ? "active" : ""}`}
              >
                <Users size={14} /> Friends
              </button>
              <button
                onClick={() => setActiveTab("ai")}
                className={`tab-btn ${activeTab === "ai" ? "active" : ""}`}
              >
                <Sparkles size={14} /> AI Chats
              </button>
            </div>

            {/* Tab content */}
            {activeTab === "friends" ? (
              <div className="space-y-3">
                <div className="search-wrap mb-4">
                  <Search size={15} />
                  <input
                    type="text"
                    placeholder="Search friends…"
                    value={searchFriend}
                    onChange={e => setSearchFriend(e.target.value)}
                    className="search-input"
                  />
                </div>

                {filteredFriends.length === 0 && (
                  <p className="text-sm text-[#C4BDB0] py-4">No friends found.</p>
                )}
                {filteredFriends.map(f => (
                  <div
                    key={f.chatbox_id}
                    onClick={() => router.push(`/chat?chatboxId=${f.chatbox_id}`)}
                    className="list-item"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="item-avatar item-avatar-friends">
                        <Users size={18} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-[#1C1F1A] truncate">{f.name || f.email}</p>
                        <p className="text-xs text-[#A09B92]">Active chat</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                      <p className="text-xs text-[#C4BDB0]">{new Date(f.lastModified).toLocaleDateString()}</p>
                      <ChevronRight size={16} className="item-chevron" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="search-wrap mb-4">
                  <Search size={15} />
                  <input
                    type="text"
                    placeholder="Search AI chats…"
                    value={searchChat}
                    onChange={e => setSearchChat(e.target.value)}
                    className="search-input"
                  />
                </div>

                {filteredAIChats.length === 0 && (
                  <p className="text-sm text-[#C4BDB0] py-4">No chats found.</p>
                )}
                {filteredAIChats.map(c => (
                  <div
                    key={c._id}
                    onClick={() => router.push(`/ask-doubt?convoId=${c.convoId}`)}
                    className="list-item"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="item-avatar item-avatar-ai">
                        <Sparkles size={18} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-[#1C1F1A] truncate">{c.name || "Untitled Chat"}</p>
                        <p className="text-xs text-[#A09B92]">AI Assistant</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                      <p className="text-xs text-[#C4BDB0]">{new Date(c.lastModified).toLocaleDateString()}</p>
                      <ChevronRight size={16} className="item-chevron" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}