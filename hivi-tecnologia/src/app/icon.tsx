import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#162268',
          borderRadius: 4,
        }}
      >
        <span
          style={{
            color: 'white',
            fontSize: 22,
            fontWeight: 800,
            fontFamily: 'sans-serif',
            lineHeight: 1,
            letterSpacing: '-1px',
          }}
        >
          H
        </span>
      </div>
    ),
    size,
  );
}
