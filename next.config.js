/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    'recharts',
    'react-smooth',
    'react-simple-maps',
    'd3-array',
    'd3-color',
    'd3-format',
    'd3-geo',
    'd3-interpolate',
    'd3-path',
    'd3-scale',
    'd3-shape',
    'd3-time',
    'd3-time-format',
    'internmap',
    'topojson-client',
  ],
}

module.exports = nextConfig
