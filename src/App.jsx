import React, { useState } from 'react';
import { Calendar, CheckCircle2, FileText, Bell, Award, User, Clock, BookOpen, Send, Plus, Check, AlertCircle } from 'lucide-react';

export default function App() {
  const [role, setRole] = useState('teacher'); // 'teacher' or 'student'
  const [activeTab, setActiveTab] = useState('attendance');

  // Sample State Data
  const [attendanceList, setAttendanceList] = useState([
    { id: 1, name: 'Nguyễn Văn A', code: 'SV001', present: true },
    { id: 2, name: 'Trần Thị B', code: 'SV002', present: true },
    { id: 3, name: 'Lê Văn C', code: 'SV003', present: false },
    { id: 4, name: 'Phạm Thị D', code: 'SV004', present: true },
  ]);

  const [schedule] = useState([
    { day: 'Thứ 2', time: '08:00 - 10:30', room: 'A101', subject: 'Lập trình Web' },
    { day: 'Thứ 4', time: '13:00 - 15:30', room: 'B203', subject: 'Cơ sở dữ liệu' },
    { day: 'Thứ 6', time: '09:30 - 11:30', room: 'A101', subject: 'Thực hành Lập trình Web' },
  ]);

  const [assignments, setAssignments] = useState([
    { id: 1, title: 'Bài tập 1: Thiết kế giao diện HTML/CSS', deadline: '2026-09-25', status: 'Đã nộp', score: '9/10' },
    { id: 2, title: 'Bài tập 2: Xây dựng ứng dụng React cơ bản', deadline: '2026-09-30', status: 'Chưa nộp', score: '-' },
  ]);

  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'Thông báo về lịch kiểm tra Giữa kỳ', date: '2026-09-18', content: 'Lịch kiểm tra sẽ diễn ra vào Thứ 4 tuần sau tại phòng A101.' },
    { id: 2, title: 'Nộp bài tập 1 trước 23h59', date: '2026-09-15', content: 'Các bạn lưu ý nộp bài đúng hạn trên hệ thống.' },
  ]);

  const [grades] = useState([
    { subject: 'Lập trình Web', processScore: 8.5, midterm: 8.0, final: 'Chưa có', eval: 'Học tập tốt, tích cực phát biểu' },
    { subject: 'Cơ sở dữ liệu', processScore: 9.0, midterm: 8.5, final: 'Chưa có', eval: 'Nắm chắc kiến thức SQL' },
  ]);

  const toggleAttendance = (id) => {
    setAttendanceList(attendanceList.map(item => 
      item.id === id ? { ...item, present: !item.present } : item
    ));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Header */}
      <header className="bg-indigo-600 text-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-indigo-200" />
            <div>
              <h1 className="text-2xl font-bold">EduManage Portal</h1>
              <p className="text-xs text-indigo-200">Cổng Quản Lý Lớp Học & Sinh Viên</p>
            </div>
          </div>
          
          {/* Role Switcher */}
          <div className="flex items-center bg-indigo-700/60 p-1 rounded-lg border border-indigo-400/30">
            <button 
              onClick={() => setRole('teacher')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${role === 'teacher' ? 'bg-white text-indigo-700 shadow' : 'text-indigo-100 hover:text-white'}`}
            >
              Giảng viên
            </button>
            <button 
              onClick={() => setRole('student')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${role === 'student' ? 'bg-white text-indigo-700 shadow' : 'text-indigo-100 hover:text-white'}`}
            >
              Sinh viên
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 flex space-x-1 sm:space-x-4 overflow-x-auto">
          {[
            { id: 'attendance', label: 'Điểm danh', icon: CheckCircle2 },
            { id: 'schedule', label: 'Thời khóa biểu', icon: Calendar },
            { id: 'assignments', label: 'Bài tập về nhà', icon: FileText },
            { id: 'announcements', label: 'Thông báo', icon: Bell },
            { id: 'grades', label: 'Đánh giá & Điểm', icon: Award },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-3 px-3 border-b-2 text-sm font-medium whitespace-nowrap transition ${
                  activeTab === tab.id 
                    ? 'border-indigo-600 text-indigo-600' 
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Điểm danh */}
        {activeTab === 'attendance' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Điểm Danh Lớp Học</h2>
                <p className="text-sm text-slate-500">Ngày: {new Date().toLocaleDateString('vi-VN')}</p>
              </div>
              {role === 'teacher' && (
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
                  Lưu điểm danh
                </button>
              )}
            </div>

            <div className="divide-y divide-slate-100">
              {attendanceList.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-600">
                      {item.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{item.name}</p>
                      <p className="text-xs text-slate-500">{item.code}</p>
                    </div>
                  </div>
                  
                  {role === 'teacher' ? (
                    <button
                      onClick={() => toggleAttendance(item.id)}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition ${
                        item.present 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' 
                          : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                      }`}
                    >
                      {item.present ? 'Có mặt' : 'Vắng mặt'}
                    </button>
                  ) : (
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.present ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                      {item.present ? 'Có mặt' : 'Vắng'}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Thời khóa biểu */}
        {activeTab === 'schedule' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Thời Khóa Biểu Tuần</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {schedule.map((item, index) => (
                <div key={index} className="p-4 rounded-lg bg-indigo-50/50 border border-indigo-100 hover:shadow-md transition">
                  <span className="inline-block px-2.5 py-0.5 rounded text-xs font-bold bg-indigo-600 text-white mb-2">
                    {item.day}
                  </span>
                  <h3 className="font-bold text-slate-800">{item.subject}</h3>
                  <div className="mt-3 text-xs text-slate-600 space-y-1">
                    <p className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {item.time}</p>
                    <p className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> Phòng: {item.room}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bài tập */}
        {activeTab === 'assignments' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-800">Danh Sách Bài Tập</h2>
              {role === 'teacher' && (
                <button className="flex items-center gap-1 bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
                  <Plus className="w-4 h-4" /> Giao bài mới
                </button>
              )}
            </div>
            <div className="space-y-4">
              {assignments.map((item) => (
                <div key={item.id} className="p-4 border border-slate-200 rounded-lg flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div>
                    <h3 className="font-bold text-slate-800">{item.title}</h3>
                    <p className="text-xs text-slate-500 mt-1">Hạn nộp: {item.deadline}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded text-xs font-medium ${item.status === 'Đã nộp' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                      {item.status}
                    </span>
                    <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">Điểm: {item.score}</span>
                    {role === 'student' && item.status !== 'Đã nộp' && (
                      <button className="bg-indigo-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-indigo-700">
                        Nộp bài
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Thông báo */}
        {activeTab === 'announcements' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-800">Thông Báo Lớp Học</h2>
              {role === 'teacher' && (
                <button className="flex items-center gap-1 bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
                  <Send className="w-4 h-4" /> Đăng thông báo
                </button>
              )}
            </div>
            <div className="space-y-4">
              {announcements.map((item) => (
                <div key={item.id} className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-slate-800">{item.title}</h3>
                    <span className="text-xs text-slate-400">{item.date}</span>
                  </div>
                  <p className="text-sm text-slate-600">{item.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Đánh giá & Điểm */}
        {activeTab === 'grades' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Kết Quả Học Tập & Đánh Giá</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200">
                    <th className="p-3 font-semibold text-slate-700">Môn học</th>
                    <th className="p-3 font-semibold text-slate-700">Điểm quá trình</th>
                    <th className="p-3 font-semibold text-slate-700">Giữa kỳ</th>
                    <th className="p-3 font-semibold text-slate-700">Cuối kỳ</th>
                    <th className="p-3 font-semibold text-slate-700">Đánh giá của GV</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {grades.map((item, index) => (
                    <tr key={index} className="hover:bg-slate-50/50">
                      <td className="p-3 font-medium text-slate-800">{item.subject}</td>
                      <td className="p-3 font-bold text-indigo-600">{item.processScore}</td>
                      <td className="p-3 font-bold text-indigo-600">{item.midterm}</td>
                      <td className="p-3 text-slate-500">{item.final}</td>
                      <td className="p-3 text-slate-600 italic">{item.eval}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}