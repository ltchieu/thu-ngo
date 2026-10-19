import { useState } from "react";

const FORM_ID = import.meta.env.VITE_FORMSPREE_FORM_ID;
const FORM_ENDPOINT = FORM_ID ? `https://formspree.io/f/${FORM_ID}` : "";
const MAX_DECLINE_ATTEMPTS = 3;
const DEFAULT_PHOTO =
  "/1792327768529_2073987098116228667_3395705528928461548_a083a54b9fa92103e8598c6ecaf8b574.jpg";
const invitationPhotos = [DEFAULT_PHOTO, "/3.jpg", "/4.jpg", "/2.jpg"];

const invitationLines = [
  "Cuối tuần này đi xem phim với anh hongg?",
  "Em hong nhấn từ chối được đâu hehehe",
  "Ơ em vẫn thử àaa",
  "Em đừng cố gắng nhấn từ chối nữa...",
];

const acceptLabels = ["Đi xem phim"];

const floatingDecorations = [
  ["✦", "left-[8%] top-[12%]", "delay-0"],
  ["●", "right-[9%] top-[18%]", "delay-700"],
  ["✦", "left-[13%] bottom-[18%]", "delay-1000"],
  ["●", "right-[10%] bottom-[12%]", "delay-300"],
];

function getToday() {
  const now = new Date();
  const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
  return localDate.toISOString().split("T")[0];
}

function formatDate(date) {
  if (!date) return "";

  return new Intl.DateTimeFormat("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

async function sendToFormspree(fields) {
  if (!FORM_ENDPOINT) {
    throw new Error("Chưa cấu hình Formspree Form ID.");
  }

  const response = await fetch(FORM_ENDPOINT, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _subject: "Phản hồi lời mời đi xem phim",
      recipient: "lch3504@gmail.com",
      submittedAt: new Date().toISOString(),
      ...fields,
    }),
  });

  if (!response.ok) {
    throw new Error("Gửi phản hồi chưa thành công. Vui lòng thử lại.");
  }
}

function InvitationPhoto({ src = DEFAULT_PHOTO }) {
  return (
    <div className="relative mx-auto my-2 h-40 w-40">
      <div
        className="absolute -inset-1 rotate-3 rounded-[2rem] bg-gradient-to-br from-[#ffd6e4] to-[#ffd9a9] shadow-[0_16px_32px_rgba(183,91,121,0.2)]"
        aria-hidden="true"
      />
      <img
        key={src}
        src={src}
        alt="Nhân vật đáng yêu đang chờ câu trả lời"
        className="relative h-full w-full animate-fade-up rounded-[1.75rem] border-4 border-white bg-white object-cover shadow-sm"
      />
      <span
        className="absolute -right-3 top-1 animate-twinkle text-2xl text-[#f4a31f]"
        aria-hidden="true"
      >
        ✦
      </span>
      <span
        className="absolute -bottom-1 -left-2 animate-twinkle text-lg text-[#f7b8cf] [animation-delay:600ms]"
        aria-hidden="true"
      >
        ✦
      </span>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("invite");
  const [declineStep, setDeclineStep] = useState(0);
  const [availableDate, setAvailableDate] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const reset = () => {
    setScreen("invite");
    setDeclineStep(0);
    setAvailableDate("");
    setNote("");
    setStatus("idle");
    setError("");
  };

  const submitAvailableDate = async (event) => {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    try {
      await sendToFormspree({
        response: "Đồng ý đi xem phim",
        declineCount: declineStep,
        acceptedAfter:
          declineStep === 0
            ? "Đồng ý ngay lần đầu"
            : `Đồng ý sau ${declineStep} lần chọn “Để hôm khác”`,
        availableDate,
        availableDateDisplay: formatDate(availableDate),
        note: note.trim() || "Không có ghi chú",
      });
      setStatus("idle");
      setScreen("accepted");
    } catch (submitError) {
      setStatus("error");
      setError(submitError.message);
    }
  };

  const declineInvitation = () => {
    const nextStep = Math.min(declineStep + 1, MAX_DECLINE_ATTEMPTS);
    setDeclineStep(nextStep);
    setError("");
  };

  if (screen === "schedule") {
    return (
      <PageShell>
        <section className="relative z-10 w-full max-w-sm animate-pop rounded-[2.25rem] border border-white/90 bg-white/75 p-7 text-center shadow-card backdrop-blur-xl">
          <InvitationPhoto />
          <p className="mt-3 text-xs font-extrabold uppercase tracking-[0.24em] text-[#d8698d]">
            Chọn ngày đi xem
          </p>
          <h1 className="mt-3 text-[1.9rem] font-black leading-tight text-[#623646]">
            Hôm nào em rảnh zayy
          </h1>
          <p className="mx-auto mt-2 max-w-[18rem] text-sm font-semibold leading-6 text-[#946275]">
            Em chọn ngày mà em rảnh nhennn
          </p>

          <form className="mt-6 text-left" onSubmit={submitAvailableDate}>
            <label
              className="block text-sm font-extrabold text-[#75485a]"
              htmlFor="available-date"
            >
              Ngày em rảnh
            </label>
            <input
              id="available-date"
              type="date"
              min={getToday()}
              value={availableDate}
              onChange={(event) => setAvailableDate(event.target.value)}
              required
              className="mt-2 min-h-12 w-full rounded-2xl border-2 border-[#f0c7d4] bg-white px-4 py-3 font-bold text-[#623646] outline-none transition focus:border-[#ed729a] focus:ring-4 focus:ring-[#f8d5e0]"
            />

            <label
              className="mt-4 block text-sm font-extrabold text-[#75485a]"
              htmlFor="note"
            >
              Ghi chú{" "}
              <span className="font-semibold text-[#b08493]">
                (không bắt buộc)
              </span>
            </label>
            <textarea
              id="note"
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Ví dụ: rảnh sau 7 giờ"
              rows="2"
              className="mt-2 w-full resize-none rounded-2xl border-2 border-[#f0c7d4] bg-white px-4 py-3 font-semibold text-[#623646] outline-none transition placeholder:text-[#c6a4af] focus:border-[#ed729a] focus:ring-4 focus:ring-[#f8d5e0]"
            />

            {error && <ErrorMessage message={error} />}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-5 min-h-14 w-full rounded-full bg-gradient-to-r from-[#f16d98] to-[#eb5a88] px-7 py-4 text-base font-black text-white shadow-yes transition hover:shadow-[0_17px_34px_rgba(235,88,133,0.42)] active:scale-95 disabled:cursor-wait disabled:opacity-65"
            >
              {status === "submitting" ? "Đang gửi..." : "Gửi ngày này"}
            </button>
            <button
              type="button"
              onClick={() => {
                setScreen("invite");
                setError("");
                setStatus("idle");
              }}
              disabled={status === "submitting"}
              className="mt-3 w-full rounded-full px-5 py-3 text-sm font-extrabold text-[#9e6376] transition hover:bg-[#fff0f5] disabled:opacity-50"
            >
              Quay lại
            </button>
          </form>
        </section>
      </PageShell>
    );
  }

  if (screen === "accepted") {
    return (
      <PageShell>
        <section className="relative z-10 w-full max-w-sm animate-pop rounded-[2.25rem] border border-white/90 bg-white/75 p-7 text-center shadow-card backdrop-blur-xl">
          <InvitationPhoto src="/4.jpg" />
          <p className="mt-4 text-xs font-extrabold uppercase tracking-[0.26em] text-[#d8698d]">
            Đã gửi lịch rảnh!
          </p>
          <h1 className="mt-3 text-[2rem] font-black leading-tight text-[#623646]">
            Cảm ơn em đã đồng ý đi với anh nhaaaa
          </h1>
          <p className="mx-auto mt-3 max-w-[18rem] text-[15px] font-semibold leading-6 text-[#946275]">
            Ngày em đã chọn là {formatDate(availableDate)}. Phản hồi đã được gửi
            đi.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-7 rounded-full border border-[#efb6c9] bg-white px-5 py-3 text-sm font-extrabold text-[#c7547a] transition active:scale-95"
          >
            Xem lại lời mời
          </button>
        </section>
      </PageShell>
    );
  }

  const yesScale = 1 + declineStep * 0.1;
  const noScale = Math.max(0.5, 1 - declineStep * 0.12);
  const invitationPhoto = invitationPhotos[declineStep];

  return (
    <PageShell>
      <section className="relative z-10 w-full max-w-sm rounded-[2.25rem] border border-white/90 bg-white/75 px-6 py-8 text-center shadow-card backdrop-blur-xl sm:px-8">
        <div className="mx-auto mb-2 inline-flex items-center gap-2 rounded-full bg-[#fff0f5] px-4 py-2 text-xs font-extrabold tracking-wide text-[#d26186]">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#ef719a]" />
          Thư ngỏ
        </div>

        <InvitationPhoto src={invitationPhoto} />

        <div className="mt-9 min-h-[9rem]" aria-live="polite">
          <h1
            key={declineStep}
            className="animate-fade-up text-[1.9rem] font-black leading-[1.18] tracking-[-0.025em] text-[#623646]"
          >
            {invitationLines[Math.min(declineStep, invitationLines.length - 1)]}
          </h1>
          <p className="mx-auto mt-3 max-w-[18rem] text-sm font-semibold leading-6 text-[#9a6b7b]">
            Như lời đã hứa nên anh gửi thư này để mời em đi xem phim nhá!!!
          </p>
        </div>

        <div className="mt-6 flex min-h-[8rem] w-full flex-col items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              setScreen("schedule");
              setError("");
              setStatus("idle");
            }}
            disabled={status === "submitting"}
            style={{ transform: `scale(${yesScale})` }}
            className="min-h-14 min-w-[12rem] max-w-[90%] rounded-full bg-gradient-to-r from-[#f16d98] to-[#eb5a88] px-7 py-4 text-base font-black text-white shadow-yes transition-[transform,box-shadow] duration-500 ease-out hover:shadow-[0_17px_34px_rgba(235,88,133,0.42)] active:!scale-95 disabled:opacity-65"
          >
            {acceptLabels[Math.min(declineStep, acceptLabels.length - 1)]}
          </button>

          {declineStep < MAX_DECLINE_ATTEMPTS && (
            <button
              type="button"
              onClick={declineInvitation}
              style={{ transform: `scale(${noScale})` }}
              className="min-h-11 rounded-full border-2 border-[#efc4d2] bg-white px-6 py-2.5 text-sm font-extrabold text-[#9e6376] transition-transform duration-500 ease-out active:brightness-95"
            >
              Để hôm khác
            </button>
          )}
        </div>
      </section>
    </PageShell>
  );
}

function ErrorMessage({ message }) {
  return (
    <p
      role="alert"
      className="mt-4 rounded-2xl bg-[#fff0f2] px-4 py-3 text-center text-sm font-bold text-[#bd476c]"
    >
      {message}
    </p>
  );
}

function PageShell({ children }) {
  return (
    <main className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#fff4f7] px-5 py-8 font-display text-[#5d3544]">
      <Background />
      {children}
    </main>
  );
}

function Background() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#ffc8da]/50 blur-2xl" />
      <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-[#ffd8ad]/45 blur-3xl" />
      <div className="absolute left-1/2 top-[18%] h-44 w-44 -translate-x-1/2 rounded-full bg-white/70 blur-3xl" />
      {floatingDecorations.map(([decoration, position, delay]) => (
        <span
          key={position}
          className={`absolute ${position} ${delay} animate-float text-2xl font-black text-[#eca4bc]/70`}
        >
          {decoration}
        </span>
      ))}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-[radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.9),transparent_68%)]" />
    </div>
  );
}
