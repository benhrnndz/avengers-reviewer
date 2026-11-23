import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy, ImageDown, Mail, Share2 } from 'lucide-react';
import { generateDoomsdayStoryCard } from '../utils/storyCard';

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const DEFAULT_MESSAGE =
  'We’re watching Avengers: Doomsday on Dec 18 — here’s the complete MCU catch-up guide so you don’t have to watch 60+ movies first:';

const FacebookIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.78-3.91 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22c4.78-.76 8.43-4.92 8.43-9.94z" />
  </svg>
);

const MessengerIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.44 3.14 7.17.16.14.26.35.27.57l.05 1.78c.02.57.61.94 1.13.71l1.98-.87c.17-.08.36-.09.54-.04.9.25 1.87.38 2.89.38 5.64 0 10-4.13 10-9.7C22 6.13 17.64 2 12 2zm5.98 7.45-2.93 4.65c-.47.74-1.47.92-2.16.39l-2.34-1.76a.6.6 0 0 0-.72 0l-3.16 2.4c-.42.32-.97-.19-.69-.64l2.93-4.65c.47-.74 1.47-.92 2.16-.39l2.34 1.76a.6.6 0 0 0 .72 0l3.16-2.4c.42-.32.97.19.69.64z" />
  </svg>
);

const XIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const TikTokIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={className} aria-hidden="true">
    <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

interface ShareDoomsdayCTAProps {
  watchedCount: number;
  totalWatchlist: number;
}

export const ShareDoomsdayCTA: React.FC<ShareDoomsdayCTAProps> = ({
  watchedCount,
  totalWatchlist,
}) => {
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [copied, setCopied] = useState(false);
  const [storyBusy, setStoryBusy] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const readinessPct = Math.round((watchedCount / Math.max(1, totalWatchlist)) * 100);

  useEffect(() => {
    setCanNativeShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function');
  }, []);

  const getShareUrl = () => {
    if (typeof window === 'undefined') return '';
    return window.location.origin + window.location.pathname;
  };

  const showToast = (text: string) => {
    setToast(text);
    window.setTimeout(() => {
      setToast((current) => (current === text ? null : current));
    }, 3600);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  };

  const handleCopyLink = async () => {
    const url = getShareUrl();
    const ok = await copyToClipboard(`${message}\n${url}`);
    if (ok) {
      setCopied(true);
      showToast('Invite message & link copied to clipboard.');
      window.setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleEmailShare = () => {
    const url = getShareUrl();
    const subject = encodeURIComponent('Catch up before Avengers: Doomsday (Dec 18)');
    const body = encodeURIComponent(`${message}\n\n${url}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleFacebookShare = () => {
    const url = getShareUrl();
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleXShare = () => {
    const url = getShareUrl();
    const text = encodeURIComponent(message);
    window.open(
      `https://x.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleSocialCopyAndOpen = async (
    platform: 'Messenger' | 'TikTok' | 'Instagram',
    targetUrl: string
  ) => {
    const url = getShareUrl();
    const fullText = `${message} ${url}`;

    // On mobile devices with native Share Sheet, offer instant app handoff first
    if (canNativeShare && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)) {
      try {
        await navigator.share({
          title: 'MCU Codex — Road to Avengers: Doomsday',
          text: message,
          url,
        });
        return;
      } catch {
        // User dismissed or unsupported -> fall back cleanly
      }
    }

    await copyToClipboard(fullText);
    showToast(`Invite copied — paste it right into ${platform}.`);
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  const handleStoryCard = async () => {
    if (storyBusy) return;
    setStoryBusy(true);
    const url = getShareUrl();

    try {
      const blob = await generateDoomsdayStoryCard(message, url, {
        watchedCount,
        totalCount: totalWatchlist,
      });
      const file = new File([blob], 'avengers-doomsday-story.png', { type: 'image/png' });

      // Copy the site URL so the user can drop a Link Sticker in IG / FB / TikTok Stories
      await copyToClipboard(url);

      // On mobile browsers supporting file sharing, open the native Share Sheet directly
      if (
        typeof navigator !== 'undefined' &&
        typeof navigator.canShare === 'function' &&
        navigator.canShare({ files: [file] }) &&
        /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)
      ) {
        try {
          await navigator.share({
            files: [file],
            title: 'Avengers: Doomsday — Watch Guide',
            text: message,
          });
          showToast('Story card shared & link copied for your Link Sticker.');
          return;
        } catch {
          // Dismissed or unsupported -> fall back to direct PNG download
        }
      }

      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = 'avengers-doomsday-story.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1500);

      showToast('9:16 Story card saved & link copied — upload to FB, IG, or TikTok Stories.');
    } catch {
      showToast('Could not generate the Story card — try Copy Invite instead.');
    } finally {
      setStoryBusy(false);
    }
  };

  const handleNativeShare = async () => {
    const url = getShareUrl();
    try {
      await navigator.share({
        title: 'MCU Codex — Road to Avengers: Doomsday',
        text: message,
        url,
      });
    } catch {
      // cancelled by user
    }
  };

  const channels = [
    {
      id: 'email',
      label: 'Email',
      icon: <Mail className="w-4 h-4" />,
      onClick: handleEmailShare,
    },
    {
      id: 'facebook',
      label: 'Facebook',
      icon: <FacebookIcon className="w-4 h-4" />,
      onClick: handleFacebookShare,
    },
    {
      id: 'messenger',
      label: 'Messenger',
      icon: <MessengerIcon className="w-4 h-4" />,
      onClick: () => handleSocialCopyAndOpen('Messenger', 'https://www.messenger.com/'),
    },
    {
      id: 'x',
      label: 'X',
      icon: <XIcon className="w-3.5 h-3.5" />,
      onClick: handleXShare,
    },
    {
      id: 'tiktok',
      label: 'TikTok',
      icon: <TikTokIcon className="w-4 h-4" />,
      onClick: () => handleSocialCopyAndOpen('TikTok', 'https://www.tiktok.com/'),
    },
    {
      id: 'instagram',
      label: 'Instagram',
      icon: <InstagramIcon className="w-4 h-4" />,
      onClick: () =>
        handleSocialCopyAndOpen('Instagram', 'https://www.instagram.com/direct/inbox/'),
    },
  ];

  return (
    <section
      id="share-doomsday"
      className="py-20 bg-[#09090B] text-zinc-100 border-t border-white/[0.08]"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl bg-[#101014] border border-white/[0.09] p-7 sm:p-10 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left Copy */}
            <div className="lg:col-span-6">
              <div className="flex items-center gap-2.5 mb-4">
                <img
                  src="/avengers-icon.png"
                  alt="Avengers emblem"
                  className="w-6 h-6 object-contain"
                />
                <span className="font-mono-tech text-[11px] uppercase tracking-[0.2em] text-emerald-400">
                  December 18 · Watch Together
                </span>
              </div>

              <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-[-0.03em] leading-[1.08]">
                Watching Doomsday with someone?
              </h2>
              <p className="mt-3 text-sm sm:text-[15px] text-zinc-400 leading-relaxed">
                Send this guide to a friend, partner, or group chat so they can catch up on the
                trailers, post-credits scenes, cast, and 16-project checklist before opening night.
              </p>

              {/* Editable Quick Invite Note */}
              <div className="mt-6">
                <label
                  htmlFor="share-invite-note"
                  className="block font-mono-tech text-[10px] uppercase tracking-[0.18em] text-zinc-500 mb-2"
                >
                  Customize your invite note
                </label>
                <textarea
                  id="share-invite-note"
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-xl bg-black/45 border border-white/[0.09] focus:border-emerald-500/60 px-3.5 py-2.5 text-xs sm:text-[13px] text-zinc-200 leading-relaxed focus:outline-none resize-none transition-colors"
                />
              </div>
            </div>

            {/* Right Share Channels Grid */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full">
              <div>
                <div className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-zinc-500 mb-3">
                  Send via
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {channels.map((ch) => (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={ch.onClick}
                      className="h-11 px-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.09] hover:border-white/[0.2] text-zinc-200 hover:text-white text-xs sm:text-[13px] font-medium inline-flex items-center justify-center gap-2 transition-all duration-150 active:scale-[0.98] cursor-pointer"
                    >
                      <span className="text-zinc-300">{ch.icon}</span>
                      <span>{ch.label}</span>
                    </button>
                  ))}
                </div>

                {/* Primary utility row: Copy Invite + Ready-to-Post 9:16 Story Card */}
                <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className={`h-11 px-3.5 rounded-xl border text-xs sm:text-[13px] font-semibold inline-flex items-center justify-center gap-2 transition-all duration-150 active:scale-[0.98] cursor-pointer ${
                      copied
                        ? 'bg-emerald-500 text-[#04110B] border-emerald-400'
                        : 'bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border-emerald-500/35'
                    }`}
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied' : 'Copy Invite'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleStoryCard}
                    disabled={storyBusy}
                    className="h-11 px-3.5 rounded-xl bg-white/[0.07] hover:bg-white/[0.12] border border-white/[0.14] hover:border-white/[0.26] text-white text-xs sm:text-[13px] font-semibold inline-flex items-center justify-center gap-2 transition-all duration-150 active:scale-[0.98] disabled:opacity-60 cursor-pointer"
                  >
                    <ImageDown className="w-4 h-4 text-emerald-400" />
                    <span>{storyBusy ? 'Creating Story…' : '9:16 Story Card'}</span>
                  </button>
                </div>

                {canNativeShare && (
                  <button
                    type="button"
                    onClick={handleNativeShare}
                    className="mt-2.5 w-full h-10 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.08] text-xs font-medium text-zinc-300 hover:text-white inline-flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5 text-emerald-400" />
                    More Share Options (Device Sheet)
                  </button>
                )}
              </div>

              {/* Sonner-style inline toast feedback */}
              <div className="mt-5 min-h-[36px] flex items-center">
                <AnimatePresence mode="wait">
                  {toast ? (
                    <motion.div
                      key={toast}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2, ease: EASE_OUT }}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/12 border border-emerald-500/30 text-xs text-emerald-200"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{toast}</span>
                    </motion.div>
                  ) : (
                    <p className="text-[11px] text-zinc-500 leading-relaxed">
                      Tip: Tap <strong className="text-zinc-300 font-medium">9:16 Story Card</strong>{' '}
                      to save a ready-to-post Story poster with your live Doomsday Readiness (
                      <span className="text-emerald-400 font-mono-tech tabular-nums">
                        {readinessPct}%
                      </span>
                      ) and auto-copied link.
                    </p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
