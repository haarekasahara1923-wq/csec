import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
    BarChart3,
    Users,
    BookOpen,
    School,
    Settings,
    LogOut,
    LayoutDashboard,
    ExternalLink,
    GraduationCap
} from "lucide-react";

export default async function AdminDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session) {
        redirect("/admin/login");
    }

    const navItems = [
        { title: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
        { title: "Leads", href: "/admin/leads", icon: Users },
        { title: "Courses", href: "/admin/courses", icon: BookOpen },
        { title: "Universities", href: "/admin/universities", icon: School },
        { title: "Settings", href: "/admin/settings", icon: Settings },
    ];

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Sidebar */}
            <aside className="w-64 bg-primary text-white flex flex-col fixed h-full z-30 shadow-2xl">
                <div className="p-8 pb-12">
                    <Link href="/admin/dashboard" className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center">
                            <GraduationCap className="text-primary w-6 h-6" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">CSEC Admin</span>
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors group"
                        >
                            <item.icon className="w-5 h-5 text-gray-400 group-hover:text-secondary" />
                            <span className="font-medium">{item.title}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/10 space-y-4">
                    <Link href="/" target="_blank">
                        <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">
                            <ExternalLink className="w-4 h-4" />
                            <span>View Main Site</span>
                        </button>
                    </Link>
                    <form action={async () => {
                        "use server";
                        await signOut();
                    }}>
                        <button className="flex items-center space-x-3 w-full px-4 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-colors font-bold">
                            <LogOut className="w-5 h-5" />
                            <span>Log Out</span>
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 min-h-screen p-8">
                <header className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">CSEC Control Board</h1>
                        <p className="text-slate-500 text-sm">Real-time Lead Management • {new Date().toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-slate-800">{session?.user?.email}</p>
                            <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Principal Admin</p>
                        </div>
                        <div className="w-12 h-12 bg-slate-200 rounded-full border-2 border-white shadow-sm overflow-hidden">
                            <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${session?.user?.email}`} alt="Avatar" />
                        </div>
                    </div>
                </header>
                {children}
            </main>
        </div>
    );
}
