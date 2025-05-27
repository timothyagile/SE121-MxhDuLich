import React, { useEffect, useState } from 'react';

const initialForm = {
  code: '',
  description: '',
  discountType: 'direct',
  discountAmount: '',
  maxDiscount: '',
  minOderValue: '',
  startDate: '',
  endDate: '',
  maxUse: '',
  maxUsePerUser: '',
  productApplied: '', // comma separated string for simplicity
  status: 'active',
  source: 'system',
  locationId: '',
};

const VoucherBusinessScreen = () => {
  const [vouchers, setVouchers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [locations, setLocations] = useState([]);

  const fetchVouchers = async () => {
    try {
      const userId = localStorage.getItem('userId');
      // Lấy tất cả location của owner
      const resLoc = await fetch(`http://localhost:3000/locationbyuserid/${userId}`);
      const dataLoc = await resLoc.json();
      const locationsArr = dataLoc?.data && dataLoc.data.length ? dataLoc.data : [];
      // Lấy voucher của từng location
      let allVouchers = [];
      for (const loc of locationsArr) {
        const resVoucher = await fetch(`http://localhost:3000/voucher/getbylocationid/${loc._id}`);
        const dataVoucher = await resVoucher.json();
        if (dataVoucher?.data && dataVoucher.data.length) {
          allVouchers = allVouchers.concat(dataVoucher.data);
        }
      }
      setVouchers(allVouchers);
    } catch (err) {
      setVouchers([]);
    }
  };

  // Lấy danh sách location của owner
  const fetchLocations = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const res = await fetch(`http://localhost:3000/locationbyuserid/${userId}`);
      const data = await res.json();
      setLocations(data?.data && data.data.length ? data.data : []);
    } catch (err) {
      setLocations([]);
    }
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  const openAddModal = () => {
    setForm({ ...initialForm, source: 'location' });
    setEditingId(null);
    setShowModal(true);
    setError('');
    fetchLocations();
  };

  const openEditModal = (voucher) => {
    setForm({
      code: voucher.code || '',
      description: voucher.description || '',
      discountType: voucher.discount?.type || 'direct',
      discountAmount: voucher.discount?.amount || '',
      maxDiscount: voucher.maxDiscount || '',
      minOderValue: voucher.minOderValue || '',
      startDate: voucher.startDate ? voucher.startDate.slice(0, 10) : '',
      endDate: voucher.endDate ? voucher.endDate.slice(0, 10) : '',
      maxUse: voucher.maxUse || '',
      maxUsePerUser: voucher.maxUsePerUser || '',
      productApplied: voucher.productApplied ? voucher.productApplied.join(',') : '',
      status: voucher.status || 'active',
      source: voucher.source || 'location',
      locationId: voucher.locationId || '',
    });
    setEditingId(voucher._id);
    setShowModal(true);
    setError('');
    fetchLocations();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa voucher này?')) return;
    setLoading(true);
    try {
      await fetch(`http://localhost:3000/voucher/delete/${id}`, { method: 'DELETE' });
      await fetchVouchers();
    } catch (e) {
      setError('Lỗi khi xóa voucher');
    }
    setLoading(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const userId = localStorage.getItem('userId');
    // Build payload theo chuẩn backend
    const payload = {
      source: form.source,
      locationId: form.locationId || undefined,
      description: form.description,
      discount: {
        type: form.discountType,
        amount: Number(form.discountAmount)
      },
      maxDiscount: Number(form.maxDiscount),
      code: form.code,
      startDate: form.startDate,
      endDate: form.endDate,
      maxUse: Number(form.maxUse),
      maxUsePerUser: Number(form.maxUsePerUser),
      minOderValue: Number(form.minOderValue),
      productApplied: form.productApplied ? form.productApplied.split(',').map(s => s.trim()).filter(Boolean) : [],
      status: form.status,
    };
    if (form.source !== 'system' && !form.locationId) {
      setError('Vui lòng nhập locationId cho voucher loại location');
      setLoading(false);
      return;
    }
    try {
      if (editingId) {
        await fetch(`http://localhost:3000/voucher/update/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        console.log('Creating voucher with payload:', JSON.stringify(payload));
        await fetch('http://localhost:3000/voucher/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          credentials: 'include',
        });
      }
      setShowModal(false);
      await fetchVouchers();
    } catch (e) {
      setError('Lỗi khi lưu voucher');
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="containerformobile">
        <div className="containerlistbusiness widthlistbusiness">
          <h2 className="text-xl font-bold mb-4 flex justify-between items-center">
            Danh sách Voucher
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={openAddModal}>
              Thêm voucher
            </button>
          </h2>
          <table className="min-w-[350px] bg-white rounded shadow border mb-6">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Mã voucher</th>
                <th className="px-4 py-2 border">Giảm giá</th>
                <th className="px-4 py-2 border">Ngày bắt đầu</th>
                <th className="px-4 py-2 border">Ngày kết thúc</th>
                <th className="px-4 py-2 border">Trạng thái</th>
                <th className="px-4 py-2 border">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {vouchers.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-4">Chưa có voucher nào</td></tr>
              ) : (
                vouchers.map((v, idx) => {
                  // Format discount
                  let discountDisplay = '';
                  if (v.discount?.type === 'percentage') {
                    discountDisplay = v.discount.amount + '%';
                  } else if (v.discount?.type === 'direct') {
                    discountDisplay = v.discount.amount?.toLocaleString('vi-VN') + ' đ';
                  } else {
                    discountDisplay = '-';
                  }
                  // Status badge
                  let statusClass = 'bg-gray-200 text-gray-700';
                  let statusText = 'Chưa kích hoạt';
                  if (v.status === 'active') {
                    statusClass = 'bg-green-100 text-green-700';
                    statusText = 'Kích hoạt';
                  } else if (v.status === 'inactive') {
                    statusClass = 'bg-gray-200 text-gray-700';
                    statusText = 'Chưa kích hoạt';
                  } else if (v.status === 'expried' || v.status === 'expired') {
                    statusClass = 'bg-red-100 text-red-700';
                    statusText = 'Hết hạn';
                  }
                  return (
                    <tr key={v._id || idx}>
                      <td className="px-4 py-2 border">{v.code}</td>
                      <td className="px-4 py-2 border">{discountDisplay}</td>
                      <td className="px-4 py-2 border">{v.startDate ? new Date(v.startDate).toLocaleDateString('vi-VN') : ''}</td>
                      <td className="px-4 py-2 border">{v.endDate ? new Date(v.endDate).toLocaleDateString('vi-VN') : ''}</td>
                      <td className={`px-4 py-2 border`}>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${statusClass}`}>{statusText}</span>
                      </td>
                      <td className="px-4 py-2 border">
                        <button
                          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 mr-2"
                          title="Sửa"
                          onClick={() => openEditModal(v)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-6 6m-2 2h2v2H7v-2h2zm0 0v-2h2v2H9z" /></svg>
                        </button>
                        <button
                          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 text-red-600"
                          title="Xóa"
                          onClick={() => handleDelete(v._id)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>

          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-40 z-50">
              <div className="bg-white p-6 rounded shadow-lg min-w-[320px] max-w-[95vw] w-[400px]">
                <h3 className="text-lg font-bold mb-4">{editingId ? 'Chỉnh sửa' : 'Thêm'} Voucher</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-2">
                    <label className="block mb-1">Mã voucher</label>
                    <input name="code" value={form.code} onChange={handleFormChange} className="border p-2 rounded w-full" required />
                  </div>
                  <div className="mb-2">
                    <label className="block mb-1">Mô tả</label>
                    <input name="description" value={form.description} onChange={handleFormChange} className="border p-2 rounded w-full" required />
                  </div>
                  <div className="mb-2 flex gap-2">
                    <div className="flex-1">
                      <label className="block mb-1">Loại giảm giá</label>
                      <select name="discountType" value={form.discountType} onChange={handleFormChange} className="border p-2 rounded w-full">
                        <option value="direct">Trực tiếp (VNĐ)</option>
                        <option value="percentage">Phần trăm (%)</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="block mb-1">Số tiền/Phần trăm</label>
                      <input name="discountAmount" type="number" value={form.discountAmount} onChange={handleFormChange} className="border p-2 rounded w-full" required />
                    </div>
                  </div>
                  <div className="mb-2">
                    <label className="block mb-1">Giảm tối đa (VNĐ)</label>
                    <input name="maxDiscount" type="number" value={form.maxDiscount} onChange={handleFormChange} className="border p-2 rounded w-full" required />
                  </div>
                  <div className="mb-2">
                    <label className="block mb-1">Giá trị đơn tối thiểu (VNĐ)</label>
                    <input name="minOderValue" type="number" value={form.minOderValue} onChange={handleFormChange} className="border p-2 rounded w-full" required />
                  </div>
                  <div className="mb-2 flex gap-2">
                    <div className="flex-1">
                      <label className="block mb-1">Số lượt dùng tối đa</label>
                      <input name="maxUse" type="number" value={form.maxUse} onChange={handleFormChange} className="border p-2 rounded w-full" required />
                    </div>
                    <div className="flex-1">
                      <label className="block mb-1">Số lượt dùng mỗi user</label>
                      <input name="maxUsePerUser" type="number" value={form.maxUsePerUser} onChange={handleFormChange} className="border p-2 rounded w-full" required />
                    </div>
                  </div>
                  <div className="mb-2">
                    <label className="block mb-1">Áp dụng cho sản phẩm (ID, cách nhau dấu phẩy, để trống = tất cả)</label>
                    <input name="productApplied" value={form.productApplied} onChange={handleFormChange} className="border p-2 rounded w-full" />
                  </div>
                  <div className="mb-2 flex gap-2">
                    <div className="flex-1">
                      <label className="block mb-1">Ngày bắt đầu</label>
                      <input name="startDate" type="date" value={form.startDate} onChange={handleFormChange} className="border p-2 rounded w-full" required />
                    </div>
                    <div className="flex-1">
                      <label className="block mb-1">Ngày kết thúc</label>
                      <input name="endDate" type="date" value={form.endDate} onChange={handleFormChange} className="border p-2 rounded w-full" required />
                    </div>
                  </div>
                  <div className="mb-2 flex gap-2">
                    <div className="flex-1">
                      <label className="block mb-1">Trạng thái</label>
                      <select name="status" value={form.status} onChange={handleFormChange} className="border p-2 rounded w-full">
                        <option value="active">Kích hoạt</option>
                        <option value="inactive">Chưa kích hoạt</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="block mb-1">Loại voucher</label>
                      <select name="source" value={form.source} onChange={handleFormChange} className="border p-2 rounded w-full">
                        <option value="system">Hệ thống</option>
                        <option value="location">Địa điểm</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-2">
                    <label className="block mb-1">Địa điểm áp dụng</label>
                    <select
                      name="locationId"
                      value={form.locationId}
                      onChange={handleFormChange}
                      className="border p-2 rounded w-full"
                      required
                    >
                      <option value="">Chọn địa điểm</option>
                      {locations.map((loc) => (
                        <option key={loc._id} value={loc._id}>{loc.name}</option>
                      ))}
                    </select>
                  </div>
                  {error && <div className="text-red-500 mb-2">{error}</div>}
                  <div className="flex justify-end gap-2 mt-4">
                    <button type="button" className="px-4 py-2 bg-gray-300 rounded" onClick={() => setShowModal(false)} disabled={loading}>Hủy</button>
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded" disabled={loading}>{loading ? 'Đang lưu...' : 'Lưu'}</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoucherBusinessScreen;
