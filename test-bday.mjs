import { chromium } from "playwright";

const outDir = process.argv[2];
const url = "http://localhost:5500/";

const browser = await chromium.launch();

async function run(width, height, label) {
  const page = await browser.newPage({ viewport: { width, height } });
  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push("PAGEERROR: " + String(err)));
  page.on("requestfailed", (r) => errors.push("REQFAILED: " + r.url() + " " + r.failure()?.errorText));

  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForSelector("#screen-gate.active");
  await page.screenshot({ path: `${outDir}/${label}-01-gate.png` });

  // wrong name
  await page.fill("#nameInput", "wrongname");
  await page.click(".gate-form .play-btn");
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${outDir}/${label}-02-gate-error.png` });

  // correct name
  await page.fill("#nameInput", "Tatiana");
  await page.click(".gate-form .play-btn");
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${outDir}/${label}-03-envelope.png` });

  await page.click("#waxSeal");
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${outDir}/${label}-04-envelope-open.png` });

  const audioState = await page.evaluate(() => {
    const a = document.getElementById("bg-music");
    return { paused: a.paused, src: a.currentSrc, readyState: a.readyState, error: a.error };
  });
  console.log(`[${label}] audio state after open:`, audioState);

  // scroll through all sections
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${outDir}/${label}-05-scrolled-bottom.png`, fullPage: false });

  // scroll to photo section specifically
  await page.evaluate(() => {
    const sections = document.querySelectorAll(".screen");
    sections[2].scrollIntoView();
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${outDir}/${label}-06-photo.png` });

  // scroll to message
  await page.evaluate(() => {
    const sections = document.querySelectorAll(".screen");
    sections[3].scrollIntoView();
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${outDir}/${label}-07-message.png` });

  // scroll to flower
  await page.evaluate(() => {
    const sections = document.querySelectorAll(".screen");
    sections[4].scrollIntoView();
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${outDir}/${label}-08-flower.png` });

  // scroll to cake, click it
  await page.evaluate(() => {
    const sections = document.querySelectorAll(".screen");
    sections[5].scrollIntoView();
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${outDir}/${label}-09-cake.png` });
  await page.click("#cakeScene");
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${outDir}/${label}-10-cake-blown.png` });

  // scroll to closing
  await page.evaluate(() => {
    const sections = document.querySelectorAll(".screen");
    sections[6].scrollIntoView();
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${outDir}/${label}-11-closing.png` });

  console.log(`[${label}] errors:`, errors.length ? errors : "none");
  await page.close();
}

await run(1280, 900, "desktop");
await run(390, 844, "mobile");

await browser.close();
