import fs from 'fs';

const TOKEN = 'vca_2S996dMXtyPw79e5AlvVIdeBQbyU52GUB7iE9cT9eVXx87aBgP4KZi8S';
const PROJECT_ID = 'prj_K6amZwKIfdfEyvTHteYe1qZmJePg';

const envFile = fs.readFileSync('.env.local', 'utf8');
const lines = envFile.split('\n');

const variables = [];
for (let line of lines) {
    line = line.trim();
    if (!line || line.startsWith('#')) continue;

    const [key, ...rest] = line.split('=');
    let value = rest.join('=');

    // Remove wrapping quotes if present
    if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
    }

    variables.push({
        key: key.trim(),
        value: value.trim(),
        type: 'encrypted',
        target: ['production', 'preview', 'development']
    });
}

async function upload() {
    for (const v of variables) {
        console.log(`Uploading ${v.key}...`);
        try {
            const response = await fetch(`https://api.vercel.com/v10/projects/${PROJECT_ID}/env?upsert=true`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
                body: JSON.stringify(v),
            });
            if (!response.ok) {
                const body = await response.text();
                console.error(`Failed to upload ${v.key}: ${response.status} ${body}`);
            } else {
                console.log(`Successfully uploaded ${v.key}`);
            }
        } catch (e) {
            console.error(e);
        }
    }
    console.log('All done!');
}

upload();
