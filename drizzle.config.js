/** @type { import("drizzle-kit").Config} */
export default{
    schema: "./schema.ts",
    dialect: "postgresql",
    dbCredentials:{
        url: 'postgresql://CarMarketplace_owner:Ij5BR8asdPhq@ep-billowing-surf-a1ea5ea2.ap-southeast-1.aws.neon.tech/CarMarketplace?sslmode=require',
    }
}