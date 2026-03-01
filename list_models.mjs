
const API_KEY = "AIzaSyCQ6Esmo7rIeFNH9smtz8TcFvNYlfqMArY";

async function listAll() {
    const versions = ["v1", "v1beta"];
    for (const v of versions) {
        console.log(`\n--- Checking version ${v} ---`);
        try {
            const res = await fetch(`https://generativelanguage.googleapis.com/${v}/models?key=${API_KEY}`);
            const data = await res.json();
            if (res.ok) {
                console.log(`Version ${v} models:`, (data.models || []).map(m => m.name));
            } else {
                console.error(`Version ${v} error:`, data.error?.message || data);
            }
        } catch (err) {
            console.error(`Version ${v} failed:`, err.message);
        }
    }
}

listAll();
