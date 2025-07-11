import { responseError } from "./response.helper.js";
import jwt from "jsonwebtoken";
import { statusCodes } from "./status-code.helper.js";
import { BadrequestException, UnauthorizedException } from "./exception.helper.js";

export const handleErr = 
       // Middleware 2
    (err,req, res, next)=>{
        if (err instanceof BadrequestException) {
            console.log(`Middleware gôm lỗi BadrequestException: ${err.message}`);
            err.code = err.code || statusCodes.BAD_REQUEST;
            err.message = err.message || "Bad request";
        } else if (err instanceof UnauthorizedException) {
            console.log(`Middleware gôm lỗi UnauthorizedException: ${err.message}`);
            err.code = err.code || statusCodes.UNAUTHORIZED;
            err.message = err.message || "Unauthorized";
        } else if (err instanceof jwt.JsonWebTokenError) {
            console.log(`Middleware gôm lỗi JsonWebTokenError: ${err.message}`);
            err.code = statusCodes.UNAUTHORIZED;
            err.message = "Token không hợp lệ";
        } else if (err instanceof jwt.TokenExpiredError) {
            console.log(`Middleware gôm lỗi TokenExpiredError: ${err.message}`);
            err.code = statusCodes.FORBIDDEN;
            err.message = "Token không hợp lệ, đã hết hạn hoặc không đúng định dạng";
        } else {
            console.log(`Middleware gôm lỗi khác: ${err.message || err}`);
            err.code = err.code || statusCodes.INTERNAL_SERVER_ERROR;
            err.message = err.message || "Internal server error";
        }
       
        const resdata = responseError(err.message, err.code, err.stack);
        res.status(resdata.statusCode).json(resdata);
        return;
    }
;
