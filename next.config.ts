import path from 'path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Explicitly set the root used for output file tracing so Next doesn't
  // try to infer the workspace root when multiple lockfiles exist.
  // This value should point to the project folder containing this config.
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
