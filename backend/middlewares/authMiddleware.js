export function authenticate(req, res, next) {
    const accessToken = req.headers.authorization;

    try {
        const accessTokenPayload = accessToken && jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (!accessTokenPayload)
        return res.status(401).json({ message: "Unauthorized" });

    req.sessionId = accessTokenPayload.sessionId;
    req.userId = accessTokenPayload.userId;
    req.userRole = accessTokenPayload.userRole;

    next();
}

export function authorizeAdmin(req, res, next) {
    if (req.userRole !== "admin")
        return res.status(403).json({ message: "Forbidden" });

    next();
}
