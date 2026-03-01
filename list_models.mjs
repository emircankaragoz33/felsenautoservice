
const API_KEY = "AIzaSyDCGqVlkfG7LyqAFv39bPDBkmuxSaCyCQM";

async function listAll() {
    const versions = ["v1", "v1beta"];
    for (const v of versions) {
        console.log(`Checking version ${v}...`);
        try {
            const res = await fetch(`https://generativelanguage.googleapis.com/${v}/models?key=${API_KEY}`);
            const data = await res.json();
            console.log(`Version ${v} models:`, JSON.stringify(data, null, 2));
        } catch (err) {
            console.error(`Version ${v} failed:`, err.message);
        }
    }
}

listAll();
