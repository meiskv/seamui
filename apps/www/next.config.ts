import path from "node:path"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Pin the workspace root to the monorepo. Without this, Turbopack infers the
  // root from the nearest lockfile above the app and can walk outside the repo.
  turbopack: { root: path.join(__dirname, "..", "..") },
}

export default nextConfig
