import { el } from "../foundation/dom.js";
import { L, onLang, getLang } from "../foundation/i18n.js";
import { getSlots, isoDate, visitConfig } from "../data/visit.js";
import { waLink } from "../data/school.js";
const locale = () => (getLang() === "en" ? "en-GB" : "id-ID");
const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
export function initPage() {
  const root = document.getElementById("visit-root");
  const today = startOfDay(new Date());
  const last = new Date(today);
  last.setDate(last.getDate() + visitConfig.horizonDays);
  const state = {
    month: new Date(today.getFullYear(), today.getMonth(), 1),
    date: null,
    slot: null,
    slots: [],
    step: "pick",
    form: { name: "", phone: "", note: "" },
    errors: {},
  };
  const fmtLong = (d) =>
    d.toLocaleDateString(locale(), {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  const available = (d) => d >= today && d <= last && d.getDay() !== 0;
  const message = () => {
    const f = state.form;
    return (
      L("Halo BGKS, saya ", "Hello BGKS, I am ") +
      f.name +
      L(
        ". Saya ingin menjadwalkan kunjungan ke sekolah pada ",
        ". I would like to schedule a visit to the school on ",
      ) +
      fmtLong(state.date) +
      L(" pukul ", " at ") +
      state.slot +
      "." +
      (f.note ? "\n" + f.note : "") +
      L("\nNomor yang dapat dihubungi: ", "\nContact number: ") +
      f.phone +
      L(
        "\nMohon konfirmasi ketersediaan jadwalnya. Terima kasih.",
        "\nPlease confirm whether the slot is available. Thank you.",
      )
    );
  };
  const calendar = () => {
    const m = state.month;
    const first = new Date(m.getFullYear(), m.getMonth(), 1);
    const days = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate();
    const head = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(2024, 0, 7 + i);
      head.push(
        el("span", {
          class: "vcal__dow",
          text: d.toLocaleDateString(locale(), { weekday: "short" }),
        }),
      );
    }
    const cells = [];
    for (let i = 0; i < first.getDay(); i++)
      cells.push(el("span", { class: "vcal__blank", "aria-hidden": "true" }));
    for (let n = 1; n <= days; n++) {
      const d = new Date(m.getFullYear(), m.getMonth(), n);
      const ok = available(d);
      const sel = state.date && isoDate(state.date) === isoDate(d);
      const b = el("button", {
        class: "vcal__day" + (sel ? " is-on" : ""),
        type: "button",
        text: String(n),
        disabled: !ok,
        "aria-pressed": String(!!sel),
        "aria-label": fmtLong(d),
      });
      if (ok)
        b.addEventListener("click", async () => {
          state.date = d;
          state.slot = null;
          state.slots = await getSlots(d);
          paint();
        });
      cells.push(b);
    }
    const prevOk = new Date(m.getFullYear(), m.getMonth(), 0) >= today;
    const nextOk = new Date(m.getFullYear(), m.getMonth() + 1, 1) <= last;
    const nav = (dir, ok, label, glyph) => {
      const b = el("button", {
        class: "chip",
        type: "button",
        disabled: !ok,
        "aria-label": label,
        text: glyph,
      });
      b.addEventListener("click", () => {
        state.month = new Date(m.getFullYear(), m.getMonth() + dir, 1);
        paint();
      });
      return b;
    };
    return el(
      "div",
      { class: "vcal" },
      el(
        "div",
        { class: "vcal__bar" },
        nav(-1, prevOk, L("Bulan sebelumnya", "Previous month"), "\u2039"),
        el("h2", {
          text: m.toLocaleDateString(locale(), {
            month: "long",
            year: "numeric",
          }),
          "aria-live": "polite",
        }),
        nav(1, nextOk, L("Bulan berikutnya", "Next month"), "\u203A"),
      ),
      el("div", { class: "vcal__grid" }, ...head, ...cells),
      el("p", {
        class: "caption",
        text: L(
          "Hari Minggu tidak tersedia untuk kunjungan.",
          "Sundays are not available for visits.",
        ),
      }),
    );
  };
  const slotsPanel = () => {
    if (!state.date)
      return el(
        "div",
        { class: "vslots vslots--empty" },
        el("p", {
          class: "muted",
          text: L(
            "Pilih tanggal untuk melihat slot waktu.",
            "Pick a date to see time slots.",
          ),
        }),
      );
    return el(
      "div",
      { class: "vslots" },
      el("h3", { text: fmtLong(state.date) }),
      el(
        "div",
        {
          class: "vslots__list",
          role: "group",
          "aria-label": L("Slot waktu", "Time slots"),
        },
        ...state.slots.map((s) => {
          const b = el("button", {
            class: "chip",
            type: "button",
            "aria-pressed": String(state.slot === s),
            text: s,
          });
          b.addEventListener("click", () => {
            state.slot = s;
            paint();
          });
          return b;
        }),
      ),
    );
  };
  const field = (name, label, type, ph) => {
    const input = el("input", {
      id: "v-" + name,
      name,
      type,
      value: state.form[name],
      autocomplete: name === "name" ? "name" : "tel",
      placeholder: ph || "",
    });
    input.addEventListener("input", () => {
      state.form[name] = input.value;
    });
    const err = state.errors[name];
    if (err) {
      input.setAttribute("aria-invalid", "true");
      input.setAttribute("aria-describedby", "v-" + name + "-err");
    }
    return el(
      "div",
      { class: "field" + (err ? " field--err" : "") },
      el("label", { for: "v-" + name, text: label }),
      input,
      err
        ? el("p", {
            class: "field__error",
            id: "v-" + name + "-err",
            text: err,
          })
        : null,
    );
  };
  const formPanel = () => {
    const note = el("textarea", {
      id: "v-note",
      name: "note",
      value: state.form.note,
      rows: 3,
    });
    note.value = state.form.note;
    note.addEventListener("input", () => {
      state.form.note = note.value;
    });
    const go = el("button", {
      class: "btn btn--primary btn--go",
      type: "submit",
      text: L("Lihat Ringkasan", "Review Summary"),
    });
    const f = el(
      "form",
      { class: "form vform", novalidate: true },
      field(
        "name",
        L("Nama orang tua atau wali", "Parent or guardian name"),
        "text",
      ),
      field("phone", L("Nomor yang dapat dihubungi", "Contact number"), "tel"),
      el(
        "div",
        { class: "field" },
        el("label", {
          for: "v-note",
          text: L("Catatan (opsional)", "Notes (optional)"),
        }),
        note,
      ),
      go,
    );
    f.addEventListener("submit", (e) => {
      e.preventDefault();
      state.errors = {};
      if (state.form.name.trim().length < 2)
        state.errors.name = L(
          "Tuliskan nama orang tua atau wali.",
          "Enter the parent or guardian name.",
        );
      if (!/^\+?[0-9][0-9\s-]{7,16}$/.test(state.form.phone.trim()))
        state.errors.phone = L(
          "Masukkan nomor telepon yang valid, misalnya 0812 3456 7890.",
          "Enter a valid phone number, for example 0812 3456 7890.",
        );
      if (Object.keys(state.errors).length) {
        paint();
        const first = root.querySelector('[aria-invalid="true"]');
        if (first) first.focus();
        return;
      }
      state.step = "summary";
      paint();
    });
    return f;
  };
  const summary = () => {
    const wa = waLink(message());
    const back = el("button", {
      class: "btn btn--ghost",
      type: "button",
      text: L("Ubah Data", "Edit Details"),
    });
    back.addEventListener("click", () => {
      state.step = "pick";
      paint();
    });
    return el(
      "div",
      { class: "vsum" },
      el("h2", { text: L("Ringkasan kunjungan", "Visit summary") }),
      el(
        "dl",
        { class: "vsum__list" },
        el(
          "div",
          null,
          el("dt", { text: L("Tanggal", "Date") }),
          el("dd", { text: fmtLong(state.date) }),
        ),
        el(
          "div",
          null,
          el("dt", { text: L("Waktu", "Time") }),
          el("dd", { text: state.slot }),
        ),
        el(
          "div",
          null,
          el("dt", { text: L("Nama", "Name") }),
          el("dd", { text: state.form.name }),
        ),
        el(
          "div",
          null,
          el("dt", { text: L("Kontak", "Contact") }),
          el("dd", { text: state.form.phone }),
        ),
      ),
      el("p", {
        class: "vsum__note",
        text: L(
          "Menekan tombol di bawah hanya membuka WhatsApp dengan pesan yang sudah terisi. Jadwal belum tercatat di kalender sekolah dan baru pasti setelah sekolah mengonfirmasi.",
          "The button below only opens WhatsApp with the message filled in. The visit is not yet recorded in the school calendar and is only final once the school confirms it.",
        ),
      }),
      el(
        "div",
        { class: "vsum__actions" },
        el("a", {
          class: "btn btn--primary btn--go",
          href: wa,
          target: "_blank",
          rel: "noopener",
          text: L("Lanjut ke WhatsApp", "Continue to WhatsApp"),
        }),
        back,
      ),
    );
  };
  function paint() {
    const marks = ["pick", "pick", "pick", "summary"];
    document.querySelectorAll(".visit-steps li").forEach((li, i) => {
      const done =
        state.step === "summary"
          ? i < 3
          : i === 0
            ? !!state.date
            : i === 1
              ? !!state.slot
              : false;
      li.classList.toggle("is-done", done);
    });
    if (state.step === "summary") {
      root.replaceChildren(summary());
      return;
    }
    const right = el(
      "div",
      { class: "visit__side" },
      slotsPanel(),
      state.date && state.slot
        ? formPanel()
        : el("p", {
            class: "muted",
            text: state.date
              ? L(
                  "Pilih slot waktu untuk melanjutkan.",
                  "Pick a time slot to continue.",
                )
              : "",
          }),
    );
    root.replaceChildren(
      el("div", { class: "visit__grid" }, calendar(), right),
    );
  }
  paint();
  onLang(paint);
}
