import { SignUp } from '@clerk/nextjs'
import '../../cosmic.css'

export default function SignUpPage() {
  return (
    <>
      <style>{`
        .auth-root {
          min-height: 100vh; background: var(--void);
          display: flex; align-items: center; justify-content: center;
          position: relative; overflow: hidden; padding: 40px 20px;
        }
        .auth-bg {
          position: fixed; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 70% 60% at 70% 50%, rgba(57,255,156,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 10% 20%, rgba(124,58,255,0.08) 0%, transparent 50%),
            radial-gradient(ellipse 40% 60% at 90% 80%, rgba(0,212,255,0.06) 0%, transparent 50%);
        }
        .auth-card {
          position: relative; z-index: 10;
          display: flex; flex-direction: column; align-items: center; gap: 28px;
          width: 100%; max-width: 440px;
        }
        .auth-logo { display: flex; align-items: center; gap: 12px; }
        .auth-eye {
          width: 44px; height: 44px; border-radius: 12px;
          background: linear-gradient(135deg, var(--plasma), var(--star));
          display: flex; align-items: center; justify-content: center;
          font-size: 20px; box-shadow: var(--glow-violet);
          animation: pulse 3s ease-in-out infinite;
        }
        @keyframes pulse { 0%,100%{box-shadow:var(--glow-violet)} 50%{box-shadow:0 0 40px rgba(124,58,255,0.6),0 0 80px rgba(124,58,255,0.2)} }
        .auth-logo-txt { font-family: var(--fd); font-size: 28px; font-weight: 900; color: var(--white); letter-spacing: -1px; }
        .auth-logo-txt em { color: var(--plasma-l); font-style: normal; }
        .auth-tagline { font-family: var(--fm); font-size: 9px; letter-spacing: 3px; text-transform: uppercase; color: var(--muted); }
        .auth-perks { display: flex; flex-direction: column; gap: 8px; width: 100%; }
        .auth-perk { display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-radius: 10px; background: rgba(124,58,255,0.06); border: 1px solid rgba(124,58,255,0.12); font-size: 12px; color: var(--text); }
        .auth-perk-icon { font-size: 16px; flex-shrink: 0; }

        .cl-card, .cl-rootBox { width: 100% !important; max-width: 440px !important; }
        .cl-card {
          background: linear-gradient(135deg, rgba(14,17,32,0.98), rgba(19,22,40,0.95)) !important;
          border: 1px solid rgba(57,255,156,0.2) !important;
          border-radius: 20px !important;
          box-shadow: 0 32px 80px rgba(0,0,0,0.7), 0 0 40px rgba(57,255,156,0.08) !important;
        }
        .signal-bar { position: fixed; bottom: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, var(--neon), var(--plasma-l), var(--star), transparent); background-size: 200% 100%; animation: sweep 3s linear infinite; }
        @keyframes sweep { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        .auth-stars { position: fixed; inset: 0; pointer-events: none; z-index: 1; }
        .auth-star { position: absolute; border-radius: 50%; animation: twinkle var(--d) var(--dl) infinite ease-in-out; }
        @keyframes twinkle { 0%,100%{opacity:0.1} 50%{opacity:0.8} }
      `}</style>

      <div className="auth-root">
        <div className="auth-bg" />
        <div className="scanlines" />
        <div className="auth-stars">
          {Array.from({ length: 30 }, (_, i) => (
            <div key={i} className="auth-star" style={{
              left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
              width: Math.random() * 2 + 1, height: Math.random() * 2 + 1,
              background: ['#39ff9c', '#00d4ff', '#a855f7', 'rgba(255,255,255,0.7)'][i % 4],
              ['--d' as any]: `${Math.random() * 4 + 2}s`,
              ['--dl' as any]: `${Math.random() * 3}s`,
            } as any} />
          ))}
        </div>

        <div className="auth-card">
          <div className="auth-logo">
            <div className="auth-eye">👁</div>
            <div className="auth-logo-txt">Focus<em>Lens</em></div>
          </div>
          <div className="auth-tagline">Begin your transmission</div>

          <div className="auth-perks">
            {[
              { icon: '🪙', txt: 'Earn 5 credits per focused session' },
              { icon: '🏆', txt: '12 achievements to unlock' },
              { icon: '📊', txt: 'Full session history & analytics' },
            ].map(p => (
              <div className="auth-perk" key={p.txt}>
                <span className="auth-perk-icon">{p.icon}</span>
                <span>{p.txt}</span>
              </div>
            ))}
          </div>

          <SignUp afterSignUpUrl="/dashboard" redirectUrl="/dashboard" />
        </div>

        <div className="signal-bar" />
      </div>
    </>
  )
}
