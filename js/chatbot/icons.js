const wrap = (d) =>
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
  d +
  "</svg>";
export const icons = {
  book: wrap('<path d="M4 5h7a3 3 0 0 1 3 3v11a2 2 0 0 0-2-2H4z"/><path d="M20 5h-4v12h4z"/>'),
  clipboard: wrap('<rect x="6" y="4" width="12" height="17" rx="2"/><path d="M9 4h6v3H9zM9 12h6M9 16h4"/>'),
  home: wrap('<path d="M4 11l8-7 8 7"/><path d="M6 10v10h12V10"/><path d="M10 20v-5h4v5"/>'),
  door: wrap('<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4v17M13 12h.01"/>'),
  pin: wrap('<path d="M12 21s-6-5.6-6-10a6 6 0 0 1 12 0c0 4.4-6 10-6 10z"/><circle cx="12" cy="11" r="2"/>'),
  launcher:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M6 3.5h12a3.5 3.5 0 0 1 3.5 3.5v7a3.5 3.5 0 0 1-3.5 3.5h-5.5L8 21v-3.5H6A3.5 3.5 0 0 1 2.5 14V7A3.5 3.5 0 0 1 6 3.5z"/><g fill="currentColor" stroke="none"><circle cx="8" cy="10.5" r="1.4"/><circle cx="12" cy="10.5" r="1.4"/><circle cx="16" cy="10.5" r="1.4"/></g></svg>',
  chat: wrap('<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/><path d="M9 11h.01M12 11h.01M15 11h.01"/>'),
  back: wrap('<path d="M9 14L4 9l5-5"/><path d="M4 9h10a6 6 0 0 1 6 6v3"/>'),
  send: wrap('<path d="M5 12h14"/><path d="M13 6l6 6-6 6"/>'),
  refresh: wrap('<path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 5v6h-6"/>'),
  close: wrap('<path d="M6 6l12 12M18 6L6 18"/>'),
  wa: wrap('<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/><path d="M9 9c0 3 3 6 6 6l1.2-1.6-2-1-1 .6c-.8-.4-1.6-1.2-2-2l.6-1-1-2z"/>'),
  link: wrap('<path d="M7 17L17 7"/><path d="M8 7h9v9"/>'),
  chevron: wrap('<path d="M6 9l6 6 6-6"/>'),
};
