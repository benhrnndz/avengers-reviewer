import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroCurtainProps {
  visible: boolean;
  onEnter: () => void;
}

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const AUTO_DISMISS_MS = 2600;

export const IntroCurtain: React.FC<IntroCurtainProps> = ({ visible, onEnter }) => {
  useEffect(() => {
    if (!visible) return;
    document.body.style.overflow = 'hidden';

    const timer = window.setTimeout(onEnter, AUTO_DISMISS_MS);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === 'Escape' || e.key === ' ') {
        e.preventDefault();
        onEnter();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [visible, onEnter]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro-curtain"
          onClick={onEnter}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.55, ease: EASE_OUT }}
          className="fixed inset-0 z-[100] bg-[#062419] text-[#ECFDF5] flex flex-col items-center justify-center p-6 select-none cursor-pointer"
        >
          <div className="flex flex-col items-center text-center max-w-2xl w-full">
            <motion.img
              src="/avengers-doomsday-logo.png"
              alt="Avengers: Doomsday official logo"
              initial={{ opacity: 0, scale: 0.94, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.75, ease: EASE_OUT }}
              className="w-72 sm:w-[420px] md:w-[500px] h-auto object-contain drop-shadow-[0_18px_42px_rgba(0,0,0,0.45)]"
            />

            <motion.p
              initial={{ opacity: 0, letterSpacing: '0.36em' }}
              animate={{ opacity: 0.78, letterSpacing: '0.26em' }}
              transition={{ duration: 0.65, delay: 0.25, ease: EASE_OUT }}
              className="mt-6 font-mono-tech text-[11px] uppercase text-[#A7F3D0]"
            >
              MCU Codex · December 18, 2026
            </motion.p>

            {/* Thin auto-progress hairline */}
            <div className="mt-7 w-36 h-[1.5px] bg-[#ECFDF5]/14 overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-[#6EE7B7]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: AUTO_DISMISS_MS / 1000, ease: 'linear' }}
                style={{ transformOrigin: 'left center' }}
              />
            </div>
          </div>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            transition={{ duration: 0.4, delay: 0.75 }}
            className="absolute bottom-8 font-mono-tech text-[10px] uppercase tracking-[0.22em] text-[#A7F3D0]"
          >
            Click anywhere to enter
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
