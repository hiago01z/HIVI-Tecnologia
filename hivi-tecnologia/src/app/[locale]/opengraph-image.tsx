import { ImageResponse } from 'next/og';

export const alt = 'HIVI Tecnologia — Consultoria, Gestão de TI e Infraestrutura';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          background: 'linear-gradient(135deg, #162268 0%, #1565C0 100%)',
          padding: '72px 80px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Background decoration */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)',
            transform: 'translate(150px, -150px)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.03)',
            transform: 'translate(-100px, 100px)',
            display: 'flex',
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '40px',
          }}
        >
          <span
            style={{
              fontSize: '56px',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-2px',
            }}
          >
            HIVI
          </span>
          <span
            style={{
              fontSize: '56px',
              fontWeight: 800,
              color: '#5BA4E5',
            }}
          >
            .
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '48px',
            fontWeight: 700,
            color: '#FFFFFF',
            lineHeight: 1.15,
            marginBottom: '20px',
            maxWidth: '750px',
          }}
        >
          Soluções tecnológicas que transformam negócios
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '22px',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.75)',
            letterSpacing: '0.5px',
          }}
        >
          Consultoria • Gestão de TI • Infraestrutura • Desenvolvimento Web
        </div>
      </div>
    ),
    { ...size },
  );
}
