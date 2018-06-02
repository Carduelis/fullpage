export const isProduction = process.env.NODE_ENV === "production";
export const isDevelopment = !isProduction;

if (isProduction) {
    console.log("Welcome to console!");
} else {
    console.log("Looks like we are in development mode!");
}
