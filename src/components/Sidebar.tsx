"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const pathname = usePathname() || "/";

  const links = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/posts", label: "Posts", icon: "📝" },
    { href: "/users", label: "Users", icon: "👥" },
  ];

  return (
    <aside className={`sidebar ${open ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <button
          type="button"
          aria-expanded={open}
          className="sidebar-toggle"
          title={open ? "Collapse sidebar" : "Open sidebar"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "◀" : "▶"}
        </button>

        <h2 className="sidebar-title">
          <span className="label">Zettabyte</span>
        </h2>
      </div>

      <nav className="sidebar-nav" aria-label="Main navigation">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`nav-link ${pathname === l.href ? "active" : ""}`}
            aria-label={l.label}
          >
            <span className="icon" aria-hidden>
              {l.icon}
            </span>
            <span className="label">{l.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
