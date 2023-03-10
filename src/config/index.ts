import merge from 'lodash.merge';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const stage = process.env.STAGE || 'local';

let envConfig;

switch (stage) {
	case 'production':
		envConfig = require('./prod').defaut;
		break;
	case 'testing':
		envConfig = require('./testing').default;
		break;
	default:
		envConfig = require('./local').default;
		break;
}

type Config = {
	env: string;
	port: number;
	logger: {
		level: string;
	};
	admin: {
		username: string;
		password: string;
		email: string;
	};
	api: {
		prefix: string;
		cors: any;
	};
	secrets: {
		accessToken: string;
		refreshToken: string;
		accessTokenExpiry: string;
	};
};

export default merge(
	{
		stage,
		env: process.env.NODE_ENV,
		port: 5000,
		logger: {
			level: 'info',
		},
		admin: {
			username: 'admin',
			password: 'admin',
			email: 'admin@admin.com',
		},
		api: {
			prefix: '/api',
			cors: {
				credentials: true,
				origin: ['http://localhost:3000'],
			},
		},
		secrets: {
			accessToken: process.env.ACCESS_TOKEN_SECRET,
			refreshToken: process.env.REFRESH_TOKEN_SECRET,
			accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY,
		},
	},
	envConfig,
) as Config;
