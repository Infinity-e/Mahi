interface MoodArtProps {
  visual: 'rain' | 'bandage' | 'moon' | 'bridge' | 'scrapbook' | 'stars'
}

export function MoodArt({ visual }: MoodArtProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width="84"
      height="84"
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      {visual === 'rain' && (
        <g>
          <ellipse cx="50" cy="30" rx="26" ry="14" fill="#B8C4D9" />
          <ellipse cx="38" cy="26" rx="12" ry="9" fill="#C9D3E4" />
          <ellipse cx="62" cy="26" rx="10" ry="8" fill="#C9D3E4" />
          <line className="mood-rain" x1="34" y1="48" x2="30" y2="60" stroke="#9FB6D9" strokeWidth="2" strokeLinecap="round" />
          <line className="mood-rain" x1="46" y1="50" x2="42" y2="62" stroke="#9FB6D9" strokeWidth="2" strokeLinecap="round" />
          <line className="mood-rain" x1="58" y1="50" x2="54" y2="62" stroke="#9FB6D9" strokeWidth="2" strokeLinecap="round" />
          <line className="mood-rain" x1="70" y1="48" x2="66" y2="60" stroke="#9FB6D9" strokeWidth="2" strokeLinecap="round" />
          <path d="M50 40 A18 18 0 0 1 68 58 L32 58 A18 18 0 0 1 50 40z" fill="#E88FA7" />
          <line x1="50" y1="40" x2="50" y2="66" stroke="#6E344E" strokeWidth="2" />
          <path d="M50 66 a6 6 0 0 1 -6 6 a6 6 0 0 1 -6 -6" fill="none" stroke="#6E344E" strokeWidth="2" />
          <path d="M40 74 C36 70 34 68 34 65 C34 62 36 60 38 60 C39.5 60 40 61 40 62 C40 61 40.5 60 42 60 C44 60 46 62 46 65 C46 68 44 70 40 74z" fill="#F5C7D2" />
        </g>
      )}
      {visual === 'bandage' && (
        <g>
          <rect x="18" y="58" width="64" height="26" rx="4" fill="#FFFDF6" transform="rotate(-3 50 71)" />
          <line x1="26" y1="66" x2="74" y2="63" stroke="rgba(110,52,78,0.2)" strokeWidth="1.4" />
          <line x1="26" y1="72" x2="70" y2="69" stroke="rgba(110,52,78,0.2)" strokeWidth="1.4" />
          <path d="M50 44 C38 36 32 29 32 22 C32 15 38 11 44 11 C47.5 11 49 13 50 15 C51 13 52.5 11 56 11 C62 11 68 15 68 22 C68 29 62 36 50 44z" fill="#E88FA7" />
          <rect x="34" y="20" width="32" height="9" rx="4.5" fill="#F3E0D0" transform="rotate(-18 50 24)" />
          <rect x="34" y="20" width="32" height="9" rx="4.5" fill="none" stroke="rgba(110,52,78,0.2)" strokeWidth="1" transform="rotate(-18 50 24)" />
          <circle cx="50" cy="24" r="2" fill="#6E344E" />
        </g>
      )}
      {visual === 'moon' && (
        <g>
          <path className="mood-glow" d="M68 12 A20 20 0 1 0 68 52 A15 15 0 1 1 68 12z" fill="#E7C58A" />
          <circle cx="60" cy="26" r="1.6" fill="#D9B26A" />
          <circle cx="70" cy="36" r="1.2" fill="#D9B26A" />
          <rect x="14" y="58" width="72" height="24" rx="8" fill="#DCD4F7" />
          <rect x="14" y="58" width="72" height="24" rx="8" fill="none" stroke="rgba(110,52,78,0.15)" strokeWidth="1.2" />
          <line x1="14" y1="66" x2="86" y2="66" stroke="rgba(110,52,78,0.12)" strokeWidth="1" />
          <path className="mood-bob" d="M50 46 C42 41 38 37 38 32 C38 27 42 24 46 24 C48.5 24 50 25.5 50 27 C50 25.5 51.5 24 54 24 C58 24 62 27 62 32 C62 37 58 41 50 46z" fill="#F5C7D2" />
        </g>
      )}
      {visual === 'bridge' && (
        <g>
          <path d="M14 62 Q50 44 86 62" fill="none" stroke="#6E344E" strokeWidth="3" strokeLinecap="round" />
          <path d="M14 62 Q50 44 86 62" fill="none" stroke="rgba(110,52,78,0.15)" strokeWidth="7" />
          <line x1="28" y1="56" x2="28" y2="72" stroke="#6E344E" strokeWidth="2.4" />
          <line x1="50" y1="51" x2="50" y2="72" stroke="#6E344E" strokeWidth="2.4" />
          <line x1="72" y1="56" x2="72" y2="72" stroke="#6E344E" strokeWidth="2.4" />
          <rect x="14" y="70" width="72" height="6" rx="3" fill="#6E344E" />
          <path className="mood-bob" d="M26 30 C18 25 15 21 15 16 C15 11 19 8 23 8 C25.5 8 26 9.5 26 11 C26 9.5 27 8 29.5 8 C33.5 8 37 11 37 16 C37 21 34 25 26 30z" fill="#F5C7D2" />
          <path className="mood-bob" style={{ animationDelay: '-1.6s' }} d="M74 30 C66 25 63 21 63 16 C63 11 67 8 71 8 C73.5 8 74 9.5 74 11 C74 9.5 75 8 77.5 8 C81.5 8 85 11 85 16 C85 21 82 25 74 30z" fill="#F5C7D2" />
          <circle cx="50" cy="52" r="3" fill="#E7C58A" />
        </g>
      )}
      {visual === 'scrapbook' && (
        <g>
          <rect x="20" y="18" width="60" height="64" rx="6" fill="#FFFDF6" stroke="rgba(110,52,78,0.2)" strokeWidth="1.4" />
          <line x1="50" y1="18" x2="50" y2="82" stroke="rgba(110,52,78,0.15)" strokeWidth="1.4" />
          <circle cx="50" cy="30" r="2.4" fill="#E7C58A" />
          <rect x="26" y="40" width="20" height="16" rx="2" fill="#F5C7D2" />
          <rect x="54" y="40" width="20" height="16" rx="2" fill="#DCD4F7" />
          <rect x="26" y="60" width="20" height="14" rx="2" fill="#E7C58A" />
          <rect x="54" y="60" width="20" height="14" rx="2" fill="#F5C7D2" />
          <path d="M50 24 C46 20 44 18 44 15 C44 12 46 10 48 10 C49 10 50 11 50 12 C50 11 51 10 52 10 C54 10 56 12 56 15 C56 18 54 20 50 24z" fill="#E88FA7" />
          <path d="M30 82 L70 82 L66 90 L34 90 z" fill="rgba(231,197,138,0.6)" />
        </g>
      )}
      {visual === 'stars' && (
        <g>
          <circle className="mood-star" cx="24" cy="22" r="1.8" fill="#E7C58A" />
          <circle className="mood-star" style={{ animationDelay: '-0.9s' }} cx="76" cy="18" r="1.4" fill="#E7C58A" />
          <circle className="mood-star" style={{ animationDelay: '-1.7s' }} cx="86" cy="44" r="1.8" fill="#E7C58A" />
          <circle className="mood-star" style={{ animationDelay: '-0.5s' }} cx="14" cy="48" r="1.4" fill="#E7C58A" />
          <circle className="mood-star" style={{ animationDelay: '-2.2s' }} cx="40" cy="12" r="1.2" fill="#E7C58A" />
          <path d="M20 40 C12 32 8 27 8 21 C8 14 13 10 18 10 C21 10 22 12 22 14 C22 12 23 10 26 10 C31 10 36 14 36 21 C36 27 32 32 20 40z" fill="#DCD4F7" opacity="0.85" />
          <path d="M80 42 C74 36 71 32 71 27 C71 22 75 19 79 19 C81 19 82 20 82 22 C82 20 83 19 85 19 C89 19 93 22 93 27 C93 32 90 36 80 42z" fill="#DCD4F7" opacity="0.85" />
          <path className="mood-bob" d="M50 46 C42 41 39 37 39 32 C39 27 43 24 47 24 C49 24 50 25 50 27 C50 25 51 24 53 24 C57 24 61 27 61 32 C61 37 58 41 50 46z" fill="#E88FA7" />
        </g>
      )}
    </svg>
  )
}
