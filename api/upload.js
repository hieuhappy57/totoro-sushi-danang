// Vercel Serverless Function: api/upload.js
// Uploads local files directly to Google Cloud Firebase Storage using the REST API

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Method not allowed." });
    }

    const projectId = process.env.FIREBASE_PROJECT_ID;
    const apiKey = process.env.FIREBASE_API_KEY;

    // Check if configuration is missing -> Fallback Mode
    if (!projectId || !apiKey) {
        return res.status(200).json({
            fallback: true,
            url: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop",
            message: "Firebase Storage credentials not set. Returning default fallback image URL."
        });
    }

    try {
        const { file, name } = req.body; // { file: "data:image/jpeg;base64,...", name: "filename.jpg" }

        if (!file || !name) {
            return res.status(400).json({ error: "Missing required fields (file, name)." });
        }

        // Parse base64 header to extract MIME type and raw data
        const matches = file.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
        if (!matches || matches.length !== 3) {
            return res.status(400).json({ error: "Invalid base64 file data format." });
        }

        const mimeType = matches[1];
        const base64Data = matches[2];
        const buffer = Buffer.from(base64Data, 'base64');

        // Create a unique clean file path in the 'products' folder
        const cleanName = name.replace(/[^a-zA-Z0-9.]/g, '_');
        const filePath = `products/${Date.now()}_${cleanName}`;

        // Prepare Firebase Storage Upload URL
        // GCS REST API requires query parameter uploadType=media for direct binary uploads
        const uploadUrl = `https://firebasestorage.googleapis.com/v0/b/${projectId}.appspot.com/o?name=${encodeURIComponent(filePath)}&uploadType=media`;

        const response = await fetch(uploadUrl, {
            method: 'POST',
            headers: {
                'Content-Type': mimeType,
                'Content-Length': buffer.length.toString()
            },
            body: buffer
        });

        const data = await response.json();

        if (response.ok) {
            // Read generated download token
            // GCS REST API returns metadata with 'downloadTokens' containing the authorization token
            const token = data.downloadTokens || data.metadata?.firebaseStorageDownloadTokens || "";
            
            // Construct the public media URL
            const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${projectId}.appspot.com/o/${encodeURIComponent(filePath)}?alt=media&token=${token}`;
            
            return res.status(200).json({
                success: true,
                url: publicUrl,
                name: filePath
            });
        } else {
            return res.status(response.status).json({
                error: data.error?.message || "Failed to upload file to Firebase Storage.",
                details: data
            });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
