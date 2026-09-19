import React, { useState } from 'react';
import { 
  Calendar, CheckCircle2, FileText, Bell, Award, User, Clock, 
  BookOpen, Send, Plus, Trash2, Upload, Download, ExternalLink,
  X, Check, AlertCircle, FileUp, Edit
} from 'lucide-react';

export default function App() {
  const [role, setRole] = useState('teacher'); // 'teacher' or 'student'
  const [activeTab, setActiveTab] = useState('announcements');

  // Modal States
  const [showAnnounceModal, setShowAnnounceModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [showDocModal, setShowDocModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  // --- STATE DATA ---
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'Thông báo về lịch kiểm tra Giữa kỳ', date: '18/09/2026', type: 'important', content: 'Lịch kiểm tra sẽ diễn ra vào Thứ 4 tuần sau tại phòng A101. Đề nghị sinh viên chuẩn bị đầy đủ máy tính cá nhân.' },
    { id: 2, title: 'Cập nhật tài liệu giảng dạy tuần 4', date: '15/09/2026', type: 'normal', content: 'Thầy đã tải slide bài giảng tuần 4 lên mục Tài liệu, các bạn tải về xem trước nhé.' },
  ]);

  const [schedule, setSchedule] = useState([
    { id: 1, day: 'Thứ 2', time: '08:00 - 10:30', room: 'A101', subject: 'Lập trình Web' },
    { id: 2, day: 'Thứ 4', time: '13:00 - 15:30', room: 'B203', subject: 'Cơ sở dữ liệu' },
    { id: 3, day: 'Thứ 6', time: '09:30 - 11:30', room: 'A101', subject: 'Thực hành Lập trình Web' },
  ]);

  const [assignments, setAssignments] = useState([
    { id: 1, title: 'Bài tập 1: Thiết kế giao diện HTML/CSS', deadline: '25/09/2026', desc: 'Tạo trang Landing Page giới thiệu bản thân bằng HTML5 và CSS3.', status: 'Đã nộp', score: '9.0/10', submission: 'bai_lam_sv.zip' },
    { id: 2, title: 'Bài tập 2: Xây dựng ứng dụng React cơ bản', deadline: '30/09/2026', desc: 'Viết ứng dụng Todo App sử dụng React Hooks (useState, useEffect).', status: 'Chưa nộp', score: '-', submission: null },
  ]);

  const [documents, setDocuments] = useState([
    { id: 1, title: 'Giáo trình Lập trình Web full.pdf', subject: 'Lập trình Web', date: '10/09/2026', size: '4.5 MB' },
    { id: 2, title: 'Slide Bài giảng Chương 1 - HTML & CSS.pptx', subject: 'Lập trình Web', date: '12/09/2026', size: '12.1 MB' },
    { id: 3, title: 'Đề cương chi tiết học phần Cơ sở dữ liệu.docx', subject: 'Cơ sở dữ liệu', date: '05/09/2026', size: '1.2 MB' },
  ]);

  const [attendanceList, setAttendanceList] = useState([
    { id: 1, name: 'Nguyễn Văn A', code: 'SV001', present: true },
    { id: 2, name: 'Trần Thị B', code: 'SV002', present: true },
    { id: 3, name: 'Lê Văn C', code: 'SV003', present: false },
    { id: 4, name: 'Phạm Thị D', code: 'SV004', present: true },
  ]);

  const [grades, setGrades] = useState([
    { id: 1, subject: 'Lập trình Web', processScore: '8.5', midterm: '8.0', final: '-', eval: 'Học tập tốt, năng nổ phát biểu' },
    { id: 2, subject: 'Cơ sở dữ liệu', processScore: '9.0', midterm: '8.5', final: '-', eval: 'Nắm vững kiến thức SQL' },
  ]);

  // --- FORM HANDLERS ---
  const handleAddAnnounce = (e) => {
    e.preventDefault();
    const form = e.target;
    const newAnn = {
      id: Date.now(),
      title: form.title.value,
      type: form.type.value,
      content: form.content.value,
      date: new Date().toLocaleDateString('vi-VN'),
    };
    setAnnouncements([newAnn, ...announcements]);
    setShowAnnounceModal(false);
    form.reset();
  };

  const handleAddSchedule = (e) => {
    e.preventDefault();
    const form = e.target;
    const newSch = {
      id: Date.now(),
      day: form.day.value,
      subject: form.subject.value,
      time: form.time.value,
      room: form.room.value,
    };
    setSchedule([...schedule, newSch]);
    setShowScheduleModal(false);
    form.reset();
  };

  const handleDeleteSchedule = (id) => {
    setSchedule(schedule.filter(item => item.id !== id));
  };

  const handleAddAssignment = (e) => {
    e.preventDefault();
    const form = e.target;
    const newAss = {
      id: Date.now(),
      title: form.title.value,
      deadline: form.deadline.value,
      desc: form.desc.value,
      status: 'Chưa nộp',
      score: '-',
      submission: null
    };
    setAssignments([newAss, ...assignments]);
    setShowAssignmentModal(false);
    form.reset();
  };

  const handleAddDocument = (e) => {
    e.preventDefault();
    const form = e.target;
    const newDoc = {
      id: Date.now(),
      title: form.title.value || 'Tài liệu học tập mới.pdf',
      subject: form.subject.value,
      date: new Date().toLocaleDateString('vi-VN'),
      size: '2.8 MB'
    };
    setDocuments([newDoc, ...documents]);
    setShowDocModal(false);
    form.reset();
  };

  const handleSubmitAssignment = (e) => {
    e.preventDefault();
    const fileName = e.target.file.files[0]?.name || 'Bài_làm_sinh_viên.zip';
    setAssignments(assignments.map(item => 
      item.id === selectedAssignment.id 
        ? { ...item, status: 'Đã nộp', submission: fileName } 
        : item
    ));
    setShowSubmitModal(false);
  };

  const toggleAttendance = (id) => {
    setAttendanceList(attendanceList.map(item => 
      item.id === id ? { ...item, present: !item.present } : item
    ));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Top Banner & Header */}
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
          <div className="flex items-center bg-indigo-700/60 p-1.5 rounded-lg border border-indigo-400/30">
            <span className="text-xs text-indigo-200 mr-2 font-medium">Chế độ xem:</span>
            <button 
              onClick={() => setRole('teacher')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition ${role === 'teacher' ? 'bg-white text-indigo-700 shadow' : 'text-indigo-100 hover:text-white'}`}
            >
              Giảng viên
            </button>
            <button 
              onClick={() => setRole('student')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition ${role === 'student' ? 'bg-white text-indigo-700 shadow' : 'text-indigo-100 hover:text-white'}`}
            >
              Sinh viên
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Bar */}
      <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 flex space-x-1 sm:space-x-4 overflow-x-auto">
          {[
            { id: 'announcements', label: 'Thông báo', icon: Bell },
            { id: 'schedule', label: 'Thời khóa biểu', icon: Calendar },
            { id: 'documents', label: 'Tài liệu học tập', icon: Upload },
            { id: 'assignments', label: 'Bài tập về nhà', icon: FileText },
            { id: 'attendance', label: 'Điểm danh', icon: CheckCircle2 },
            { id: 'grades', label: 'Đánh giá & Điểm', icon: Award },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-3.5 px-3 border-b-2 text-sm font-medium whitespace-nowrap transition ${
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

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 py-6">

        {/* 1. THÔNG BÁO */}
        {activeTab === 'announcements' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Thông Báo Lớp Học</h2>
                <p className="text-sm text-slate-500">Cập nhật tin tức quan trọng mới nhất</p>
              </div>
              {role === 'teacher' && (
                <button 
                  onClick={() => setShowAnnounceModal(true)}
                  className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition shadow-sm"
                >
                  <Send className="w-4 h-4" /> Đăng thông báo mới
                </button>
              )}
            </div>

            <div className="space-y-4">
              {announcements.map((item) => (
                <div key={item.id} className={`p-4 rounded-lg border ${item.type === 'important' ? 'bg-amber-50/50 border-amber-200' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      {item.type === 'important' && (
                        <span className="bg-amber-500 text-white text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded">
                          Quan trọng
                        </span>
                      )}
                      <h3 className="font-bold text-slate-800 text-base">{item.title}</h3>
                    </div>
                    <span className="text-xs text-slate-400">{item.date}</span>
                  </div>
                  <p className="text-sm text-slate-600 whitespace-pre-line">{item.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. THỜI KHÓA BIỂU */}
        {activeTab === 'schedule' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Thời Khóa Biểu Học Tập</h2>
                <p className="text-sm text-slate-500">Lịch học hàng tuần của các môn học</p>
              </div>
              {role === 'teacher' && (
                <button 
                  onClick={() => setShowScheduleModal(true)}
                  className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition shadow-sm"
                >
                  <Plus className="w-4 h-4" /> Thêm lịch học
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {schedule.map((item) => (
                <div key={item.id} className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 hover:shadow-md transition relative group">
                  {role === 'teacher' && (
                    <button 
                      onClick={() => handleDeleteSchedule(item.id)}
                      className="absolute top-3 right-3 text-slate-400 hover:text-rose-600 transition"
                      title="Xóa buổi học này"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  <span className="inline-block px-2.5 py-0.5 rounded text-xs font-bold bg-indigo-600 text-white mb-2">
                    {item.day}
                  </span>
                  <h3 className="font-bold text-slate-800 text-lg">{item.subject}</h3>
                  <div className="mt-3 text-xs text-slate-600 space-y-1.5">
                    <p className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-indigo-500" /> {item.time}</p>
                    <p className="flex items-center gap-1.5"><User className="w-4 h-4 text-indigo-500" /> Phòng học: <span className="font-semibold text-slate-700">{item.room}</span></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. TÀI LIỆU HỌC TẬP */}
        {activeTab === 'documents' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Kho Tài Liệu Học Tập</h2>
                <p className="text-sm text-slate-500">Giáo trình, bài giảng và tài liệu tham khảo</p>
              </div>
              {role === 'teacher' && (
                <button 
                  onClick={() => setShowDocModal(true)}
                  className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition shadow-sm"
                >
                  <FileUp className="w-4 h-4" /> Upload tài liệu
                </button>
              )}
            </div>

            <div className="divide-y divide-slate-100">
              {documents.map((doc) => (
                <div key={doc.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/80 p-2 rounded-lg transition">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center font-bold">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{doc.title}</p>
                      <p className="text-xs text-slate-500">{doc.subject} • Ngày tải lên: {doc.date} • {doc.size}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => alert(`Đang tải về tệp: ${doc.title}`)}
                    className="flex items-center justify-center gap-1.5 text-xs font-semibold text-indigo-600 border border-indigo-200 bg-indigo-50/50 hover:bg-indigo-100 px-3 py-2 rounded-lg transition"
                  >
                    <Download className="w-3.5 h-3.5" /> Tải về
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. BÀI TẬP VỀ NHÀ */}
        {activeTab === 'assignments' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Bài Tập Về Nhà</h2>
                <p className="text-sm text-slate-500">Quản lý bài tập và nộp bài trực tuyến</p>
              </div>
              {role === 'teacher' && (
                <button 
                  onClick={() => setShowAssignmentModal(true)}
                  className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition shadow-sm"
                >
                  <Plus className="w-4 h-4" /> Giao bài tập mới
                </button>
              )}
            </div>

            <div className="space-y-4">
              {assignments.map((item) => (
                <div key={item.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50/30 flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div>
                    <h3 className="font-bold text-slate-800 text-base">{item.title}</h3>
                    <p className="text-xs text-slate-600 mt-1">{item.desc}</p>
                    <p className="text-xs text-rose-500 font-medium mt-2 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Hạn nộp: {item.deadline}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 self-start md:self-center">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${item.status === 'Đã nộp' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                      {item.status}
                    </span>
                    <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-lg">
                      Điểm: {item.score}
                    </span>
                    {role === 'student' && (
                      <button 
                        onClick={() => { setSelectedAssignment(item); setShowSubmitModal(true); }}
                        className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-indigo-700 transition"
                      >
                        {item.status === 'Đã nộp' ? 'Nộp lại bài' : 'Nộp bài'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. ĐIỂM DANH */}
        {activeTab === 'attendance' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Điểm Danh Sinh Viên</h2>
                <p className="text-sm text-slate-500">Hôm nay: {new Date().toLocaleDateString('vi-VN')}</p>
              </div>
              {role === 'teacher' && (
                <button 
                  onClick={() => alert('Đã lưu dữ liệu điểm danh thành công!')}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition shadow-sm"
                >
                  Lưu kết quả điểm danh
                </button>
              )}
            </div>

            <div className="divide-y divide-slate-100">
              {attendanceList.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-bold text-sm">
                      {item.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{item.name}</p>
                      <p className="text-xs text-slate-400">{item.code}</p>
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
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.present ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                      {item.present ? 'Có mặt' : 'Vắng mặt'}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. BẢNG ĐIỂM & ĐÁNH GIÁ */}
        {activeTab === 'grades' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Kết Quả Học Tập & Đánh Giá</h2>
                <p className="text-sm text-slate-500">Bảng điểm và tổng hợp nhận xét của Giảng viên</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-700">
                    <th className="p-3.5 font-semibold">Môn học</th>
                    <th className="p-3.5 font-semibold">Điểm quá trình</th>
                    <th className="p-3.5 font-semibold">Giữa kỳ</th>
                    <th className="p-3.5 font-semibold">Cuối kỳ</th>
                    <th className="p-3.5 font-semibold">Đánh giá / Nhận xét của GV</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {grades.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/60 transition">
                      <td className="p-3.5 font-bold text-slate-800">{item.subject}</td>
                      <td className="p-3.5 font-bold text-indigo-600">{item.processScore}</td>
                      <td className="p-3.5 font-bold text-indigo-600">{item.midterm}</td>
                      <td className="p-3.5 text-slate-400">{item.final}</td>
                      <td className="p-3.5 text-slate-600 italic">{item.eval}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

      {/* --- POPUP MODALS --- */}

      {/* 1. Modal Thêm Thông Báo */}
      {showAnnounceModal && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-slate-800">Đăng Thông Báo Mới</h3>
              <button onClick={() => setShowAnnounceModal(false)}><X className="w-5 h-5 text-slate-400 hover:text-slate-600" /></button>
            </div>
            <form onSubmit={handleAddAnnounce} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Tiêu đề thông báo</label>
                <input required name="title" type="text" placeholder="Nhập tiêu đề..." className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:border-indigo-600" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Loại thông báo</label>
                <select name="type" className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:border-indigo-600">
                  <option value="normal">Bình thường</option>
                  <option value="important">Quan trọng</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Nội dung chi tiết</label>
                <textarea required name="content" rows="4" placeholder="Nhập nội dung thông báo..." className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:border-indigo-600"></textarea>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowAnnounceModal(false)} className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg">Hủy</button>
                <button type="submit" className="px-4 py-2 text-xs font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Đăng ngay</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Modal Thêm Thời Khóa Biểu */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-slate-800">Thêm Buổi Học Mới</h3>
              <button onClick={() => setShowScheduleModal(false)}><X className="w-5 h-5 text-slate-400 hover:text-slate-600" /></button>
            </div>
            <form onSubmit={handleAddSchedule} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Thứ trong tuần</label>
                <select name="day" className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:border-indigo-600">
                  <option value="Thứ 2">Thứ 2</option>
                  <option value="Thứ 3">Thứ 3</option>
                  <option value="Thứ 4">Thứ 4</option>
                  <option value="Thứ 5">Thứ 5</option>
                  <option value="Thứ 6">Thứ 6</option>
                  <option value="Thứ 7">Thứ 7</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Tên môn học</label>
                <input required name="subject" type="text" placeholder="Ví dụ: Lập trình React" className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:border-indigo-600" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Thời gian</label>
                  <input required name="time" type="text" placeholder="08:00 - 10:30" className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:border-indigo-600" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Phòng học</label>
                  <input required name="room" type="text" placeholder="A101" className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:border-indigo-600" />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowScheduleModal(false)} className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg">Hủy</button>
                <button type="submit" className="px-4 py-2 text-xs font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Lưu buổi học</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Modal Upload Tài Liệu */}
      {showDocModal && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-slate-800">Upload Tài Liệu Mới</h3>
              <button onClick={() => setShowDocModal(false)}><X className="w-5 h-5 text-slate-400 hover:text-slate-600" /></button>
            </div>
            <form onSubmit={handleAddDocument} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Tên tài liệu / Slide</label>
                <input required name="title" type="text" placeholder="Slide bài giảng Chương 2..." className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:border-indigo-600" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Thuộc môn học</label>
                <input required name="subject" type="text" placeholder="Lập trình Web" className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:border-indigo-600" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Chọn tệp tài liệu (PDF, PPTX, DOCX)</label>
                <input type="file" required className="w-full text-xs text-slate-500 border border-slate-300 rounded-lg p-2 cursor-pointer bg-slate-50" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowDocModal(false)} className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg">Hủy</button>
                <button type="submit" className="px-4 py-2 text-xs font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Tải lên ngay</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Modal Giao Bài Tập */}
      {showAssignmentModal && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-slate-800">Giao Bài Tập Mới</h3>
              <button onClick={() => setShowAssignmentModal(false)}><X className="w-5 h-5 text-slate-400 hover:text-slate-600" /></button>
            </div>
            <form onSubmit={handleAddAssignment} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Tiêu đề bài tập</label>
                <input required name="title" type="text" placeholder="Bài tập 3..." className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:border-indigo-600" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Hạn nộp</label>
                <input required name="deadline" type="text" placeholder="30/10/2026" className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:border-indigo-600" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Mô tả bài tập</label>
                <textarea required name="desc" rows="3" placeholder="Yêu cầu chi tiết..." className="w-full border border-slate-300 rounded-lg p-2.5 text-sm outline-none focus:border-indigo-600"></textarea>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowAssignmentModal(false)} className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg">Hủy</button>
                <button type="submit" className="px-4 py-2 text-xs font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Giao bài</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Modal Sinh Viên Nộp Bài */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-slate-800">Nộp Bài Tập</h3>
              <button onClick={() => setShowSubmitModal(false)}><X className="w-5 h-5 text-slate-400 hover:text-slate-600" /></button>
            </div>
            <form onSubmit={handleSubmitAssignment} className="space-y-4">
              <p className="text-xs text-slate-600 font-semibold">{selectedAssignment?.title}</p>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Chọn tệp bài làm (.zip, .pdf, .docx)</label>
                <input required name="file" type="file" className="w-full text-xs text-slate-500 border border-slate-300 rounded-lg p-2 bg-slate-50 cursor-pointer" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowSubmitModal(false)} className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg">Hủy</button>
                <button type="submit" className="px-4 py-2 text-xs font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Gửi bài nộp</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}