
async function hitApi() {
    try {
        const res = await fetch("http://localhost:3000/api/chatbot", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: "Selam" })
        });
        const data = await res.json();
        console.log("Response:", data);
    } catch (err) {
        console.error("Error:", err.message);
    }
}
hitApi();
