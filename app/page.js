import Image from "next/image";
import Link from "next/link";
import bg from "./assets/bg.png";
import { FiShield, FiTrendingUp } from "react-icons/fi";

export default function Test() {

  const metrics = [
    { label: "Books available", value: "10k+" },
    { label: "Daily orders", value: "2.4k" },
    { label: "Customer rating", value: "4.9/5" },
  ];

  return (
    <div className="grid lg:grid-cols-[1.1fr_0.9fr] w-[90%] lg:w-[80%] my-10 lg:my-auto mx-auto shadow-md shadow-[color:var(--foreground)] rounded-2xl">
      <div className="left rounded-l-2xl p-6 lg:p-10 flex flex-col gap-4">
        <div className="flex gap-2 px-3 py-1 items-center border-2 border-[color:var(--foreground)] bg-(--input-icon-bg) w-fit rounded-full font-semibold">
          <FiTrendingUp className="text-xl lg:text-2xl" />
          <span className="text-xs lg:text-lg">Bookstore platform overview</span>
        </div>
        <div className="maincontent flex flex-col gap-4">
          <h1 className="lg:text-5xl text-3xl font-semibold leading-tight">A modern bookstore experience for readers, users, and growing teams.</h1>
          <p className="lg:text-lg text-base leading-8">
            This application brings together account access, book browsing, cart management, and secure ordering in one polished digital storefront designed for convenience and scale.
          </p>
        </div>
        <div className="btns flex flex-col lg:flex-row flex-wrap gap-5 lg:gap-20 items-center">
          <Link href="/user/login" className="rounded-3xl bg-[color:var(--foreground)] px-5 py-3 text-sm font-semibold text-[color:var(--background)] transition hover:opacity-90">
            Explore the portal
          </Link>
          <Link href="#features" className="rounded-3xl border border-[color:var(--foreground)] px-5 py-3 text-sm font-semibold text-[color:var(--foreground)] transition hover:bg-(--input-icon-bg)">
            View All Books
          </Link>
        </div>
      </div>
      <div className="right bg-[linear-gradient(135deg,_#0f172a,_#2563eb)] rounded-b-2xl lg:rounded-bl-none sm:rounded-t-none lg:rounded-r-2xl p-0 lg:p-10 flex flex-col gap-4 justify-between w-fit md:w-full">
        <div className="image flex flex-col items-center">
          <Image src={bg} className="w-[170px] h-[100px]" />
          <p className="text-xl font-semibold tracking-tight uppercase text-white">Book Store</p>
        </div>
        <div className="p-4">
          <div className="rounded-3xl bg-white/10 p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-white/15">
                <FiShield className="text-2xl text-white" />
              </div>
              <div>
                <p className="text-lg font-semibold text-white">Built for trust</p>
                <p className="text-sm text-slate-200">Secure login, clear flows, and dependable checkout.</p>
              </div>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {metrics.map((item, index) => (
                <div key={index} className="rounded-3xl bg-slate-950/20 p-3 text-center">
                  <p className="text-2xl font-semibold text-white">{item.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-200">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}