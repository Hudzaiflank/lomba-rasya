# 💰 FinEdu - Platform Edukasi Keuangan untuk Siswa SMP

<div align="center">

![FinEdu Logo](https://img.shields.io/badge/FinEdu-Financial_Education-success?style=for-the-badge)
[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge)](https://hudzaiflank.github.io/lomba-rasya/)
[![GitHub Pages](https://img.shields.io/badge/Deployed-GitHub_Pages-green?style=for-the-badge&logo=github)](https://hudzaiflank.github.io/lomba-rasya/)

**Platform edukasi keuangan interaktif yang dirancang khusus untuk membantu siswa SMP belajar mengelola uang jajan, menabung, dan mencapai tujuan finansial mereka.**

[🌐 Live Demo](https://hudzaiflank.github.io/lomba-rasya/) | [📖 Dokumentasi](#dokumentasi) | [🚀 Installation](#instalasi)

</div>

---

## 📋 Daftar Isi

- [Tentang Proyek](#-tentang-proyek)
- [Fitur Utama](#-fitur-utama)
- [Teknologi](#-teknologi-yang-digunakan)
- [Demo](#-demo-aplikasi)
- [Instalasi](#-instalasi)
- [Penggunaan](#-cara-penggunaan)
- [Struktur Proyek](#-struktur-proyek)
- [Deployment](#-deployment)
- [Dokumentasi Teknis](#-dokumentasi-teknis)
- [Kontributor](#-kontributor)
- [Lisensi](#-lisensi)

---

## 🎯 Tentang Proyek

**FinEdu** adalah aplikasi web edukatif yang membantu siswa SMP memahami dan mengelola keuangan pribadi mereka dengan cara yang menyenangkan dan interaktif. Aplikasi ini mengajarkan konsep dasar literasi keuangan seperti:

- 💵 Mengelola uang jajan harian
- 🎯 Menetapkan dan mencapai tujuan tabungan
- 📊 Memantau pengeluaran
- 📚 Memahami konsep keuangan dasar

### 🌟 Latar Belakang

Literasi keuangan adalah keterampilan penting yang harus diajarkan sejak dini. Namun, kebanyakan siswa SMP belum memahami cara mengelola uang dengan baik. **FinEdu** hadir sebagai solusi untuk:

1. ✅ Memberikan edukasi keuangan yang mudah dipahami
2. ✅ Membantu siswa melacak pengeluaran mereka
3. ✅ Mengajarkan pentingnya menabung dan membuat rencana keuangan
4. ✅ Menyediakan visualisasi yang menarik dan interaktif

---

## ✨ Fitur Utama

### 1. 📊 Dashboard Interaktif
- **Ringkasan Keuangan**: Melihat uang jajan, sisa uang, dan tujuan aktif dalam satu tampilan
- **Progress Chart dengan Gradient**: Visualisasi progress tabungan dengan circular chart yang cantik
- **Simulator Real-time**: Menghitung estimasi waktu untuk mencapai tujuan berdasarkan tabungan harian

### 2. 🎯 Manajemen Tujuan
- **Buat Tujuan Tabungan**: Tetapkan target (misal: laptop, sepeda, gadget)
- **Custom Warna**: Personalisasi setiap tujuan dengan warna favorit
- **Progress Tracking**: Pantau kemajuan dengan progress bar dan estimasi waktu
- **Multiple Goals**: Kelola beberapa tujuan sekaligus

### 3. 💰 Pelacakan Pengeluaran
- **Catat Transaksi**: Input pengeluaran harian dengan mudah
- **Riwayat Lengkap**: Lihat semua transaksi dalam list yang terorganisir
- **Bonus Tracking**: Catat bonus uang yang diterima
- **Auto-Save**: Setor sisa uang ke tujuan aktif dengan satu klik

### 4. 📚 Edukasi Keuangan
- **Materi Interaktif**: Pelajari konsep keuangan dasar
- **Tips Menabung**: Panduan praktis untuk menabung efektif
- **Ilustrasi Sederhana**: Analogi mudah dipahami untuk anak SMP

### 5. 🎨 UI/UX Modern
- **Responsive Design**: Tampilan optimal di HP, tablet, dan PC
- **Hamburger Menu**: Menu mobile yang smooth dan elegant
- **Gradient & Animations**: Visual menarik dengan gradient colors dan smooth transitions
- **Glass Morphism**: Efek modern dengan backdrop blur
- **Emoji Icons**: Ikon fun yang engaging untuk anak muda

### 6. 🔐 Keamanan & Privasi
- **User Authentication**: Login dan registrasi dengan password
- **Local Storage**: Data tersimpan aman di browser
- **Private Routes**: Proteksi halaman yang memerlukan login

---

## 🛠️ Teknologi yang Digunakan

### Frontend Framework & Libraries

| Teknologi | Versi | Kegunaan |
|-----------|-------|----------|
| ⚛️ **React** | 19.1.1 | UI Framework untuk membangun komponen interaktif |
| 🚀 **Vite** | Latest | Build tool yang super cepat |
| 🎨 **Tailwind CSS** | 4.1.14 | Utility-first CSS framework untuk styling modern |
| 🗺️ **React Router** | 7.9.4 | Routing dan navigation |
| 📊 **Chart.js** | 4.5.1 | Visualisasi data dengan chart |
| 🔄 **Zustand** | 5.0.8 | State management yang simpel dan powerful |
| 🍭 **SweetAlert2** | 11.26.2 | Alert dialog yang cantik |

### Development Tools

- ✅ **ESLint** - Code linting untuk kualitas kode
- 📦 **npm** - Package manager
- 🐙 **Git & GitHub** - Version control
- 🌐 **GitHub Pages** - Hosting gratis
- ⚙️ **GitHub Actions** - CI/CD automation

---

## 🎥 Demo Aplikasi

### 🌐 Live Demo
**URL:** [https://hudzaiflank.github.io/lomba-rasya/](https://hudzaiflank.github.io/lomba-rasya/)

### 📸 Screenshots

#### 1. Halaman Login/Register
![Auth Page](https://via.placeholder.com/800x400/10B981/FFFFFF?text=FinEdu+Authentication)
- Tampilan login yang modern dengan gradient background
- Fitur registrasi untuk user baru
- Form dengan placeholder yang jelas

#### 2. Dashboard
![Dashboard](https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=Dashboard+with+Charts)
- Stats cards dengan gradient colors
- Circular progress chart dengan gradient
- Simulator estimasi real-time

#### 3. Halaman Tujuan
![Goals Page](https://via.placeholder.com/800x400/8B5CF6/FFFFFF?text=Goals+Management)
- Form tambah tujuan baru
- List tujuan dengan progress bar
- Estimasi waktu pencapaian

#### 4. Halaman Pengeluaran
![Spending Page](https://via.placeholder.com/800x400/EC4899/FFFFFF?text=Expense+Tracking)
- Input pengeluaran harian
- Riwayat transaksi lengkap
- Stats cards untuk monitoring

#### 5. Halaman Edukasi
![Education Page](https://via.placeholder.com/800x400/F59E0B/FFFFFF?text=Financial+Education)
- Materi edukasi keuangan
- Tips dan ilustrasi
- Cards dengan gradient background

---

## 🚀 Instalasi

### Prerequisites

Pastikan sudah terinstall:
- ✅ **Node.js** (versi 18 atau lebih tinggi)
- ✅ **npm** (biasanya terinstall bersama Node.js)
- ✅ **Git**

### Langkah Instalasi

#### 1. Clone Repository

```bash
git clone https://github.com/Hudzaiflank/lomba-rasya.git
cd lomba-rasya
```

#### 2. Install Dependencies

```bash
npm install
```

Ini akan menginstall semua package yang diperlukan sesuai `package.json`.

#### 3. Jalankan Development Server

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173/`

#### 4. Build untuk Production

```bash
npm run build
```

Output akan tersimpan di folder `dist/`

#### 5. Preview Build

```bash
npm run preview
```

---

## 📖 Cara Penggunaan

### 1. Registrasi & Login

1. Buka aplikasi di browser
2. Klik tombol **"Daftar"**
3. Masukkan nama dan password
4. Klik **"Daftar"** untuk membuat akun
5. Gunakan tombol **"Masuk"** untuk login selanjutnya

### 2. Setup Awal

1. **Set Uang Jajan Default**
   - Buka Dashboard
   - Di bagian "Simulator Estimasi Real-time"
   - Input jumlah uang jajan harian
   - Klik "💾 Simpan sebagai default"

### 3. Buat Tujuan Tabungan

1. Klik menu **"Tujuan"**
2. Isi form "Buat Tujuan Baru":
   - Nama tujuan (contoh: "Laptop Gaming")
   - Target dalam Rupiah (contoh: 20000000)
   - Pilih warna favorit
3. Klik **"➕ Tambah Tujuan"**
4. Klik **"⭐ Aktifkan"** untuk menjadikan tujuan aktif

### 4. Catat Pengeluaran

1. Klik menu **"Pengeluaran"**
2. Pilih tanggal (default: hari ini)
3. Isi form "Tambah Pengeluaran":
   - Apa yang dibeli (contoh: "Snack")
   - Harga (contoh: 5000)
4. Klik **"🛍️ Tambahkan Pengeluaran"**

### 5. Setor Tabungan

1. Di halaman **"Pengeluaran"**
2. Lihat sisa uang di akhir hari
3. Klik **"Setor ke Tujuan"**
4. Sisa uang otomatis masuk ke tujuan aktif

### 6. Monitor Progress

1. Kembali ke **Dashboard**
2. Lihat circular chart untuk progress visual
3. Cek estimasi waktu pencapaian tujuan
4. Gunakan simulator untuk coba-coba scenario

---

## 📁 Struktur Proyek

```
lomba-rasya/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── public/                      # Static assets
├── src/
│   ├── assets/                 # Images, icons, dll
│   ├── components/             # React components
│   │   ├── NumberInput.jsx    # Input khusus angka
│   │   └── ProgressDonut.jsx  # Circular progress chart
│   ├── router/
│   │   └── AppRouter.jsx      # React Router configuration
│   ├── store/
│   │   └── useAppStore.js     # Zustand store (state management)
│   ├── utils/
│   │   └── alerts.js          # SweetAlert helpers
│   ├── views/                  # Page components
│   │   ├── AuthPage.jsx       # Login/Register page
│   │   ├── Dashboard.jsx      # Dashboard utama
│   │   ├── GoalsPage.jsx      # Halaman tujuan
│   │   ├── SpendingPage.jsx   # Halaman pengeluaran
│   │   ├── EducationPage.jsx  # Halaman edukasi
│   │   └── Layout.jsx         # Layout wrapper dengan navbar
│   ├── App.css                # Global styles
│   ├── App.jsx                # Root component
│   ├── index.css              # Tailwind & custom CSS
│   └── main.jsx               # Entry point
├── .gitignore
├── eslint.config.js           # ESLint configuration
├── index.html                 # HTML template
├── package.json               # Dependencies & scripts
├── README.md                  # Dokumentasi (file ini)
└── vite.config.js            # Vite configuration
```

### Penjelasan Komponen Penting

#### 🗂️ `src/store/useAppStore.js`
State management menggunakan Zustand yang mengelola:
- User authentication
- Goals management
- Wallet & daily expenses
- Settings (uang jajan default)

#### 🎨 `src/components/ProgressDonut.jsx`
Komponen circular progress chart dengan:
- Gradient colors
- Smooth animations
- Glow effects
- Responsive sizing

#### 🧭 `src/router/AppRouter.jsx`
Routing menggunakan React Router dengan:
- HashRouter (kompatibel dengan GitHub Pages)
- Private routes protection
- Lazy loading

#### 🎯 `src/views/`
Halaman-halaman utama aplikasi dengan UI modern dan responsive

---

## 🌐 Deployment

### Deployment ke GitHub Pages

Aplikasi ini sudah dikonfigurasi untuk auto-deploy ke GitHub Pages menggunakan GitHub Actions.

#### Cara Kerja Deployment:

1. **Trigger**: Setiap kali push ke branch `main`
2. **Build**: GitHub Actions otomatis menjalankan `npm ci` dan `npm run build`
3. **Deploy**: Hasil build di-upload ke GitHub Pages
4. **Live**: Website otomatis update di URL production

#### GitHub Actions Workflow

File: `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - Checkout code
      - Setup Node.js 20
      - Install dependencies
      - Build project
      - Upload to GitHub Pages

  deploy:
    runs-on: ubuntu-latest
    needs: build
    steps:
      - Deploy to GitHub Pages
```

#### Konfigurasi Vite untuk GitHub Pages

File: `vite.config.js`

```javascript
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/lomba-rasya/',  // Repository name
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
```

#### URL Production

**Live Site:** [https://hudzaiflank.github.io/lomba-rasya/](https://hudzaiflank.github.io/lomba-rasya/)

---

## 🔧 Dokumentasi Teknis

### State Management dengan Zustand

```javascript
const useAppStore = create(
  persist(
    (set, get) => ({
      // State
      users: { allIds: [], byId: {} },
      currentUserId: null,
      goals: { allIds: [], byId: {} },
      wallet: { days: {} },
      settings: { defaultDailyAllowance: 50000 },

      // Actions
      registerUser: (name, password) => { /* ... */ },
      loginUser: (name, password) => { /* ... */ },
      addGoal: (goalData) => { /* ... */ },
      addExpense: (expenseData) => { /* ... */ },
      // ... other actions
    }),
    {
      name: 'finedu-storage', // localStorage key
    }
  )
);
```

### Routing dengan React Router

```javascript
<HashRouter>
  <Routes>
    <Route path="/auth" element={<AuthPage />} />
    <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
      <Route index element={<Dashboard />} />
      <Route path="goals" element={<GoalsPage />} />
      <Route path="spending" element={<SpendingPage />} />
      <Route path="education" element={<EducationPage />} />
    </Route>
  </Routes>
</HashRouter>
```

### Responsive Design

Menggunakan Tailwind CSS breakpoints:
- `sm:` - Small devices (≥640px)
- `md:` - Medium devices (≥768px)
- `lg:` - Large devices (≥1024px)

Contoh:
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Responsive grid */}
</div>
```

### Custom Animations

```css
@keyframes pulse-slow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

.animate-pulse-slow {
  animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

---

## 🎨 Design System

### Color Palette

```javascript
const brandColors = {
  primary: '#71CB90',      // Green
  greenLight: '#B5E8A4',   // Light Green
  pink: '#FFB0C4',         // Pink
  coralLight: '#FFC8C4',   // Coral Light
};
```

### Typography

- **Font Family**: System UI fonts untuk performa optimal
- **Heading**: Font bold dengan gradient text
- **Body**: Regular weight, readable size

### Components Design

- **Cards**: Rounded-2xl dengan shadow-xl
- **Buttons**: Gradient backgrounds dengan hover effects
- **Inputs**: Border-2 dengan focus states
- **Charts**: Gradient circular progress dengan glow

---

## 📊 Fitur Teknis

### 1. Data Persistence
- Menggunakan `localStorage` via Zustand persist
- Data tersimpan secara otomatis
- Tidak perlu database server

### 2. Real-time Calculations
- Estimasi waktu pencapai tujuan
- Rata-rata tabungan 14 hari
- Sisa uang otomatis terhitung

### 3. Form Validation
- Input validation untuk angka
- Required fields checking
- User-friendly error messages

### 4. Performance Optimization
- Code splitting dengan React lazy loading
- Optimized bundle dengan Vite
- Minimal re-renders dengan Zustand

---

## 🐛 Troubleshooting

### Build Errors

**Problem**: `npm run build` error

**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Deployment Issues

**Problem**: GitHub Pages menampilkan 404

**Solution**: 
- Pastikan menggunakan `HashRouter` bukan `BrowserRouter`
- Check `base` path di `vite.config.js`
- Verify GitHub Pages settings menggunakan GitHub Actions

### Styling Issues

**Problem**: Tailwind classes tidak bekerja

**Solution**:
- Check `tailwind.config.js`
- Pastikan import di `index.css` benar
- Clear cache dan rebuild

---

## 📝 Development Guidelines

### Code Style

- Use functional components dengan hooks
- Follow React best practices
- Consistent naming conventions
- Comment complex logic

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/nama-fitur

# Make changes and commit
git add .
git commit -m "feat: deskripsi fitur"

# Push and create PR
git push origin feature/nama-fitur
```

### Commit Message Convention

- `feat:` - Fitur baru
- `fix:` - Bug fix
- `docs:` - Dokumentasi
- `style:` - Formatting, styling
- `refactor:` - Code refactoring
- `test:` - Testing
- `chore:` - Maintenance

---

## 🏆 Kompetisi & Pencapaian

### Nilai Lebih Aplikasi Ini

1. ✅ **User-Centered Design**: Dirancang khusus untuk siswa SMP
2. ✅ **Modern Tech Stack**: Menggunakan teknologi terkini
3. ✅ **Responsive & Mobile-First**: Optimal di semua device
4. ✅ **Interactive Learning**: Gamifikasi untuk engagement
5. ✅ **Real-world Application**: Langsung applicable di kehidupan
6. ✅ **Clean Code**: Well-organized dan documented
7. ✅ **Automated Deployment**: CI/CD dengan GitHub Actions
8. ✅ **Free Hosting**: Accessible 24/7 via GitHub Pages

### Dokumentasi Lengkap

- ✅ README comprehensive
- ✅ Code comments
- ✅ Architecture documentation
- ✅ User guide
- ✅ Technical specifications

---

## 👨‍💻 Kontributor

### Developer

**Hudzaiflank**
- GitHub: [@Hudzaiflank](https://github.com/Hudzaiflank)
- Project: [lomba-rasya](https://github.com/Hudzaiflank/lomba-rasya)

### Credits

- React Team untuk framework yang luar biasa
- Tailwind CSS untuk utility-first CSS
- Vercel untuk Vite build tool
- Chart.js untuk visualisasi data
- SweetAlert2 untuk alert yang cantik

---

## 📄 Lisensi

Project ini dibuat untuk keperluan kompetisi/lomba pendidikan.

---

## 🙏 Acknowledgments

Terima kasih kepada:
- 🎓 Sekolah dan guru-guru yang mendukung
- 👨‍👩‍👧‍👦 Keluarga yang selalu mendukung
- 💻 Open source community
- 🏆 Penyelenggara lomba

---

## 📞 Kontak & Support

Jika ada pertanyaan atau feedback:

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/Hudzaiflank/lomba-rasya/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/Hudzaiflank/lomba-rasya/discussions)
- 📧 **Email**: [Contact via GitHub](https://github.com/Hudzaiflank)

---

<div align="center">

### ⭐ Jangan lupa kasih star jika project ini bermanfaat!

**Dibuat dengan ❤️ untuk edukasi finansial generasi muda Indonesia**

[![Star on GitHub](https://img.shields.io/github/stars/Hudzaiflank/lomba-rasya?style=social)](https://github.com/Hudzaiflank/lomba-rasya)
[![Fork on GitHub](https://img.shields.io/github/forks/Hudzaiflank/lomba-rasya?style=social)](https://github.com/Hudzaiflank/lomba-rasya/fork)

[⬆ Kembali ke atas](#-finedu---platform-edukasi-keuangan-untuk-siswa-smp)

</div>
