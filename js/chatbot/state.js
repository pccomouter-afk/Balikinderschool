import { chatConfig } from "./config.js";
const read = () => {
  try {
    const raw = sessionStorage.getItem(chatConfig.storageKey);
    if (!raw) return [];
    const list = JSON.parse(raw);
    if (!Array.isArray(list)) return [];
    return list
      .filter((m) => m && (m.who === "user" || m.who === "bot"))
      .map((m) =>
        m.who === "user"
          ? { who: "user", text: String(m.text || "").slice(0, chatConfig.maxLength) }
          : { who: "bot", d: sanitize(m.d) },
      )
      .slice(-chatConfig.maxStored);
  } catch (err) {
    return [];
  }
};
const sanitize = (d) => {
  const o = d && typeof d === "object" ? d : {};
  const out = { id: String(o.id || "menu").slice(0, 24) };
  if (o.arg) out.arg = String(o.arg).slice(0, 40);
  if (o.q) out.q = String(o.q).slice(0, chatConfig.maxLength);
  if (Array.isArray(o.opts)) {
    out.opts = o.opts.slice(0, 3).map((x) => ({ id: String((x && x.id) || "").slice(0, 24), arg: String((x && x.arg) || "").slice(0, 40) }));
  }
  return out;
};
export function createState() {
  let messages = read();
  const save = () => {
    try {
      sessionStorage.setItem(chatConfig.storageKey, JSON.stringify(messages.slice(-chatConfig.maxStored)));
    } catch (err) {}
  };
  return {
    list: () => messages,
    push(m) {
      messages.push(m);
      if (messages.length > chatConfig.maxStored) messages = messages.slice(-chatConfig.maxStored);
      save();
    },
    reset() {
      messages = [];
      try {
        sessionStorage.removeItem(chatConfig.storageKey);
      } catch (err) {}
    },
    lastBot() {
      for (let i = messages.length - 1; i >= 0; i--) if (messages[i].who === "bot") return messages[i].d;
      return null;
    },
  };
}
