import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import log from '@/utils/logger';
import config from '@/config';
import { JWTPayload } from '@/modules/auth/auth.service';

// verify normal student
export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
	// get auth header
	const authHeader = req.headers.authorization;
	if (!authHeader) return res.sendStatus(401);
	log.debug(authHeader);
	const token = authHeader.split(' ')[1];

	// very jwt token
	jwt.verify(token, config.secrets.accessToken, (err, decoded) => {
		if (err) return res.sendStatus(403);
		req.user = decoded as JWTPayload;
		log.debug(req.user);
		next();
	});
};