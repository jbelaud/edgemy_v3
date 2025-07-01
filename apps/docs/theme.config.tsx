import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>📚 Edgemy Docs</span>,
  project: {
    link: 'https://github.com/votre-repo/edgemy_v3',
  },
  docsRepositoryBase: 'https://github.com/votre-repo/edgemy_v3/tree/main/apps/docs',
  footer: {
    text: '© 2024 Edgemy - Plateforme de coaching poker',
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Edgemy Docs'
    }
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Edgemy Documentation" />
      <meta property="og:description" content="Documentation complète de la plateforme Edgemy" />
    </>
  ),
  sidebar: {
    titleComponent({ title, type }) {
      if (type === 'separator') {
        return <span className="cursor-default">{title}</span>
      }
      return <>{title}</>
    }
  }
}

export default config 