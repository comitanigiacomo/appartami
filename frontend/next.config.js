/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    nextConfig,
    async redirects() {
        return [
          {
            source: '/Inizia-ora',
            destination: '/users',
            permanent: true,
          },
        ];
      },

}
