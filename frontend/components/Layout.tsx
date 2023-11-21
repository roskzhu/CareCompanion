import React, { ReactNode } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';
import Head from 'next/head'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => {
  const router = useRouter();

  const isCurrentPage = (href: string) => router.pathname === href;

  return (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav>
        <div className="logo">
          <span>
            CareCompanion
          </span>
        </div>
        <div className="nav-links">
          {/* <Link href="/">Home</Link> | <Link href="/about">About</Link> |{' '}
          <Link href="/users">Users List</Link> |{' '} */}
          {/* <a href="/api/users">xxx</a> */}
          <Link href="/" style={{ fontWeight: isCurrentPage('/') ? 'bold' : 'normal' }}>
            Home
          </Link>
          <Link href="/chat" style={{ fontWeight: isCurrentPage('/chat') ? 'bold' : 'normal' }}>
            Chat
          </Link>
        </div>
      </nav>
    </header>
    {children}
    <footer>
      <hr />
      <span style={{fontSize:'0.8em'}}>
        Made by Rosanne. ©
      </span>
    </footer>
  </div>
);
};

export default Layout
