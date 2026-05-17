import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url) return NextResponse.json({ error: "No URL provided" }, { status: 400 });

    // Fetch the page HTML
    const pageRes = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; MenuLink/1.0)" },
    });
    const html = await pageRes.text();

    // Strip HTML tags to get readable text
    const text = html
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 12000); // limit context size

    // Send to Claude to extract dishes
    const claudeRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY || "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 8000,
        messages: [{
          role: "user",
          content: `Extract every food and drink item from this restaurant menu text. Return ONLY a raw JSON array, no markdown, no explanation:
[{"name":"dish name","price":12.99,"description":"description if available","category":"starters|mains|burgers|pizza|bowls|sides|desserts|drinks","confidence":"high|verify"}]

Rules:
- Extract EVERY item you can find
- Price as number, strip currency symbols
- If price missing use 0
- confidence "high" if clear, "verify" if uncertain
- Return ONLY the JSON array

Menu text:
${text}`
        }]
      })
    });

    const claudeData = await claudeRes.json();
    const responseText = claudeData.content?.[0]?.text || "[]";

    let dishes = [];
    try {
      const clean = responseText.replace(/```json|```/g, "").trim();
      dishes = JSON.parse(clean);
    } catch {
      const match = responseText.match(/\[[\s\S]*\]/);
      if (match) dishes = JSON.parse(match[0]);
    }

    return NextResponse.json({ dishes });
  } catch (err) {
    return NextResponse.json({ error: "Failed to import menu from URL" }, { status: 500 });
  }
}
