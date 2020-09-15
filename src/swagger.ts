export const swaggerOptions = {
	swaggerDefinition: {
		openapi: "3.0.1",
		info: {
			title: "Adda Api",
			description: "Node Api for a social media website called Adda",
			version: "1.0.0",
			contact: {
				name: "mixed_Code",
				email: "bemijonathan@gmail.com",
			},
		},
		servers: [
			{ url: "http://localhost:3000", description: "developement server" },
			{ url: "https://api.adda.com", description: "production server" },
		],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: "http",
					scheme: "bearer",
					bearerFormat: "JWT",
				},
			},
		},
	},
	apis: ["src/models/*.ts", "src/routes.ts"],
};
