import React from 'react';
import { LogoBadge } from './LogoBadge';
import { KKN_INFO, KKN_MEMBERS } from '../data/kknTeam';
import { 
  GraduationCap, 
  MapPin, 
  Award, 
  BookOpen, 
  Users, 
  CheckCircle2, 
  Sparkles, 
  Quote,
  Building,
  Heart
} from 'lucide-react';
import kknLogoImg from '../assets/images/kkn-logo.png';
import kknActivityImg from '../assets/images/kkn_kegiatan_literasi_1786823672568.jpg';

export const TentangKamiSection: React.FC = () => {
  return (
    <div id="tentang-kami-section" className="space-y-12 py-6">
      
      {/* Hero Showcase for KKN 47 & Official Logo */}
      <div className="bg-gradient-to-b from-[#0A192F] to-[#162A45] rounded-3xl p-6 sm:p-12 text-white shadow-xl border border-[#D4AF37]/40 relative overflow-hidden text-center">
        
        {/* Background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12),transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          
          {/* Main Logo Large Display */}
          <div className="flex justify-center">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1 bg-gradient-to-tr from-[#D4AF37] via-[#52B788] to-[#D4AF37] shadow-xl">
              <img
                src={kknLogoImg}
                alt="Logo KKN Tematik Kelompok 47 Desa Batursari Mranggen Demak UPGRIS"
                className="w-full h-full object-cover rounded-full bg-[#0A192F]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#D4AF37] block">
              Kuliah Kerja Nyata (KKN) Tematik
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white">
              {KKN_INFO.institution}
            </h1>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#162A45] border border-[#D4AF37]/40 text-[#D4AF37] font-bold text-sm">
              <Sparkles className="w-4 h-4" />
              <span>{KKN_INFO.groupNumber} • {KKN_INFO.village}</span>
            </div>
          </div>

          {/* Location Bar */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-slate-300">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-rose-400" />
              {KKN_INFO.district}, {KKN_INFO.regency}
            </span>
            <span>•</span>
            <span>Provinsi {KKN_INFO.province}</span>
            <span>•</span>
            <span className="text-[#52B788] font-semibold">Tahun {KKN_INFO.year}</span>
          </div>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl mx-auto font-light">
            Program kerja pembentukan perpustakaan digital <strong>Pojok Baca Desa Batursari</strong> berfokus pada pemerataan akses ilmu pengetahuan, penguatan minat baca anak, dan penyediaan panduan praktis untuk kemajuan ekonomi, kesehatan, serta pertanian warga Batursari.
          </p>

        </div>
      </div>

      {/* Program Kerja Highlights & Objectives */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Program Focus */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#2D5A27] uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-[#D4AF37]" />
              <span>Misi & Tujuan Program Kerja</span>
            </div>
            <h3 className="text-2xl font-bold font-display text-[#0A192F]">
              {KKN_INFO.programPojokBaca.title}
            </h3>
            <p className="text-xs text-slate-600">
              Slogan Resmi: <em>"{KKN_INFO.programPojokBaca.slogan}"</em>
            </p>
          </div>

          <div className="space-y-3">
            {KKN_INFO.programPojokBaca.objectives.map((obj, i) => (
              <div key={i} className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FAF9F6] border border-slate-200">
                <div className="p-1.5 rounded-lg bg-[#2D5A27] text-white shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  {obj}
                </p>
              </div>
            ))}
          </div>

          {/* DPL and Village Partners */}
          <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-600 block">
                Dosen Pembimbing Lapangan
              </span>
              <p className="text-xs font-bold text-[#0A192F] mt-1">{KKN_INFO.dpl.title}</p>
              <p className="text-[11px] text-slate-600">{KKN_INFO.dpl.affiliation}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-600 block">
                Mitra Kolaborasi Desa
              </span>
              <p className="text-xs font-bold text-[#0A192F] mt-1">Pemerintah Desa Batursari</p>
              <p className="text-[11px] text-slate-600">Karang Taruna & TP-PKK Batursari</p>
            </div>
          </div>
        </div>

        {/* Right: Key Stats & Photo */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Highlights grid */}
          <div className="grid grid-cols-2 gap-3">
            {KKN_INFO.programPojokBaca.highlights.map((h, idx) => (
              <div key={idx} className="bg-[#0A192F] text-white p-4 rounded-2xl border border-[#D4AF37]/30 shadow-xs">
                <span className="text-2xl sm:text-3xl font-extrabold font-display text-[#D4AF37] block">
                  {h.number}
                </span>
                <span className="text-xs text-slate-300 font-medium">{h.label}</span>
              </div>
            ))}
          </div>

          {/* Activity Photo Frame */}
          <div className="rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-xs bg-white">
            <img
              src={kknActivityImg}
              alt="Tim KKN 47 UPGRIS bersama warga Desa Batursari"
              className="w-full h-56 object-cover"
            />
            <div className="p-3.5 bg-white text-xs text-slate-700">
              <strong>Dokumentasi Lapangan:</strong> Kolaborasi aktif mahasiswa KKN Tematik Kelompok 47 bersama generasi muda dan masyarakat Desa Batursari.
            </div>
          </div>

        </div>

      </div>

      {/* Roster: Tim KKN Tematik Kelompok 47 */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2D5A27] uppercase tracking-wider">
            <Users className="w-4 h-4 text-[#D4AF37]" />
            <span>Struktur Organisasi Tim</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#0A192F]">
            Mahasiswa KKN Tematik Kelompok 47
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Daftar pengurus dan pelaksana program kerja Pojok Baca dari berbagai program studi Universitas PGRI Semarang.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {KKN_MEMBERS.map((m) => (
            <div
              key={m.id}
              className="p-5 rounded-2xl bg-[#FAF9F6] border border-slate-200 hover:border-[#D4AF37] hover:shadow-xs transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#0A192F] text-[#D4AF37]">
                    {m.role}
                  </span>
                  <GraduationCap className="w-4 h-4 text-[#52B788]" />
                </div>

                <h4 className="text-base font-bold text-[#0A192F] font-display">
                  {m.name}
                </h4>

                <p className="text-xs text-[#2D5A27] font-medium">
                  {m.major}
                </p>
              </div>

              {m.quote && (
                <div className="pt-3 border-t border-slate-200 text-xs text-slate-600 italic flex items-start gap-2">
                  <Quote className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>"{m.quote}"</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
