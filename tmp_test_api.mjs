
const API_KEY = "AIzaSyDCGqVlkfG7LyqAFv39bPDBkmuxSaCyCQM";
const MODEL = "gemini-pro";

async function testGemini() {
    console.log("Testing Gemini API v1beta with gemini-pro...");
    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ role: "user", parts: [{ text: "Merhaba" }] }]
                }),
            }
        );

        const data = await response.json();
        console.log("Status:", response.status);
        console.log("Text:", data?.candidates?.[0]?.content?.parts?.[0]?.text || "NO TEXT");
        if (!response.ok) console.log("Error:", data);
    } catch (err) {
        console.error("💥 Network Error:", err.message);
    }
}

testGemini();
