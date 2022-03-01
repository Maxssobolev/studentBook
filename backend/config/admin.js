module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '1df0151458361076aaea7d0beb6e4a8e'),
  },
});
