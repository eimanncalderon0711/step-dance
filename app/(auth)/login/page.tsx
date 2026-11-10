"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, Eye, EyeOff, LoaderCircle, LockKeyhole, Mail, ShieldCheck } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import HomeAppearance, { HomeThemeToggle } from "@/components/HomeAppearance"
import "@/app/home.css"
import styles from "./login.module.css"

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    router.push("/admin")
    router.refresh()
  }

  return (
    <HomeAppearance>
      <div className={styles.page}>
        <header className={styles.header}>
          <Link href="/" className={styles.brand} aria-label="StepDance PH home">
            StepDance<span>PH</span>
          </Link>
          <HomeThemeToggle />
        </header>

        <main className={styles.main}>
          <section className={styles.intro} aria-labelledby="intro-title">
            <p className="home-eyebrow">StepDance PH / Admin</p>
            <h1 id="intro-title">Behind every<br />great <span>session.</span></h1>
            <p className={styles.description}>Keep the rhythm going. Manage your bookings, organize sessions, and bring your community together.</p>
            <div className={styles.signature}>
              <span>STEP. SLAY. REPEAT.</span>
              <span>Cagayan de Oro City</span>
            </div>
          </section>

          <section className={styles.card} aria-labelledby="login-title">
            <div className={styles.icon}><LockKeyhole size={23} aria-hidden="true" /></div>
            <p className={styles.eyebrow}>YOUR ADMIN SPACE</p>
            <h2 id="login-title">Welcome back.</h2>
            <p className={styles.subtitle}>Sign in to your StepDance PH account.</p>

            <form onSubmit={handleLogin} className={styles.form} aria-busy={loading}>
              <div className={styles.field}>
                <label htmlFor="email">Email address</label>
                <div className={styles.inputWrap}>
                  <Mail size={18} aria-hidden="true" />
                  <input id="email" name="email" type="email" autoComplete="username" required placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
              <div className={styles.field}>
                <label htmlFor="password">Password</label>
                <div className={styles.inputWrap}>
                  <LockKeyhole size={18} aria-hidden="true" />
                  <input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" required placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <button type="button" className={styles.reveal} onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              {error && <p className={styles.error} role="alert">{error}</p>}
              <button type="submit" disabled={loading} className={styles.submit}>
                {loading ? <>Signing in… <LoaderCircle size={18} className={styles.spinner} aria-hidden="true" /></> : <>Sign in <ArrowUpRight size={19} aria-hidden="true" /></>}
              </button>
            </form>
            <p className={styles.access}><ShieldCheck size={16} aria-hidden="true" /> Authorized team members only</p>
          </section>
        </main>

        <footer className={styles.footer}>
          <Link href="/"><ArrowLeft size={15} aria-hidden="true" /> Back to website</Link>
          <span>StepDance PH · Move with purpose.</span>
        </footer>
      </div>
    </HomeAppearance>
  )
}
