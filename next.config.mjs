/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: "/accounts",
            destination: "/accounts/login",
            permanent: true,
          },
          {
            source: "/products",
            destination: "/products/business-checking",
            permanent: true,
          },
          {
            source: "/resources",
            destination: "/resources/about",
            permanent: true,
          },
          {
            source: "/solutions",
            destination: "/solutions/for-business",
            permanent: true,
          },
        ];
    }
};

export default nextConfig;
