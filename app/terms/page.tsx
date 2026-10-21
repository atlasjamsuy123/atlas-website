import LegalPage, { WaLink, type LegalContent } from "../components/LegalPage";
import { getLang } from "../lib/getLang";

const CONTENT: Record<"en" | "id", LegalContent> = {
  en: {
    title: "Terms of Service",
    updated: "Last updated: September 2026",
    back: "Back to Home",
    sections: [
      { heading: "1. Acceptance of Terms", body: "By purchasing or using Atlas Tools from Atlas Game Shop through Tokopedia or Shopee, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services." },
      { heading: "2. Description of Service", body: "Atlas Game Shop provides Atlas Tools, a desktop application for Windows that enables game activation for Steam, EA, Ubisoft, and Denuvo-protected titles. The software is provided as a portable application. No installation required." },
      { heading: "3. License & Usage", body: "Upon purchase, you are granted a personal, non-transferable license to use Atlas Tools on your own device. You may not redistribute, resell, or share the software or your activation credentials with others." },
      {
        heading: "4. Prohibited Activities",
        body: "You agree not to:",
        list: [
          "Reverse engineer, decompile, or modify the software",
          "Share your account credentials or activation codes",
          "Use the service for any illegal purpose",
          "Attempt to circumvent any security measures",
        ],
      },
      { heading: "5. Service Availability", body: "We strive to maintain continuous service availability. However, we do not guarantee uninterrupted access. Maintenance, updates, or circumstances beyond our control may temporarily affect service availability." },
      { heading: "6. Limitation of Liability", body: "Atlas Game Shop is not responsible for any indirect, incidental, or consequential damages arising from the use or inability to use our service. Our total liability shall not exceed the amount paid for the service." },
      { heading: "7. Changes to Terms", body: "We reserve the right to modify these terms at any time. Continued use of our service after changes constitutes acceptance of the new terms." },
      { heading: "8. Contact", body: <>For any questions regarding these terms, please contact us via <WaLink />.</> },
    ],
  },
  id: {
    title: "Ketentuan Layanan",
    updated: "Terakhir diperbarui: September 2026",
    back: "Kembali ke Beranda",
    sections: [
      { heading: "1. Persetujuan Ketentuan", body: "Dengan membeli atau menggunakan Atlas Tools dari Atlas Game Shop lewat Tokopedia atau Shopee, kamu setuju untuk terikat dengan Ketentuan Layanan ini. Kalau kamu tidak setuju dengan ketentuan ini, mohon jangan gunakan layanan kami." },
      { heading: "2. Deskripsi Layanan", body: "Atlas Game Shop menyediakan Atlas Tools, aplikasi desktop untuk Windows yang memungkinkan aktivasi game Steam, EA, Ubisoft, dan game yang dilindungi Denuvo. Software ini disediakan sebagai aplikasi portable. Tidak perlu instalasi." },
      { heading: "3. Lisensi & Penggunaan", body: "Setelah membeli, kamu mendapat lisensi pribadi yang tidak dapat dipindahtangankan untuk menggunakan Atlas Tools di perangkat kamu sendiri. Kamu tidak boleh mendistribusikan ulang, menjual kembali, atau membagikan software maupun kredensial aktivasi kamu kepada orang lain." },
      {
        heading: "4. Kegiatan yang Dilarang",
        body: "Kamu setuju untuk tidak:",
        list: [
          "Melakukan reverse engineering, decompile, atau memodifikasi software",
          "Membagikan kredensial akun atau kode aktivasi kamu",
          "Menggunakan layanan untuk tujuan ilegal apa pun",
          "Mencoba menembus langkah-langkah keamanan apa pun",
        ],
      },
      { heading: "5. Ketersediaan Layanan", body: "Kami berusaha menjaga layanan tetap tersedia. Namun, kami tidak menjamin akses tanpa gangguan. Pemeliharaan, update, atau keadaan di luar kendali kami dapat memengaruhi ketersediaan layanan untuk sementara." },
      { heading: "6. Batasan Tanggung Jawab", body: "Atlas Game Shop tidak bertanggung jawab atas kerugian tidak langsung, insidental, atau konsekuensial yang timbul dari penggunaan atau ketidakmampuan menggunakan layanan kami. Total tanggung jawab kami tidak melebihi jumlah yang dibayarkan untuk layanan." },
      { heading: "7. Perubahan Ketentuan", body: "Kami berhak mengubah ketentuan ini kapan saja. Dengan tetap menggunakan layanan kami setelah ada perubahan, kamu dianggap menerima ketentuan yang baru." },
      { heading: "8. Kontak", body: <>Untuk pertanyaan tentang ketentuan ini, hubungi kami lewat <WaLink />.</> },
    ],
  },
};

export default async function TermsOfService() {
  const { lang } = await getLang();
  return <LegalPage content={CONTENT[lang]} />;
}
