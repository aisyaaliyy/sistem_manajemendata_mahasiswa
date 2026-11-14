import { useState, useEffect } from "react";
import "./App.css";

const initialStudents = [
  { id: 1, nim: "2301001", nama: "Andi Saputra", noHp: "081234567801", email: "andi@mail.com", alamat: "Surabaya", prodi: "Informatika", tahunMasuk: 2023 },
  { id: 2, nim: "2301002", nama: "Budi Santoso", noHp: "081234567802", email: "budi@mail.com", alamat: "Malang", prodi: "Sistem Informasi", tahunMasuk: 2023 },
  { id: 3, nim: "2301003", nama: "Citra Amelia", noHp: "081234567803", email: "citra@mail.com", alamat: "Lumajang", prodi: "Informatika", tahunMasuk: 2023 },
  { id: 4, nim: "2401001", nama: "Dinda Putri", noHp: "081234567804", email: "dinda@mail.com", alamat: "Jember", prodi: "Manajemen", tahunMasuk: 2024 },
  { id: 5, nim: "2401002", nama: "Eko Pratama", noHp: "081234567805", email: "eko@mail.com", alamat: "Kediri", prodi: "Informatika", tahunMasuk: 2024 },
];

const PAGE_SIZE = 5;

function Icon({ children, size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const icons = {
  book: (
    <>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </>
  ),
  users: (
    <>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </>
  ),
  list: (
    <>
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </>
  ),
  filter: <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />,
};

function App() {
  const [students] = useState(initialStudents);

  const [currentTime, setCurrentTime] = useState(new Date());

  const [search, setSearch] = useState("");
  const [prodiFilter, setProdiFilter] = useState("Semua");
  const [showFilter, setShowFilter] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedDate = currentTime.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const pad = (n) => String(n).padStart(2, "0");
  const formattedTime = [
    pad(currentTime.getHours()),
    pad(currentTime.getMinutes()),
    pad(currentTime.getSeconds()),
  ].join(" . ");

  const prodiOptions = ["Semua", ...new Set(students.map((s) => s.prodi))];

  const keyword = search.trim().toLowerCase();
  const filteredStudents = students.filter(
    (s) =>
      (prodiFilter === "Semua" || s.prodi === prodiFilter) &&
      (s.nama.toLowerCase().includes(keyword) || s.nim.includes(keyword))
  );

  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / PAGE_SIZE));
  const startIndex = (page - 1) * PAGE_SIZE;
  const pagedStudents = filteredStudents.slice(startIndex, startIndex + PAGE_SIZE);
  const showingFrom = filteredStudents.length === 0 ? 0 : startIndex + 1;
  const showingTo = startIndex + pagedStudents.length;

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleFilter = (value) => {
    setProdiFilter(value);
    setShowFilter(false);
    setPage(1);
  };

  return (
    <div className="page">
      <div className="shell">
        <header className="topbar">
          <div className="brand">
            <div className="brand-icon">
              <Icon size={28}>{icons.book}</Icon>
            </div>
            <div className="brand-text">
              <h1>Student Management</h1>
              <p>Daftar Data Mahasiswa</p>
            </div>
          </div>

          <div className="topbar-actions">
            <div className="user-chip">
              <span className="avatar">A</span>
              <span>Aisyaaliy</span>
            </div>
          </div>
        </header>

        <section className="stats">
          <div className="stat-card primary">
            <div className="stat-icon">
              <Icon size={30}>{icons.users}</Icon>
            </div>
            <div className="stat-text">
              <span className="stat-label">Jumlah Mahasiswa</span>
              <span className="stat-value">{students.length} Mahasiswa</span>
            </div>
            <div className="stat-deco">
              <Icon size={120}>{icons.users}</Icon>
            </div>
          </div>

          <div className="stat-card clock-card">
            <div className="stat-icon light">
              <Icon size={30}>{icons.calendar}</Icon>
            </div>
            <div className="stat-text">
              <span className="stat-date">{formattedDate}</span>
              <span className="stat-value clock-time">{formattedTime}</span>
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="panel-head">
            <div className="panel-title">
              <Icon size={20}>{icons.list}</Icon>
              <h2>Data Mahasiswa</h2>
            </div>

            <div className="toolbar">
              <label className="search">
                <Icon size={18}>{icons.search}</Icon>
                <input
                  type="text"
                  placeholder="Cari nama atau NIM..."
                  value={search}
                  onChange={handleSearch}
                />
              </label>

              <div className="filter-wrap">
                <button
                  className={`filter-btn ${prodiFilter !== "Semua" ? "active" : ""}`}
                  onClick={() => setShowFilter(!showFilter)}
                  aria-label="Filter program studi"
                >
                  <Icon size={18}>{icons.filter}</Icon>
                </button>

                {showFilter && (
                  <ul className="filter-menu">
                    {prodiOptions.map((option) => (
                      <li key={option}>
                        <button
                          className={option === prodiFilter ? "selected" : ""}
                          onClick={() => handleFilter(option)}
                        >
                          {option}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div className="table-scroll">
            <table className="student-table">
              <thead>
                <tr>
                  <th>NIM</th>
                  <th>Nama Mahasiswa</th>
                  <th>No. Hp</th>
                  <th>Email</th>
                  <th>Alamat</th>
                  <th>Program Studi</th>
                  <th className="center">Tahun Masuk</th>
                </tr>
              </thead>
              <tbody>
                {pagedStudents.map((student) => (
                  <tr key={student.id}>
                    <td>{student.nim}</td>
                    <td>{student.nama}</td>
                    <td>{student.noHp}</td>
                    <td>
                      <a href={`mailto:${student.email}`}>{student.email}</a>
                    </td>
                    <td>{student.alamat}</td>
                    <td>{student.prodi}</td>
                    <td className="center">{student.tahunMasuk}</td>
                  </tr>
                ))}

                {filteredStudents.length === 0 && (
                  <tr>
                    <td colSpan={7} className="empty">
                      Data mahasiswa tidak ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="panel-foot">
            <span>
              Menampilkan {showingFrom}–{showingTo} dari {filteredStudents.length} data
            </span>

            <div className="pagination">
              <button
                className="page-btn"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                aria-label="Halaman sebelumnya"
              >
                ‹
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  className={`page-btn ${page === i + 1 ? "current" : ""}`}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="page-btn"
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                aria-label="Halaman berikutnya"
              >
                ›
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;