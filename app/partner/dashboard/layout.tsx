import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
    LayoutDashboard, 
    UserPlus, 
    Users, 
    Wallet, 
    Link as LinkIcon, 
    UserCircle, 
    LogOut, 
    GraduationCap,
    Menu,
    X,
    Bell
} from "lucide-react";
import { LogoutButton } from "@/components/LogoutButton";

export default async function PartnerDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    const user = session?.user as any;

    if (!session || !user || user.role !== "PARTNER") {
        redirect("/partner/login");
    }

    const navItems = [
        { title: "Dashboard", href: "/partner/dashboard", icon: LayoutDashboard },
        { title: "Add Student", href: "/partner/dashboard/add-student", icon: UserPlus },
        { title: "My Students", href: "/partner/dashboard/students", icon: Users },
        { title: "Earnings", href: "/partner/dashboard/earnings", icon: Wallet },
        { title: "My Link", href: "/partner/dashboard/my-link", icon: LinkIcon },
        { title: "Profile", href: "/partner/dashboard/profile", icon: UserCircle },
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            {/* Sidebar - Desktop */}
            <aside className="fixed left-0 top-0 h-screen w-72 bg-white border-r border-slate-100 hidden lg:flex flex-col z-50">
                <div className="p-8">
                    <Link href="/" className="flex items-center space-x-2">
                        <GraduationCap className="w-10 h-10 text-[#1a56db]" />
                        <div>
                            <span className="text-2xl font-black block leading-none text-slate-800">CSEC</span>
                            <span className="text-[10px] uppercase tracking-widest font-bold block text-slate-400">
                                Partner Network
                            </span>
                        </div>
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    {navItems.map((item) => (
                        <Link 
                            key={item.href} 
                            href={item.href}
                            className="flex items-center space-x-3 px-4 py-4 rounded-2xl text-slate-600 font-bold hover:bg-[#1a56db]/5 hover:text-[#1a56db] transition-all group"
                        >
                            <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span>{item.title}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-50">
                    <LogoutButton className="w-full flex items-center space-x-3 px-4 py-4 rounded-2xl text-red-500 font-bold hover:bg-red-50 transition-all">
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                    </LogoutButton>
                </div>
            </aside>

            {/* Mobile Bottom Nav */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 lg:hidden flex justify-around p-3 z-50 shadow-[0_-8px_32px_rgba(0,0,0,0.05)]">
                {navItems.slice(0, 5).map((item) => (
                    <Link key={item.href} href={item.href} className="flex flex-col items-center space-y-1">
                        <item.icon className="w-5 h-5 text-slate-400" />
                        <span className="text-[10px] font-bold text-slate-500">{item.title.split(' ')[0]}</span>
                    </Link>
                ))}
            </nav>

            {/* Main Content */}
            <main className="lg:pl-72 min-h-screen pb-24 lg:pb-0">
                {/* Header */}
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between">
                    <div>
                        <h2 className="text-slate-500 font-bold text-sm uppercase tracking-widest lg:hidden">Dashboard</h2>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                        <button className="relative p-2 bg-slate-50 rounded-xl text-slate-400 hover:text-[#1a56db] transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        
                        <div className="flex items-center space-x-3 border-l border-slate-100 pl-6">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-black text-slate-800 leading-none">{user?.name}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">Verified Partner</p>
                            </div>
                            <div className="w-10 h-10 bg-gradient-to-tr from-[#1a56db] to-blue-400 rounded-xl flex items-center justify-center text-white font-black text-sm">
                                {user?.name?.charAt(0)}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
