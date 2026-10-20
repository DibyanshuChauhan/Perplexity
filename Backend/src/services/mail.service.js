let cachedAccessToken = null;
let tokenExpiresAt = 0;

/**
 * Exchanges the Google OAuth refresh token for a fresh access token over standard HTTPS (Port 443).
 */
async function getAccessToken() {
    if (cachedAccessToken && Date.now() < tokenExpiresAt - 60000) {
        return cachedAccessToken;
    }

    const clientId = process.env.GOOGLE_CLIENT_ID?.trim();
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim();
    const refreshToken = process.env.GOOGLE_REFRESH_TOKEN?.trim();

    if (!clientId || !clientSecret || !refreshToken) {
        throw new Error("Missing Google OAuth credentials (GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN).");
    }

    const res = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            client_id: clientId,
            client_secret: clientSecret,
            refresh_token: refreshToken,
            grant_type: "refresh_token"
        })
    });

    const data = await res.json();
    if (!data.access_token) {
        console.error("Google OAuth token exchange failed:", data);
        throw new Error(`Google OAuth error: ${data.error_description || data.error || "Failed to exchange token"}`);
    }

    cachedAccessToken = data.access_token;
    tokenExpiresAt = Date.now() + (data.expires_in || 3600) * 1000;
    return cachedAccessToken;
}

/**
 * Sends an email using the Gmail REST API over standard HTTPS (Port 443).
 * This completely avoids cloud platform outbound SMTP port blocking (ports 25, 465, 587) on Render, Vercel, etc.
 */
export const sendEmail = async ({ to, subject, html, text }) => {
    const sender = process.env.GOOGLE_USER?.trim();
    if (!sender) {
        throw new Error("Missing GOOGLE_USER environment variable.");
    }

    const accessToken = await getAccessToken();

    // Encode subject with UTF-8 support
    const encodedSubject = `=?utf-8?B?${Buffer.from(subject || "").toString("base64")}?=`;

    // Construct raw RFC 2822 email format
    const messageParts = [
        `From: ${sender}`,
        `To: ${to}`,
        `Subject: ${encodedSubject}`,
        "MIME-Version: 1.0",
        "Content-Type: text/html; charset=utf-8",
        "Content-Transfer-Encoding: 7bit",
        "",
        html || text || ""
    ];

    const rawMessage = messageParts.join("\r\n");
    // Standard Base64URL encoding (RFC 4648)
    const encodedMessage = Buffer.from(rawMessage)
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");

    const response = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ raw: encodedMessage })
    });

    const result = await response.json();
    if (!response.ok) {
        console.error("Gmail REST API dispatch error:", result);
        throw new Error(`Gmail API error (${response.status}): ${result.error?.message || JSON.stringify(result)}`);
    }

    console.log("Email dispatched successfully via Gmail HTTPS API. Message ID:", result.id);
    return result;
};