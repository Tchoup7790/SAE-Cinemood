/**
 * Location Middleware for checking if geolocation is declared
 *
 * This middleware function checks if the 'geolocation' header is present in the request.
 * If it is not present, the request will proceed to the next middleware function or route handler.
 * If it is present, a 501 status code (Not Implemented) will be sent as the response.
 *
 * @param {express.Request} req - The Express request object
 * @param {express.Response} res - The Express response object
 * @param {express.NextFunction} next - The Express next function, used to pass control to the next middleware function or route handler
 */
function locationMiddleware(req, res, next) {
    if (!req.headers["geolocation"]) {
        next()
    } else {
        res.sendStatus(501) // 501 : Not Implemented
    }
}

export default locationMiddleware
