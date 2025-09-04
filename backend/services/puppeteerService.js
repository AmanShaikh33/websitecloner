import puppeteer from "puppeteer";

export const getHTML = async (url) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });

  const html = await page.content();
  await browser.close();

  return html;
};
