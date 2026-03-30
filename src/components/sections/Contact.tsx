"use client";

import { useState } from "react";
import { intel } from "@/lib/store";

export default function Contact() {
  const [btnText, setBtnText] = useState("Send message");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBtnText("Sending...");
    intel.interaction = 1;

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });

      if (res.ok) {
        setBtnText("Sent ✓");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        const errorData = await res.json();
        if (errorData.error && errorData.error.includes("GMAIL_APP_PASSWORD")) {
          alert('System Notice: Email relay requires GMAIL_APP_PASSWORD to be configured in .env');
        }
        setBtnText("Error! Retry");
      }
    } catch (e) {
      setBtnText("Error!");
    }

    setTimeout(() => setBtnText("Send message"), 4000);
  };

  return (
    <>
      <section className="section" id="contact">
        <div className="contact-bg">Contact</div>
        <div className="wrap">
          <div className="contact-grid" style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(201,168,76, 0.3)',
              boxShadow: '0 0 40px rgba(201,168,76, 0.08)',
              padding: '3rem',
              borderRadius: '24px'
            }}>
            <div>
              <div className="s-marker reveal"><span className="s-marker-num">08</span>Contact</div>
              <h2 className="contact-heading reveal" style={{ textShadow: '0 0 20px rgba(201,168,76, 0.4)' }}>Let's<br/>build<br/>something<br/>great.</h2>
              <div className="reveal d2">
                <a href="mailto:ankitpremiji@gmail.com" className="c-link">
                  <div className="c-link-l">
                    <div className="c-icon">✉</div>
                    <span className="c-text">ankitpremiji@gmail.com</span>
                  </div>
                  <span className="c-arr">↗</span>
                </a>
                <a href="https://linkedin.com/in/ankit-premi" target="_blank" rel="noreferrer" className="c-link">
                  <div className="c-link-l">
                    <div className="c-icon" style={{ fontSize: '.55rem', fontWeight: 700 }}>in</div>
                    <span className="c-text">linkedin.com/in/ankit-premi</span>
                  </div>
                  <span className="c-arr">↗</span>
                </a>
                <a href="https://github.com/ankitpremi" target="_blank" rel="noreferrer" className="c-link">
                  <div className="c-link-l">
                    <div className="c-icon"></div>
                    <span className="c-text">github.com/ankitpremi</span>
                  </div>
                  <span className="c-arr">↗</span>
                </a>
                <a href="https://leetcode.com/u/ankitpremiji/" target="_blank" rel="noreferrer" className="c-link">
                  <div className="c-link-l">
                    <div className="c-icon">◈</div>
                    <span className="c-text">leetcode.com/u/ankitpremiji</span>
                  </div>
                  <span className="c-arr">↗</span>
                </a>
              </div>
            </div>
            <form className="c-form reveal d1" id="cform" onSubmit={handleSubmit}>
              <div className="c-field">
                <label>Name</label>
                <input type="text" required value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div className="c-field" style={{ marginTop: 24 }}>
                <label>Email</label>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="c-field" style={{ marginTop: 24 }}>
                <label>Message</label>
                <textarea required value={message} onChange={e => setMessage(e.target.value)}></textarea>
              </div>
              <button type="submit" className="c-submit" id="stext" style={{ background: 'var(--gold)', color: '#000', fontWeight: 600 }}>
                {btnText} <span className="c-sarr">→</span>
              </button>
            </form>
          </div>
        </div>
      </section>
      
      <footer>
        <div className="fl">© 2026 Ankit Premi</div>
        <div className="fr">Designed &amp; Engineered by <a href="#">Ankit</a></div>
      </footer>
    </>
  );
}
