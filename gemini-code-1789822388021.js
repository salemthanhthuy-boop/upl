// Dữ liệu mặc định ban đầu
const initialAssignments = [
  { id: 1, title: "Bài tập lớn Tuần 1: Thiết kế Giao diện", deadline: "2026-09-30T23:59", desc: "Sinh viên nộp báo cáo kèm file demo hoặc link github." }
];

const initialSubmissions = [
  {
    id: "SV001",
    name: "Nguyễn Văn An",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    fileName: "BaoCao_Tuan1_NguyenVanAn.pdf",
    textSubmission: "Em đã làm xong phần giao diện và gửi link github trong bài: https://github.com/example/edumanage-demo",
    submittedAt: "2026-09-18 14:20",
    score: null
  },
  {
    id: "SV002",
    name: "Trần Thị Bích",
    fileUrl: "",
    fileName: "",
    textSubmission: "Thưa thầy/cô, em trả lời trực tiếp nội dung bài tập tại đây ạ.",
    submittedAt: "2026-09-18 16:45",
    score: 8.5
  }
];

// Quản lý trạng thái qua LocalStorage
let assignments = JSON.parse(localStorage.getItem('edu2_assignments')) || initialAssignments;
let submissions = JSON.parse(localStorage.getItem('edu2_submissions')) || initialSubmissions;

function saveData() {
  localStorage.setItem('edu2_assignments', JSON.stringify(assignments));
  localStorage.setItem('edu2_submissions', JSON.stringify(submissions));
}

// 1. Render Bài Tập
function renderAssignments() {
  const list = document.getElementById('assignmentList');
  list.innerHTML = "";

  if (assignments.length === 0) {
    list.innerHTML = `<div class="text-center text-muted py-3">Chưa có bài tập nào được tạo.</div>`;
    return;
  }

  assignments.forEach((item) => {
    const div = document.createElement('div');
    div.className = "list-group-item list-group-item-action d-flex justify-content-between align-items-start p-3";
    div.innerHTML = `
      <div class="ms-2 me-auto">
        <div class="fw-bold text-primary fs-6">${item.title}</div>
        <div class="text-secondary small mt-1">${item.desc}</div>
      </div>
      <span class="badge bg-warning text-dark"><i class="bi bi-clock me-1"></i>Hạn: ${item.deadline.replace('T', ' ')}</span>
    `;
    list.appendChild(div);
  });
}

// 2. Render Bài Nộp & Chấm Điểm
function renderSubmissions() {
  const tbody = document.getElementById("submissionList");
  tbody.innerHTML = "";

  submissions.forEach((item, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${item.id}</strong></td>
      <td><strong>${item.name}</strong></td>
      <td>
        <button class="btn btn-sm btn-outline-primary me-2" onclick="openSubmissionModal(${index})">
          <i class="bi bi-eye"></i> Xem bài nộp
        </button>
        ${item.fileName ? `<a href="${item.fileUrl}" target="_blank" class="small text-decoration-none"><i class="bi bi-paperclip"></i> ${item.fileName}</a>` : ''}
      </td>
      <td><small class="text-muted">${item.submittedAt}</small></td>
      <td>
        <input type="number" class="form-control form-control-sm text-center" 
               id="score-input-${index}" min="0" max="10" step="0.25" 
               value="${item.score !== null ? item.score : ''}" placeholder="--">
      </td>
      <td class="text-center">
        <button class="btn btn-sm btn-success" onclick="saveScore(${index})">
          <i class="bi bi-save"></i> Lưu điểm
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// 3. Xử lý Tạo bài tập mới
document.getElementById('createAssignmentForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const newAssign = {
    id: Date.now(),
    title: document.getElementById('assignTitle').value,
    deadline: document.getElementById('assignDeadline').value,
    desc: document.getElementById('assignDesc').value
  };

  assignments.push(newAssign);
  saveData();
  renderAssignments();
  this.reset();
  alert("Đã thêm bài tập mới vào EduManage Pro v2!");
});

// 4. Mở Modal Xem Bài Nộp Chi Tiết
function openSubmissionModal(index) {
  const item = submissions[index];
  document.getElementById("modalStudentName").innerText = `Bài làm của: ${item.name} (${item.id})`;
  
  const modalBody = document.getElementById("modalSubmissionContent");
  modalBody.innerHTML = `
    <p><strong>Thời gian nộp:</strong> ${item.submittedAt}</p>
    <div class="mb-3">
      <h6>Ghi chú / Nội dung bài làm:</h6>
      <div class="submission-box">${item.textSubmission || "Không có nội dung mô tả."}</div>
    </div>
    ${item.fileUrl ? `
      <div>
        <h6>File đính kèm (Xem trực tiếp):</h6>
        <iframe src="${item.fileUrl}" class="preview-frame"></iframe>
      </div>
    ` : '<p class="text-muted">Sinh viên không nộp file đính kèm.</p>'}
  `;

  const modal = new bootstrap.Modal(document.getElementById('viewSubmissionModal'));
  modal.show();
}

// 5. Lưu Điểm Số
function saveScore(index) {
  const input = document.getElementById(`score-input-${index}`);
  const val = parseFloat(input.value);

  if (isNaN(val) || val < 0 || val > 10) {
    alert("Vui lòng nhập điểm hợp lệ từ 0 đến 10!");
    return;
  }

  submissions[index].score = val;
  saveData();
  alert(`Đã lưu điểm ${val} cho sinh viên ${submissions[index].name}!`);
  renderSubmissions();
}

// 6. Xuất Bảng Điểm CSV
function exportGradingCSV() {
  let csvContent = "data:text/csv;charset=utf-8,Ma SV,Ho Ten,Thoi Gian Nop,Diem So\n";
  submissions.forEach(s => {
    csvContent += `${s.id},${s.name},${s.submittedAt},${s.score !== null ? s.score : "Chua cham"}\n`;
  });
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "EduManage_Pro_v2_BangDiem.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Khởi chạy khi load trang
document.addEventListener("DOMContentLoaded", () => {
  renderAssignments();
  renderSubmissions();
});