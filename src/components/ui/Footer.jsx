import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full py-8 mt-20 border-t border-white/5 bg-bg-space/40 backdrop-blur-sm flex flex-col items-center justify-center text-sm text-text-light/50 font-body">
      <p>Made with ❤️ by RAGUNATH M</p>
      <p className="text-xs text-text-light/30 mt-1">© {new Date().getFullYear()} Ragunath M. All rights reserved.</p>
    </footer>
  );
}
