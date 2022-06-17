export default (): any => ({
  env: process.env.APP_ENV,
  port: process.env.APP_PORT,
  microservice: {
    user: process.env.USER_MICROSERVICE_URL,
    cart: process.env.CART_MICROSERVICE_URL,
    product: process.env.PRODUCT_MICROSERVICE_URL,
    order: process.env.ORDER_MICROSERVICE_URL,
    media: process.env.MEDIA_MICROSERVICE_URL,
    warehouse: process.env.WAREHOUSE_MICROSERVICE_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expirationTime: process.env.JWT_EXPIRATION_TIME,
  },
});
