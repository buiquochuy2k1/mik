// Utility functions
function createMessage(violation) {
  return violation
    .map((item) =>
      Object.keys(item)
        .map((key) => `${key}: ${Array.isArray(item[key]) ? item[key].join('\n') : item[key]}`)
        .join('\n')
    )
    .join('\n\n');
}

function formatLicensePlate(bienSoXe) {
  bienSoXe = bienSoXe.toUpperCase();
  const formatted = bienSoXe.replace(/(\d{2}[A-Z]{1}\d{1})(\d{1})(\d{3})(\d{2})/, '$1-$2$3$4');
  return formatted;
}

// Render only the summary boxes
function renderSummaryBoxes(violationArr, licensePlate) {
  const total = violationArr.length;
  const paid = violationArr.filter((v) =>
    (v['Trạng thái'] || '').toLowerCase().includes('đã xử phạt')
  ).length;
  const unpaid = total - paid;
  return `
    <div class="flex flex-wrap justify-center gap-4 mb-4">
      <div class="bg-[#181A24] rounded-xl px-8 py-4 flex flex-col items-center border border-blue-700 min-w-[120px]">
        <span class="text-2xl font-bold text-blue-400">${total}</span>
        <span class="text-gray-300 text-sm mt-1">Tổng vi phạm</span>
      </div>
      <div class="bg-[#181A24] rounded-xl px-8 py-4 flex flex-col items-center border border-gray-700 min-w-[120px]">
        <span class="text-2xl font-bold text-yellow-400">${unpaid}</span>
        <span class="text-gray-300 text-sm mt-1">Chưa nộp phạt</span>
      </div>
      <div class="bg-[#181A24] rounded-xl px-8 py-4 flex flex-col items-center border border-green-700 min-w-[120px]">
        <span class="text-2xl font-bold text-green-400">${paid}</span>
        <span class="text-gray-300 text-sm mt-1">Đã nộp phạt</span>
      </div>
    </div>
    <div class="flex justify-center mb-6">
      <span class="inline-flex items-center gap-2 font-bold text-lg text-blue-200 bg-blue-900/40 px-5 py-2 rounded-xl border border-blue-700 shadow">
        <i class="bx bx-car text-yellow-400 text-xl"></i>
        ${licensePlate}
      </span>
    </div>
  `;
}

// Render only the table for violation data
function renderViolationTable(violationArr) {
  const tableHeader = `
    <thead>
      <tr class="bg-[#23262F] text-blue-400 text-sm">
        <th class="py-2 px-3 text-left">#</th>
        <th class="py-2 px-3 text-left">Trạng thái</th>
        <th class="py-2 px-3 text-left">Thời gian</th>
        <th class="py-2 px-3 text-left">Địa điểm</th>
        <th class="py-2 px-3 text-left">Lỗi vi phạm</th>
        <th class="py-2 px-3 text-left">Đơn vị xử lý</th>
      </tr>
    </thead>
  `;
  const tableRows = violationArr
    .map(
      (item, idx) => `
    <tr class="border-b border-gray-700 hover:bg-[#23262F] transition">
      <td class="py-2 px-3 text-gray-400">${idx + 1}</td>
      <td class="py-2 px-3">
        <span class="inline-block px-2 py-1 rounded text-xs font-bold ${
          (item['Trạng thái'] || '').toLowerCase().includes('đã xử phạt')
            ? 'bg-green-700 text-green-300'
            : 'bg-yellow-700 text-yellow-300'
        }">
          ${item['Trạng thái'] || ''}
        </span>
      </td>
      <td class="py-2 px-3 text-white">${item['Thời gian vi phạm'] || ''}</td>
      <td class="py-2 px-3 text-white">${item['Địa điểm vi phạm'] || ''}</td>
      <td class="py-2 px-3 text-white">${item['Hành vi vi phạm'] || ''}</td>
      <td class="py-2 px-3 text-white">${item['Đơn vị phát hiện vi phạm'] || ''}</td>
    </tr>
  `
    )
    .join('');

  return `
    <div class="overflow-x-auto rounded-xl border border-blue-700 w-full custom-scrollbar">
      <table class="min-w-full text-sm">
        ${tableHeader}
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    </div>
  `;
}

// API call function
async function fetchData(bienSoXe) {
  const url = 'https://api.checkphatnguoi.vn/phatnguoi';
  const resultBox = document.getElementById('ticket-result');
  const detailsBox = document.getElementById('ticket-details');

  const payload = new URLSearchParams();
  for (let key in bienSoXe) {
    payload.append(key, bienSoXe[key]);
  }

  //   console.log('Request payload:', Object.fromEntries(payload));

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: payload,
    });

    const data = await response.json();
    // console.log('API Response:', data);
    // console.log('Response status:', response.status);
    // console.log('Response headers:', Object.fromEntries(response.headers));

    if (data && data.data) {
      const violationData = data.data;
      //   console.log('Violation data:', violationData);
      // Render summary boxes and license plate badge above
      const licensePlate = formatLicensePlate(bienSoXe.bienso);
      document.getElementById('violation-summary').innerHTML = renderSummaryBoxes(
        violationData,
        licensePlate
      );
      // Render only the table in the result area
      detailsBox.innerHTML = renderViolationTable(violationData);
      resultBox.classList.remove('hidden');
    } else {
      //   console.log('No violation data found');
      const formattedPlate = formatLicensePlate(bienSoXe.bienso);
      detailsBox.innerHTML = `
                <div class="text-center py-4">
                    <i class="bx bx-check-circle text-green-500 text-4xl mb-2"></i>
                    <p class="text-gray-300">Không tìm thấy dữ liệu phạt cho biển số: ${formattedPlate}</p>
                </div>
            `;
      resultBox.classList.remove('hidden');
    }
  } catch (error) {
    //console.error('API Error:', error);
    // console.error('Error details:', {
    //   message: error.message,
    //   stack: error.stack,
    //   name: error.name,
    // });
    detailsBox.innerHTML = `
            <div class="text-center py-4">
                <i class="bx bx-error-circle text-red-500 text-4xl mb-2"></i>
                <p class="text-gray-300">Lỗi: ${error.message}</p>
            </div>
        `;
    resultBox.classList.remove('hidden');
  }
}

// Main function to handle the check
async function checkPhatNguoi() {
  const bienSoXeInput = document.getElementById('ticket-number').value.trim();

  if (!bienSoXeInput) {
    Swal.fire({
      icon: 'warning',
      title: 'Cảnh báo!',
      text: 'Vui lòng nhập biển số xe.',
      confirmButtonColor: '#2563eb',
    });
    return;
  }

  const bienSoXe = {
    bienso: bienSoXeInput,
  };

  // Show loading state
  const resultBox = document.getElementById('ticket-result');
  const detailsBox = document.getElementById('ticket-details');
  resultBox.classList.remove('hidden');
  detailsBox.innerHTML = `
        <div class="flex items-center justify-center py-4">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
    `;

  await fetchData(bienSoXe);
}

// Event listener setup
document.addEventListener('DOMContentLoaded', function () {
  const ticketCheck = document.getElementById('ticket-check');
  if (ticketCheck) {
    ticketCheck.addEventListener('click', checkPhatNguoi);
  }
});
