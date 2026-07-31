// ---------------------------------------------------------------------------
// ContentPanel.tsx — the glass panel that slides in per section.
//
// Reads `focusedSection` from useNavigation and renders the matching content
// from data/sections.ts. Framer Motion handles the slide-in/out so it feels
// deliberate rather than a hard show/hide.
//
// This is 2D DOM/CSS, layered on top of the <Canvas> via normal absolute
// positioning in App.tsx — not a 3D object.
// ---------------------------------------------------------------------------

import { AnimatePresence, motion } from "framer-motion";
import { useNavigation } from "../hooks/useNavigation";
import {
  sections,
  aboutBody,
  experienceBody,
  projectsBody,
  resumeBody,
  contactBody,
} from "../data/sections";
import { colors, fonts, glass } from "../styles/theme";

export default function ContentPanel() {
  const focusedSection = useNavigation((s) => s.focusedSection);
  const flyHome = useNavigation((s) => s.flyHome);

  return (
    <AnimatePresence>
      {focusedSection && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: glass.background,
            borderLeft: glass.border,
            backdropFilter: `blur(${glass.backdropBlur})`,
            WebkitBackdropFilter: `blur(${glass.backdropBlur})`,
            fontFamily: fonts.body,
          }}
          className="fixed top-0 right-0 h-full w-full sm:w-[440px] z-30 overflow-y-auto px-10 pt-24 pb-10"
        >
          <button
            onClick={flyHome}
            style={{ borderColor: "rgba(255,255,255,0.15)", color: colors.text }}
            className="absolute top-6 right-8 w-9 h-9 rounded-full border flex items-center justify-center hover:bg-white/10 transition"
            aria-label="Close panel"
          >
            ✕
          </button>

          <div style={{ color: colors.accent2 }} className="text-xs uppercase tracking-widest mb-2">
            {sections[focusedSection].eyebrow}
          </div>
          <h1 style={{ fontFamily: fonts.display, color: colors.text }} className="text-3xl mb-6">
            {sections[focusedSection].title}
          </h1>

          <SectionBody sectionKey={focusedSection} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Renders the right body content depending on which section is focused.
// Kept as a small switch here rather than in data/sections.ts, since this
// is presentation logic (JSX), not data.
function SectionBody({ sectionKey }: { sectionKey: keyof typeof sections }) {
  switch (sectionKey) {
    case "about":
      return (
        <div className="space-y-4">
          {aboutBody.paragraphs.map((p, i) => (
            <p key={i} style={{ color: colors.textDim }} className="text-sm leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      );

    case "experience":
      return (
        <div>
          {experienceBody.map((job, i) => (
            <div key={i} className="border-t border-white/10 py-4">
              <h3 style={{ color: colors.text }} className="text-base font-medium">
                {job.role} — {job.company}
              </h3>
              <span style={{ color: colors.accent2 }} className="text-xs">
                {job.period}
              </span>
              <p style={{ color: colors.textDim }} className="text-sm mt-1 leading-relaxed">
                {job.summary}
              </p>
            </div>
          ))}
        </div>
      );

    case "projects":
      return (
        <div>
          {projectsBody.map((proj, i) => (
            <div key={i} className="border-t border-white/10 py-4">
              <h3 style={{ color: colors.text }} className="text-base font-medium">
                {proj.name}
              </h3>
              <p style={{ color: colors.textDim }} className="text-sm mt-1 leading-relaxed">
                {proj.summary}
              </p>
              {proj.link && (
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: colors.accent2 }}
                  className="text-xs underline"
                >
                  View project →
                </a>
              )}
            </div>
          ))}
        </div>
      );

    case "resume":
      return (
        <div>
          <p style={{ color: colors.textDim }} className="text-sm leading-relaxed mb-4">
            {resumeBody.note}
          </p>
          <a
            href={resumeBody.fileUrl}
            style={{ color: colors.accent2 }}
            className="text-sm underline"
          >
            ↓ Download Resume (PDF)
          </a>
        </div>
      );

    case "contact":
      return (
        <div className="space-y-3">
          <p style={{ color: colors.textDim }} className="text-sm">
            Email:{" "}
            <a href={`mailto:${contactBody.email}`} style={{ color: colors.accent2 }}>
              {contactBody.email}
            </a>
          </p>
          {contactBody.links.map((link, i) => (
            <p key={i} style={{ color: colors.textDim }} className="text-sm">
              <a href={link.url} target="_blank" rel="noreferrer" style={{ color: colors.accent2 }}>
                {link.label} →
              </a>
            </p>
          ))}
        </div>
      );

    default:
      return null;
  }
}