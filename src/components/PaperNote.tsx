import { AnimatePresence, motion } from 'framer-motion'
import { WashiTape } from './WashiTape'
import type { ReactNode } from 'react'

interface PaperNoteProps {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  tapeColor?: string
}

export function PaperNote({ open, onClose, title, children, tapeColor }: PaperNoteProps) {
  return (
    <AnimatePresence>
      {open && (
        <div className="dialog-backdrop" onClick={onClose}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label={title ?? 'A little note'}
            className="dialog-card"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              className="paper paper-stitched"
              initial={{ opacity: 0, rotateX: -30, y: 30 }}
              animate={{ opacity: 1, rotateX: 0, y: 0 }}
              exit={{ opacity: 0, rotateX: 20, y: 16 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: 'top center' }}
            >
              <WashiTape color={tapeColor ?? '#F5C7D2'} />
              {title && (
                <h3 className="handwriting" style={{ fontSize: '1.6rem', marginBottom: 10, color: 'var(--berry)' }}>
                  {title}
                </h3>
              )}
              <div className="handwriting" style={{ fontSize: '1.35rem', lineHeight: 1.6, color: 'var(--ink)' }}>
                {children}
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 18 }}>
                <button type="button" className="btn btn-ghost" onClick={onClose}>
                  Put it back
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
