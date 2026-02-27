const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";

// Color palette — calm, accessible, trustworthy
const C = {
  navy:    "1A2E4A",
  teal:    "0D9488",
  mint:    "CCFBF1",
  white:   "FFFFFF",
  offwhite:"F8FAFC",
  gray:    "64748B",
  lightgray:"E2E8F0",
  accent:  "F59E0B",
};

const makeShadow = () => ({ type: "outer", blur: 8, offset: 3, angle: 135, color: "000000", opacity: 0.10 });

// ─────────────────────────────────────────
// SLIDE 1 — Title
// ─────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.navy };

  // Left teal accent bar
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.18, h: 5.625, fill: { color: C.teal }, line: { color: C.teal } });

  // Top-right mint dot decoration
  s.addShape(pres.shapes.OVAL, { x: 8.6, y: -0.4, w: 2.2, h: 2.2, fill: { color: C.teal, transparency: 75 }, line: { color: C.teal, transparency: 75 } });
  s.addShape(pres.shapes.OVAL, { x: 9.1, y: 3.8, w: 1.4, h: 1.4, fill: { color: C.teal, transparency: 85 }, line: { color: C.teal, transparency: 85 } });

  // Tag line chip
  s.addShape(pres.shapes.RECTANGLE, { x: 0.55, y: 1.1, w: 2.6, h: 0.36, fill: { color: C.teal }, line: { color: C.teal }, rectRadius: 0.05 });
  s.addText("HACKATHON PITCH", { x: 0.55, y: 1.1, w: 2.6, h: 0.36, fontSize: 9, bold: true, color: C.white, align: "center", valign: "middle", margin: 0 });

  s.addText("Study Buddy", { x: 0.5, y: 1.65, w: 8.5, h: 1.3, fontSize: 58, bold: true, color: C.white, fontFace: "Georgia" });
  s.addText("An AI learning companion for students with dyslexia", { x: 0.5, y: 2.95, w: 7.5, h: 0.6, fontSize: 20, color: C.mint, fontFace: "Calibri", italic: true });

  // Bottom bar
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.2, w: 10, h: 0.425, fill: { color: C.teal, transparency: 80 }, line: { color: C.teal, transparency: 80 } });
  s.addText("University of Greenwich  ·  Google ADC-Inspired Hackathon  ·  27/02/2026", {
    x: 0.3, y: 5.2, w: 9.5, h: 0.425, fontSize: 10, color: C.mint, align: "center", valign: "middle", margin: 0
  });
}

// ─────────────────────────────────────────
// SLIDE 2 — The Problem
// ─────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.offwhite };

  // Header band
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.0, fill: { color: C.navy }, line: { color: C.navy } });
  s.addText("THE PROBLEM", { x: 0.4, y: 0, w: 9, h: 1.0, fontSize: 28, bold: true, color: C.white, valign: "middle", fontFace: "Georgia", margin: 0 });

  // Big stat
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 1.25, w: 2.8, h: 2.5, fill: { color: C.teal }, line: { color: C.teal }, shadow: makeShadow() });
  s.addText("10%", { x: 0.4, y: 1.35, w: 2.8, h: 1.3, fontSize: 64, bold: true, color: C.white, align: "center", valign: "middle", fontFace: "Georgia", margin: 0 });
  s.addText("of the population\nhas dyslexia", { x: 0.4, y: 2.7, w: 2.8, h: 0.9, fontSize: 13, color: C.mint, align: "center", valign: "top", margin: 0 });

  // Problem bullets as cards
  const problems = [
    { title: "Dense academic text", desc: "Lecture slides and readings are packed with jargon and long sentences." },
    { title: "Cognitive overload", desc: "Students burn energy decoding text — before any real learning begins." },
    { title: "Zero inclusive design", desc: "Most university content is built for neurotypical readers by default." },
  ];
  problems.forEach((p, i) => {
    const y = 1.25 + i * 0.88;
    s.addShape(pres.shapes.RECTANGLE, { x: 3.55, y, w: 6.1, h: 0.78, fill: { color: C.white }, line: { color: C.lightgray }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 3.55, y, w: 0.1, h: 0.78, fill: { color: C.accent }, line: { color: C.accent } });
    s.addText(p.title, { x: 3.8, y: y + 0.04, w: 5.7, h: 0.28, fontSize: 13, bold: true, color: C.navy, valign: "middle", margin: 0 });
    s.addText(p.desc,  { x: 3.8, y: y + 0.34, w: 5.7, h: 0.36, fontSize: 11, color: C.gray, valign: "top", margin: 0 });
  });

  s.addText("The format is the barrier — not the student's ability.", {
    x: 0.4, y: 4.85, w: 9.2, h: 0.4, fontSize: 14, bold: true, italic: true, color: C.teal, align: "center", margin: 0
  });
}

// ─────────────────────────────────────────
// SLIDE 3 — Meet the User
// ─────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.navy };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.0, fill: { color: C.teal }, line: { color: C.teal } });
  s.addText("MEET AMARA", { x: 0.4, y: 0, w: 9, h: 1.0, fontSize: 28, bold: true, color: C.white, valign: "middle", fontFace: "Georgia", margin: 0 });

  // Avatar circle
  s.addShape(pres.shapes.OVAL, { x: 0.5, y: 1.2, w: 2.2, h: 2.2, fill: { color: C.teal, transparency: 20 }, line: { color: C.teal } });
  s.addText("👩🏾‍💻", { x: 0.5, y: 1.2, w: 2.2, h: 2.2, fontSize: 52, align: "center", valign: "middle", margin: 0 });

  s.addText("Amara", { x: 0.5, y: 3.5, w: 2.2, h: 0.4, fontSize: 16, bold: true, color: C.mint, align: "center", margin: 0 });
  s.addText("1st Year CS Student", { x: 0.5, y: 3.85, w: 2.2, h: 0.35, fontSize: 11, color: C.gray, align: "center", margin: 0 });

  // Quote card
  s.addShape(pres.shapes.RECTANGLE, { x: 3.1, y: 1.15, w: 6.5, h: 1.5, fill: { color: "243B55" }, line: { color: C.teal }, shadow: makeShadow() });
  s.addText('"I understand everything when someone explains it to me. But staring at a 40-page PDF at 11pm before an exam… I just freeze."', {
    x: 3.3, y: 1.25, w: 6.1, h: 1.3, fontSize: 13, italic: true, color: C.white, valign: "middle", margin: 0
  });

  // Situation cards
  const cards = [
    { emoji: "📄", text: "Uploads her Operating Systems lecture PDF" },
    { emoji: "🔄", text: "Study Buddy simplifies it to her reading level" },
    { emoji: "🎧", text: "Listens to an audio summary on the bus" },
    { emoji: "✅", text: "Walks into her seminar actually prepared" },
  ];
  cards.forEach((c, i) => {
    const x = 3.1 + (i % 2) * 3.3;
    const y = 2.9 + Math.floor(i / 2) * 1.1;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 3.1, h: 0.85, fill: { color: "243B55" }, line: { color: C.teal, transparency: 60 }, shadow: makeShadow() });
    s.addText(c.emoji, { x, y, w: 0.7, h: 0.85, fontSize: 22, align: "center", valign: "middle", margin: 0 });
    s.addText(c.text, { x: x + 0.68, y, w: 2.38, h: 0.85, fontSize: 11, color: C.white, valign: "middle", margin: 0 });
  });
}

// ─────────────────────────────────────────
// SLIDE 4 — The Solution / Features
// ─────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.offwhite };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.0, fill: { color: C.navy }, line: { color: C.navy } });
  s.addText("THE SOLUTION", { x: 0.4, y: 0, w: 9, h: 1.0, fontSize: 28, bold: true, color: C.white, valign: "middle", fontFace: "Georgia", margin: 0 });

  const features = [
    { emoji: "✏️", title: "Text Simplifier",    desc: "Gemini rewrites content at an adjustable reading level. Shorter sentences, no passive voice, plain English." },
    { emoji: "🎧", title: "Audio Mode",          desc: "NotebookLM turns notes into a podcast-style summary. Learn on the bus, not just at a desk." },
    { emoji: "📅", title: "Study Planner",       desc: "Breaks readings into 10-minute chunks. Estimates time adjusted for a dyslexic reader's pace." },
    { emoji: "📖", title: "Vocabulary Spotter",  desc: "Auto-highlights jargon and builds a personal glossary. Tap any word for an instant plain-English definition." },
    { emoji: "🖥️", title: "Visual Layout",       desc: "Dyslexia-friendly typography: wide spacing, left-aligned text, pastel backgrounds, OpenDyslexic font." },
    { emoji: "🃏", title: "Flashcard Quiz",      desc: "Gemini generates smart flashcards from simplified notes. Active recall built into the workflow." },
  ];

  features.forEach((f, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.35 + col * 3.15;
    const y = 1.18 + row * 2.1;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 3.0, h: 1.85, fill: { color: C.white }, line: { color: C.lightgray }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 3.0, h: 0.08, fill: { color: C.teal }, line: { color: C.teal } });
    s.addText(f.emoji, { x, y: y + 0.12, w: 0.7, h: 0.55, fontSize: 22, align: "center", valign: "middle", margin: 0 });
    s.addText(f.title, { x: x + 0.65, y: y + 0.12, w: 2.25, h: 0.55, fontSize: 13, bold: true, color: C.navy, valign: "middle", margin: 0 });
    s.addText(f.desc,  { x: x + 0.15, y: y + 0.72, w: 2.72, h: 1.05, fontSize: 10.5, color: C.gray, valign: "top", margin: 0 });
  });
}

// ─────────────────────────────────────────
// SLIDE 5 — Tech Stack
// ─────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.navy };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.0, fill: { color: C.teal }, line: { color: C.teal } });
  s.addText("POWERED BY GOOGLE", { x: 0.4, y: 0, w: 9, h: 1.0, fontSize: 28, bold: true, color: C.white, valign: "middle", fontFace: "Georgia", margin: 0 });

  const tools = [
    { name: "Gemini",        role: "Text simplification, flashcard generation, study planning" },
    { name: "NotebookLM",    role: "Audio podcast summaries from uploaded lecture notes" },
    { name: "Google AI Studio", role: "Prompt prototyping and tuning simplification tone/level" },
    { name: "Google Colab",  role: "Readability scoring (Flesch-Kincaid) before & after" },
    { name: "Firebase",      role: "Saving user preferences, glossaries, and note history" },
    { name: "Google Drive",  role: "Pull lecture notes directly — no copy-pasting needed" },
  ];

  tools.forEach((t, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.35 + col * 4.85;
    const y = 1.2 + row * 1.35;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.6, h: 1.1, fill: { color: "1E3A5F" }, line: { color: C.teal, transparency: 50 }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.12, h: 1.1, fill: { color: C.teal }, line: { color: C.teal } });
    s.addText(t.name, { x: x + 0.25, y: y + 0.1, w: 4.2, h: 0.38, fontSize: 14, bold: true, color: C.mint, valign: "middle", margin: 0 });
    s.addText(t.role, { x: x + 0.25, y: y + 0.5, w: 4.2, h: 0.5,  fontSize: 11, color: "A0B8CC", valign: "top", margin: 0 });
  });
}

// ─────────────────────────────────────────
// SLIDE 6 — Ethics & Accessibility
// ─────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.offwhite };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.0, fill: { color: C.navy }, line: { color: C.navy } });
  s.addText("ETHICS & ACCESSIBILITY", { x: 0.4, y: 0, w: 9, h: 1.0, fontSize: 28, bold: true, color: C.white, valign: "middle", fontFace: "Georgia", margin: 0 });

  const points = [
    { emoji: "🤝", title: "Co-designed with users",    desc: "Built with dyslexic students, not just for them. Tested for real usability, not just compliance." },
    { emoji: "🔒", title: "Privacy first",             desc: "No data stored beyond the session unless the user explicitly opts in. Transparent about what AI rewrites." },
    { emoji: "⚖️", title: "Academic integrity",        desc: "Always flags when content has been simplified. Students still engage with the original ideas — just accessibly." },
    { emoji: "🚫", title: "Avoids bias",               desc: "Doesn't 'fix' dyslexia. Removes format barriers so ability can shine. Language stays respectful and empowering." },
  ];

  points.forEach((p, i) => {
    const x = i % 2 === 0 ? 0.35 : 5.15;
    const y = i < 2 ? 1.25 : 3.25;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.6, h: 1.75, fill: { color: C.white }, line: { color: C.lightgray }, shadow: makeShadow() });
    s.addText(p.emoji, { x, y: y + 0.15, w: 0.9, h: 0.9, fontSize: 28, align: "center", valign: "middle", margin: 0 });
    s.addText(p.title, { x: x + 0.88, y: y + 0.18, w: 3.55, h: 0.4, fontSize: 13, bold: true, color: C.navy, valign: "middle", margin: 0 });
    s.addText(p.desc,  { x: x + 0.88, y: y + 0.62, w: 3.55, h: 1.0, fontSize: 11, color: C.gray, valign: "top", margin: 0 });
  });
}

// ─────────────────────────────────────────
// SLIDE 7 — Closing
// ─────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.navy };

  s.addShape(pres.shapes.OVAL, { x: -0.8, y: -0.8, w: 3.5, h: 3.5, fill: { color: C.teal, transparency: 80 }, line: { color: C.teal, transparency: 80 } });
  s.addShape(pres.shapes.OVAL, { x: 7.8,  y: 3.5,  w: 3.0, h: 3.0, fill: { color: C.teal, transparency: 80 }, line: { color: C.teal, transparency: 80 } });

  s.addText("Study Buddy doesn't change\nhow Amara thinks.", {
    x: 0.6, y: 0.8, w: 8.8, h: 1.8, fontSize: 36, bold: true, color: C.white, align: "center", fontFace: "Georgia", margin: 0
  });
  s.addText("It changes how her university speaks to her.", {
    x: 0.6, y: 2.5, w: 8.8, h: 0.8, fontSize: 24, italic: true, color: C.mint, align: "center", fontFace: "Georgia", margin: 0
  });

  // Divider
  s.addShape(pres.shapes.RECTANGLE, { x: 3.5, y: 3.5, w: 3.0, h: 0.05, fill: { color: C.teal }, line: { color: C.teal } });

  s.addText("Inclusive AI. Real impact. Built with Google.", {
    x: 0.6, y: 3.75, w: 8.8, h: 0.5, fontSize: 14, color: C.gray, align: "center", margin: 0
  });

  // Submit info
  s.addShape(pres.shapes.RECTANGLE, { x: 2.0, y: 4.45, w: 6.0, h: 0.75, fill: { color: C.teal, transparency: 85 }, line: { color: C.teal, transparency: 60 } });
  s.addText("Submit by 5pm · 06/03/2026 · T.VUONG@GRE.AC.UK", {
    x: 2.0, y: 4.45, w: 6.0, h: 0.75, fontSize: 11, color: C.mint, align: "center", valign: "middle", margin: 0
  });
}

pres.writeFile({ fileName: "StudyBuddy_Pitch.pptx" }).then(() => {
  console.log("✅ StudyBuddy_Pitch.pptx created!");
});
