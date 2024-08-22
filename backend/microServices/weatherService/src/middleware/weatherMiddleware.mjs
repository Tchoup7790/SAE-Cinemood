import dotenv from "dotenv"
dotenv.config({ path: ".env" })

/**
 * Weather Middleware for checking if longitude and latitude are declared.
 * This middleware checks if the 'longitude' and 'latitude' headers are present in the request.
 * If either header is missing, the middleware assigns default values for Nantes, France.
 * The middleware then calls the next function to proceed to the next middleware or route handler.
 *
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object.
 * @param {express.NextFunction} next - The Express next function.
 */
function weatherMiddleware(req, res, next) {
    if (!req.headers["longitude"] || !req.headers["latitude"]) {
        /**
         * If either 'longitude' or 'latitude' header is missing, assign default values for Nantes, France.
         * The default values are retrieved from the.env file using the 'dotenv' package.
         */
        req.headers["longitude"] = process.env.LON_NANTES
        req.headers["latitude"] = process.env.LAT_NANTES

        /**
         * Call the next function to proceed to the next middleware or route handler.
         */
        next()
    } else {
        /**
         * If both 'longitude' and 'latitude' headers are present, call the next function to proceed to the next middleware or route handler.
         */
        next()
    }
}

/**
 * Export the weatherMiddleware function as the default export.
 */
export default weatherMiddleware
