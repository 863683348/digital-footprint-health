import { ImageResponse } from 'next/og';

export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          fontFamily: '"SF Pro Text", "PingFang SC", sans-serif',
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            background: 'linear-gradient(90deg, #4285F4, #34a853, #fbbc05, #ea4335)',
          }}
        />

        {/* Shield icon */}
        <svg
          width="80"
          height="80"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#4ade80"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          style={{ marginBottom: 20 }}
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>

        {/* Main title */}
        <h1
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: '#ffffff',
            margin: 0,
            letterSpacing: '-0.02em',
            textAlign: 'center',
            lineHeight: 1.2,
          }}
        >
          数字足迹体检报告
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 24,
            color: '#94a3b8',
            margin: '12px 0 0',
            textAlign: 'center',
          }}
        >
          检查 Twitter/X 隐私泄露 · 一键批量删除旧推文
        </p>

        {/* Tag line */}
        <div
          style={{
            marginTop: 28,
            padding: '8px 24px',
            borderRadius: 999,
            background: 'rgba(66,133,244,0.2)',
            border: '1px solid rgba(66,133,244,0.4)',
            fontSize: 18,
            color: '#60a5fa',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span>数据全程不出本机 · 报告即时可得</span>
        </div>

        {/* Bottom text */}
        <p
          style={{
            position: 'absolute',
            bottom: 24,
            fontSize: 14,
            color: '#475569',
            margin: 0,
          }}
        >
          digital-footprint-health.shop
        </p>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
