import { useState } from 'react'

const pleas = [
  'Anh có thể trò chuyện với em đêm nay hong?',
  'Một xíu thôi cũng được mà… 🥺',
  'Em có chuyện vui muốn kể anh nghe á',
  'Hong lẽ anh nỡ từ chối em thiệt sao?',
  'Cho em xin một cơ hội cuối nhaaa 💗',
  'Nút màu hồng đang chờ anh đó ✨',
]

const yesLabels = [
  'Đồng ý',
  'Đồng ý nha',
  'Nói chuyện xíu nè',
  'Thôi được rồi 💗',
  'Đồng ý luôn!',
  'Okii, nói chuyện thôi ✨',
]

const floatingHearts = [
  ['♡', 'left-[8%] top-[12%]', 'delay-0'],
  ['♥', 'right-[9%] top-[18%]', 'delay-700'],
  ['♡', 'left-[13%] bottom-[18%]', 'delay-1000'],
  ['♥', 'right-[10%] bottom-[12%]', 'delay-300'],
]

function MoonIllustration({ happy = false }) {
  return (
    <div className="relative mx-auto h-36 w-36" aria-hidden="true">
      <div className="absolute inset-2 rotate-[-8deg] rounded-full bg-gradient-to-br from-[#ffd9e6] to-[#ff9ebe] shadow-[inset_-12px_-10px_0_rgba(232,110,150,0.12),0_18px_35px_rgba(224,118,153,0.2)]">
        <span className="absolute left-7 top-12 h-2.5 w-2.5 rounded-full bg-[#6d4050]" />
        <span className="absolute right-7 top-12 h-2.5 w-2.5 rounded-full bg-[#6d4050]" />
        <span className="absolute left-5 top-[3.8rem] h-3 w-5 rounded-full bg-[#ff82aa]/45 blur-[1px]" />
        <span className="absolute right-5 top-[3.8rem] h-3 w-5 rounded-full bg-[#ff82aa]/45 blur-[1px]" />
        <span className={`absolute left-1/2 top-[4.4rem] -translate-x-1/2 border-b-2 border-[#6d4050] ${happy ? 'h-5 w-9 rounded-b-full' : 'h-3 w-6 rounded-full'}`} />
      </div>
      <span className="absolute right-0 top-2 animate-twinkle text-2xl text-[#f4a31f]">✦</span>
      <span className="absolute bottom-1 left-2 animate-twinkle text-lg text-[#f7b8cf] [animation-delay:600ms]">✦</span>
    </div>
  )
}

export default function App() {
  const [step, setStep] = useState(0)
  const [accepted, setAccepted] = useState(false)

  const decline = () => setStep((current) => Math.min(current + 1, 5))

  if (accepted) {
    return (
      <main className="relative grid min-h-[100svh] place-items-center overflow-hidden bg-[#fff4f7] px-5 py-10 text-[#5d3544]">
        <Background />
        <section className="relative z-10 w-full max-w-sm animate-pop rounded-[2.25rem] border border-white/90 bg-white/75 p-7 text-center shadow-card backdrop-blur-xl">
          <MoonIllustration happy />
          <p className="mt-4 text-xs font-extrabold uppercase tracking-[0.28em] text-[#d8698d]">Yay, hẹn được anh rồi!</p>
          <h1 className="mt-3 text-[2rem] font-black leading-tight text-[#623646]">Em biết anh sẽ đồng ý mà 💗</h1>
          <p className="mx-auto mt-3 max-w-[17rem] text-[15px] font-semibold leading-6 text-[#946275]">Tối nay mình kể nhau nghe đủ thứ trên đời nha. Em chờ tin nhắn của anh đó!</p>
          <button
            type="button"
            onClick={() => { setAccepted(false); setStep(0) }}
            className="mt-7 rounded-full border border-[#efb6c9] bg-white px-5 py-3 text-sm font-extrabold text-[#c7547a] transition active:scale-95"
          >
            Xem lại lời mời
          </button>
        </section>
      </main>
    )
  }

  const yesScale = 1 + step * 0.105
  const noScale = 1 - step * 0.12

  return (
    <main className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#fff4f7] px-5 py-8 font-display text-[#5d3544]">
      <Background />

      <section className="relative z-10 w-full max-w-sm rounded-[2.25rem] border border-white/90 bg-white/75 px-6 py-8 text-center shadow-card backdrop-blur-xl sm:px-8">
        <div className="mx-auto mb-2 inline-flex items-center gap-2 rounded-full bg-[#fff0f5] px-4 py-2 text-xs font-extrabold tracking-wide text-[#d26186]">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#ef719a]" />
          LỜI MỜI NHỎ XÍU
        </div>

        <MoonIllustration />

        <div className="min-h-[8.3rem]" aria-live="polite">
          <h1 key={step} className="animate-fade-up text-[1.85rem] font-black leading-[1.18] tracking-[-0.025em] text-[#623646]">
            {pleas[step]}
          </h1>
          <p className="mx-auto mt-3 max-w-[17rem] text-sm font-semibold leading-6 text-[#9a6b7b]">
            Em dành riêng tối nay để nghe giọng anh đó.
          </p>
        </div>

        <div className="mt-6 grid min-h-[9.5rem] place-items-center">
          <div className="flex w-full flex-col items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setAccepted(true)}
              style={{ transform: `scale(${yesScale})` }}
              className="min-h-14 min-w-[11.5rem] max-w-[90%] rounded-full bg-gradient-to-r from-[#f16d98] to-[#eb5a88] px-7 py-4 text-base font-black text-white shadow-yes transition-[transform,box-shadow] duration-500 ease-out hover:shadow-[0_17px_34px_rgba(235,88,133,0.42)] active:!scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#f8b6cc]"
            >
              {yesLabels[step]}
            </button>

            <button
              type="button"
              onClick={decline}
              disabled={step === 5}
              style={{ transform: `scale(${noScale})`, opacity: step === 5 ? 0.38 : 1 }}
              className="min-h-11 rounded-full border-2 border-[#efc4d2] bg-white px-6 py-2.5 text-sm font-extrabold text-[#9e6376] transition-[transform,opacity] duration-500 ease-out active:brightness-95 disabled:cursor-not-allowed"
            >
              {step === 5 ? 'Hong bấm được nữa rồi' : 'Hong đồng ý'}
            </button>
          </div>
        </div>

        <div className="mt-1 flex items-center justify-center gap-1.5" aria-label={`Đã năn nỉ ${step} trên 5 lần`}>
          {[0, 1, 2, 3, 4].map((dot) => (
            <span key={dot} className={`h-1.5 rounded-full transition-all duration-300 ${dot < step ? 'w-5 bg-[#ef719a]' : 'w-1.5 bg-[#edd2db]'}`} />
          ))}
        </div>
        <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#c493a3]">{step}/5 lần năn nỉ</p>
      </section>
    </main>
  )
}

function Background() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#ffc8da]/50 blur-2xl" />
      <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-[#ffd8ad]/45 blur-3xl" />
      <div className="absolute left-1/2 top-[18%] h-44 w-44 -translate-x-1/2 rounded-full bg-white/70 blur-3xl" />
      {floatingHearts.map(([heart, position, delay]) => (
        <span key={position} className={`absolute ${position} ${delay} animate-float text-2xl font-black text-[#eca4bc]/70`}>{heart}</span>
      ))}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-[radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.9),transparent_68%)]" />
    </div>
  )
}
