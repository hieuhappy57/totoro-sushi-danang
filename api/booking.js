// Vercel Serverless Function: api/booking.js
// Manages table reservations on Google Cloud Firestore via REST API

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const projectId = process.env.FIREBASE_PROJECT_ID;
    const apiKey = process.env.FIREBASE_API_KEY;

    // Check if configuration is missing -> Fallback Mode
    const isFallbackMode = !projectId || !apiKey;

    if (req.method === 'POST') {
        try {
            const booking = req.body; // { id, name, phone, date, time, adults, kids, notes, status, createdAt }
            
            if (!booking.id || !booking.name || !booking.phone) {
                return res.status(400).json({ error: "Missing required fields (id, name, phone)." });
            }

            if (isFallbackMode) {
                return res.status(200).json({ 
                    success: true, 
                    id: booking.id, 
                    fallback: true,
                    message: "Firebase credentials missing. Local fallback active." 
                });
            }

            // Map flat JSON to Firestore Document format
            const firestorePayload = {
                fields: {
                    id: { stringValue: booking.id },
                    name: { stringValue: booking.name },
                    phone: { stringValue: booking.phone },
                    date: { stringValue: booking.date || "" },
                    time: { stringValue: booking.time || "" },
                    adults: { integerValue: parseInt(booking.adults) || 1 },
                    kids: { integerValue: parseInt(booking.kids) || 0 },
                    notes: { stringValue: booking.notes || "" },
                    status: { stringValue: booking.status || "Chờ xác nhận" },
                    createdAt: { stringValue: booking.createdAt || new Date().toISOString() }
                }
            };

            const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/bookings?documentId=${booking.id}&key=${apiKey}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(firestorePayload)
            });

            const data = await response.json();

            if (response.ok) {
                return res.status(200).json({ success: true, id: booking.id });
            } else {
                return res.status(response.status).json({ 
                    error: data.error?.message || "Failed to write to Firestore.",
                    details: data
                });
            }
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    if (req.method === 'GET') {
        try {
            if (isFallbackMode) {
                return res.status(200).json({ 
                    fallback: true,
                    bookings: [] 
                });
            }

            const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/bookings?key=${apiKey}`;
            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                // If collection is empty, Firestore returns 404. Let's return empty array.
                if (response.status === 404) {
                    return res.status(200).json([]);
                }
                return res.status(response.status).json({ 
                    error: data.error?.message || "Failed to fetch bookings from Firestore." 
                });
            }

            // Map Firestore structure back to flat JSON array
            const bookings = (data.documents || []).map(doc => {
                const fields = doc.fields || {};
                return {
                    id: fields.id?.stringValue || doc.name.split('/').pop(),
                    name: fields.name?.stringValue || "",
                    phone: fields.phone?.stringValue || "",
                    date: fields.date?.stringValue || "",
                    time: fields.time?.stringValue || "",
                    adults: parseInt(fields.adults?.integerValue || 0),
                    kids: parseInt(fields.kids?.integerValue || 0),
                    notes: fields.notes?.stringValue || "",
                    status: fields.status?.stringValue || "Chờ xác nhận",
                    createdAt: fields.createdAt?.stringValue || ""
                };
            });

            // Sort by createdAt descending
            bookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            return res.status(200).json(bookings);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    if (req.method === 'PATCH') {
        try {
            const { id, status } = req.body; // { id, status }
            
            if (!id || !status) {
                return res.status(400).json({ error: "Missing required fields (id, status)." });
            }

            if (isFallbackMode) {
                return res.status(200).json({ success: true, fallback: true });
            }

            // Firestore PATCH url with updateMask to target only the status field
            const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/bookings/${id}?updateMask.fieldPaths=status&key=${apiKey}`;
            
            const payload = {
                fields: {
                    status: { stringValue: status }
                }
            };

            const response = await fetch(url, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok) {
                return res.status(200).json({ success: true });
            } else {
                return res.status(response.status).json({ 
                    error: data.error?.message || "Failed to update booking status in Firestore." 
                });
            }
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    return res.status(405).json({ error: "Method not allowed." });
}
