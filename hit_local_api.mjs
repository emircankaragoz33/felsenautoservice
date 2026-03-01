
const API_KEY = "AIzaSyCfsy9niImHL7AmGoDyRPpdHmCtMdRi8D4";
const MODEL = "models/gemini-flash-latest";

async function testPrompt() {
    try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/${MODEL}:generateContent?key=${API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ role: "user", parts: [{ text: "Merhaba, nasılsın?" }] }]
            })
        });
        const data = await res.json();
        console.log("Status:", res.status);
        console.log("Response:", data?.candidates?.[0]?.content?.parts?.[0]?.text || data);
    } catch (err) {
        console.error("Error:", err.message);
    }
}
testPrompt();
