// Vercel Serverless Function: api/order.js
// Manages customer food orders on Google Cloud Firestore via REST API

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Disable caching completely
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const projectId = process.env.FIREBASE_PROJECT_ID;
    const apiKey = process.env.FIREBASE_API_KEY;

    // Check if configuration is missing -> Fallback Mode
    const isFallbackMode = !projectId || !apiKey;

    if (req.method === 'POST') {
        try {
            const order = req.body; // { id, name, phone, time, payment, shippingMethod, address, notes, items, subtotal, shippingFee, discount, total, status, createdAt }

            if (!order.id || !order.name || !order.phone || !order.items) {
                return res.status(400).json({ error: "Missing required fields (id, name, phone, items)." });
            }

            if (isFallbackMode) {
                return res.status(200).json({ 
                    success: true, 
                    id: order.id, 
                    fallback: true,
                    message: "Firebase credentials missing. Local fallback active." 
                });
            }

            // Map items array to Firestore Array of Maps format
            const firestoreItems = (order.items || []).map(item => ({
                mapValue: {
                    fields: {
                        name: { stringValue: item.name || "" },
                        price: { integerValue: parseInt(item.price) || 0 },
                        quantity: { integerValue: parseInt(item.quantity) || 1 }
                    }
                }
            }));

            // Map flat JSON order to Firestore Document format
            const firestorePayload = {
                fields: {
                    id: { stringValue: order.id },
                    name: { stringValue: order.name },
                    phone: { stringValue: order.phone },
                    time: { stringValue: order.time || "" },
                    payment: { stringValue: order.payment || "" },
                    shippingMethod: { stringValue: order.shippingMethod || "" },
                    address: { stringValue: order.address || "" },
                    notes: { stringValue: order.notes || "" },
                    subtotal: { integerValue: parseInt(order.subtotal) || 0 },
                    shippingFee: { integerValue: parseInt(order.shippingFee) || 0 },
                    discount: { integerValue: parseInt(order.discount) || 0 },
                    total: { integerValue: parseInt(order.total) || 0 },
                    status: { stringValue: order.status || "Chờ xác nhận" },
                    createdAt: { stringValue: order.createdAt || new Date().toISOString() },
                    items: {
                        arrayValue: {
                            values: firestoreItems
                        }
                    }
                }
            };

            const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/orders?documentId=${order.id}&key=${apiKey}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(firestorePayload)
            });

            const data = await response.json();

            if (response.ok) {
                return res.status(200).json({ success: true, id: order.id });
            } else {
                return res.status(response.status).json({ 
                    error: data.error?.message || "Failed to write order to Firestore.",
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
                    orders: [] 
                });
            }

            const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/orders?key=${apiKey}`;
            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                // Check if it is a database missing error (which also returns 404 in Firestore REST API)
                if (data.error && data.error.message && data.error.message.includes("database (default) does not exist")) {
                    return res.status(404).json({ 
                        error: "Cơ sở dữ liệu Firestore Database '(default)' chưa được khởi tạo. Vui lòng truy cập Firebase Console tại địa chỉ https://console.firebase.google.com/project/totoro-7c2e7/firestore để nhấn 'Tạo cơ sở dữ liệu'."
                    });
                }
                // If collection is empty, Firestore returns 404. Let's return empty array.
                if (response.status === 404) {
                    return res.status(200).json([]);
                }
                return res.status(response.status).json({ 
                    error: data.error?.message || "Failed to fetch orders from Firestore." 
                });
            }

            // Map Firestore structure back to flat JSON array
            const orders = (data.documents || []).map(doc => {
                const fields = doc.fields || {};
                
                // Parse items array
                const items = (fields.items?.arrayValue?.values || []).map(val => {
                    const itemFields = val.mapValue?.fields || {};
                    return {
                        name: itemFields.name?.stringValue || "",
                        price: parseInt(itemFields.price?.integerValue || 0),
                        quantity: parseInt(itemFields.quantity?.integerValue || 0)
                    };
                });

                return {
                    id: fields.id?.stringValue || doc.name.split('/').pop(),
                    name: fields.name?.stringValue || "",
                    phone: fields.phone?.stringValue || "",
                    time: fields.time?.stringValue || "",
                    payment: fields.payment?.stringValue || "",
                    shippingMethod: fields.shippingMethod?.stringValue || "",
                    address: fields.address?.stringValue || "",
                    notes: fields.notes?.stringValue || "",
                    subtotal: parseInt(fields.subtotal?.integerValue || 0),
                    shippingFee: parseInt(fields.shippingFee?.integerValue || 0),
                    discount: parseInt(fields.discount?.integerValue || 0),
                    total: parseInt(fields.total?.integerValue || 0),
                    status: fields.status?.stringValue || "Chờ xác nhận",
                    createdAt: fields.createdAt?.stringValue || "",
                    items: items
                };
            });

            // Sort by createdAt descending
            orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            return res.status(200).json(orders);
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
            const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/orders/${id}?updateMask.fieldPaths=status&key=${apiKey}`;

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
                    error: data.error?.message || "Failed to update order status in Firestore." 
                });
            }
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    return res.status(405).json({ error: "Method not allowed." });
}
