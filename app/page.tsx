"use client";
import React, { useState } from 'react';
// Con đã thêm Menu vào đây để hết lỗi "not defined" bố nhé
import { LayoutDashboard, Database, Users, Bell, Search, PlusCircle, Smartphone, Home, CheckCircle, Clock, Menu, X } from 'lucide-react';

export default function HuyOkingMobileSuper() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false); // Trạng thái mở ô tìm kiếm trên Mobile

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      
      {/* 1. SIDEBAR - MENU TRƯỢT */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0 lg:flex lg:flex-col shadow-xl
      `}>
        <div className="p-8 border-b border-slate-800 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-black tracking-tighter text-white">HUY-OKING CRM <span className="text-blue-500 text-sm font-bold ml-1">3.0</span></h1>
            <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-semibold text-white/50">Hệ thống thực chiến</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <NavItem icon={<LayoutDashboard size={20}/>} label="Bảng điều khiển" active={activeTab === 'dashboard'} onClick={() => {setActiveTab('dashboard'); setSidebarOpen(false);}} />
          <NavItem icon={<Home size={20}/>} label="Quản lý Kho hàng" active={activeTab === 'inventory'} onClick={() => {setActiveTab('inventory'); setSidebarOpen(false);}} />
          <NavItem icon={<Users size={20}/>} label="Danh sách Khách hàng" active={activeTab === 'customers'} onClick={() => {setActiveTab('customers'); setSidebarOpen(false);}} />
          <NavItem icon={<Smartphone size={20}/>} label="Lịch sử Telegram Bot" active={activeTab === 'bot'} onClick={() => {setActiveTab('bot'); setSidebarOpen(false);}} />
        </nav>
      </aside>

      {/* 2. OVERLAY KHI MỞ MENU */}
      {isSidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-40 lg:hidden" />}

      {/* 3. NỘI DUNG CHÍNH */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        
        {/* HEADER CẢI TIẾN - CÓ NÚT TÌM KIẾM MOBILE */}
        <header className="h-16 lg:h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-10 shrink-0">
          <div className="flex items-center gap-2">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-600">
              <Menu size={24} />
            </button>
            
            {/* TÌM KIẾM TRÊN DESKTOP */}
            <div className="relative hidden lg:block lg:w-80">
              <Search className="absolute left-4 top-2.5 text-slate-400" size={16}/>
              <input type="text" placeholder="Tìm mã căn, SĐT..." className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500" />
            </div>

            {/* NÚT TÌM KIẾM TRÊN MOBILE */}
            <button onClick={() => setSearchOpen(!isSearchOpen)} className="lg:hidden p-2 text-slate-600">
              <Search size={24} />
            </button>
          </div>

          {/* Ô TÌM KIẾM MOBILE (HIỆN RA KHI NHẤN KÍNH LÚP) */}
          {isSearchOpen && (
            <div className="absolute top-16 left-0 w-full bg-white p-4 border-b shadow-md lg:hidden z-30 flex gap-2">
              <input autoFocus type="text" placeholder="Gõ số điện thoại..." className="flex-1 p-2 bg-slate-100 rounded-lg text-sm border-none focus:ring-2 focus:ring-blue-500" />
              <button onClick={() => setSearchOpen(false)} className="p-2 text-slate-400"><X size={20}/></button>
            </div>
          )}
          
          <div className="flex items-center gap-2 lg:gap-6">
            <button className="bg-blue-600 text-white p-2 lg:px-5 lg:py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-blue-200">
              <PlusCircle size={22}/>
              <span className="hidden lg:inline uppercase">Thêm hàng</span>
            </button>
            <div className="relative p-2 text-slate-600"><Bell size={22} /><span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span></div>
          </div>
        </header>

        {/* NỘI DUNG CUỘN */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-10 space-y-6">
          {/* CÁC THẺ CHỈ SỐ */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
            <StatCard label="Quỹ Hàng" value="528" trend="+15" color="blue" />
            <StatCard label="Cần Chăm" value="45" trend="Gấp" color="orange" />
            <StatCard label="Chờ Chốt" value="12" trend="8.2T" color="green" />
            <StatCard label="Tin Bot" value="03" trend="Mới" color="purple" />
          </section>

          {/* DỮ LIỆU TỪ BOT */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white">
              <h2 className="font-bold text-slate-800 flex items-center gap-2 text-sm italic uppercase tracking-tighter">
                <Smartphone className="text-blue-600" size={18}/> Dữ liệu từ Bot
              </h2>
            </div>
            <div className="p-4 flex items-center gap-4 hover:bg-slate-50">
               <div className="w-12 h-12 bg-slate-100 rounded-xl border shrink-0"></div>
               <div className="flex-1 min-w-0">
                  <p className="font-black text-sm truncate uppercase">Anh Tuấn - 0912xxx</p>
                  <p className="text-[11px] text-slate-500 truncate">Bán SH San Hô 06 - 18.5 Tỷ...</p>
               </div>
               <button className="bg-blue-600 text-white p-2 rounded-xl shadow-md"><CheckCircle size={20}/></button>
            </div>
          </div>

          {/* LỊCH HẸN */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
            <h2 className="font-black text-slate-800 text-xs uppercase tracking-widest border-b pb-3">Lịch hẹn hôm nay</h2>
            <TodoItem time="10:00" task="Xem nhà L3" user="A. Mạnh" status="urgent" />
            <TodoItem time="14:30" task="Báo giá SH01" user="C. Nga" status="normal" />
          </div>
        </div>
      </main>
    </div>
  );
}

// CÁC THÀNH PHẦN PHỤ
function NavItem({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all font-bold text-sm ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
      {icon} <span className="uppercase tracking-tighter">{label}</span>
    </button>
  );
}

function StatCard({ label, value, trend, color }: any) {
  const colors: any = {
    blue: 'border-blue-500 text-blue-600',
    orange: 'border-orange-500 text-orange-600',
    green: 'border-green-500 text-green-600',
    purple: 'border-purple-500 text-purple-600',
  };
  return (
    <div className={`p-4 rounded-3xl border-l-4 shadow-sm bg-white ${colors[color]}`}>
      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{label}</p>
      <div className="flex items-baseline gap-1 mt-1">
        <span className="text-xl lg:text-3xl font-black text-slate-900 leading-none">{value}</span>
        <span className="text-[9px] font-bold opacity-70">{trend}</span>
      </div>
    </div>
  );
}

function TodoItem({ time, task, user, status }: any) {
  return (
    <div className={`p-3 rounded-2xl border-l-4 ${status === 'urgent' ? 'bg-red-50 border-red-500' : 'bg-slate-50 border-slate-300'}`}>
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-black text-slate-400 flex items-center gap-1"><Clock size={12}/> {time}</span>
        {status === 'urgent' && <span className="bg-red-500 w-2 h-2 rounded-full animate-pulse"></span>}
      </div>
      <p className="font-bold text-xs text-slate-800 mt-1 uppercase tracking-tight">{task}</p>
      <p className="text-[10px] text-slate-500 font-medium">KHÁCH: {user}</p>
    </div>
  );
}