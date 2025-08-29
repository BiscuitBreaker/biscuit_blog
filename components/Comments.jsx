"use client";
import { useEffect } from 'react';

// Configure these when you create the GitHub repo and Giscus config
const GISCUS = {
  repo: '', // e.g. user/biscuit_blog
  repoId: '',
  category: 'General',
  categoryId: '',
};

export default function Comments() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.setAttribute('data-repo', GISCUS.repo);
    if (GISCUS.repoId) script.setAttribute('data-repo-id', GISCUS.repoId);
    script.setAttribute('data-category', GISCUS.category);
    if (GISCUS.categoryId) script.setAttribute('data-category-id', GISCUS.categoryId);
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-theme', 'dark_dimmed');
    script.setAttribute('data-lang', 'en');
    script.setAttribute('data-input-position', 'top');
    document.getElementById('giscus-container')?.appendChild(script);
  }, []);

  return <div id="giscus-container" className="mt-8" />;
}
