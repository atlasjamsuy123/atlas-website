"use client";

export default function DownloadButton() {
  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = "https://github.com/atlasjamsuy123/Atlas-Tools-Update/releases/download/v1.1.0/AtlasTools-win-Setup.exe";
    a.download = "AtlasTools-win-Setup.exe";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <button
      onClick={handleDownload}
      className="flex items-center justify-center gap-3 w-full bg-purple-600 hover:bg-purple-500 text-white font-light py-3 px-6 rounded-lg transition-all group/btn cursor-pointer"
    >
      <svg className="w-4 h-4 group-hover/btn:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      Download Atlas Tools
    </button>
  );
}
