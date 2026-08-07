import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
          borderRadius: 36,
        }}
      >
        <span
          style={{
            color: '#ffffff',
            fontSize: 114,
            fontWeight: 800,
            fontFamily: 'sans-serif',
            lineHeight: 1,
            letterSpacing: '-3px',
            paddingTop: 4,
          }}
        >
          H
        </span>
      </div>
    ),
    size,
  );
}
