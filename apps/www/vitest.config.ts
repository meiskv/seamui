import { defineConfig } from "vitest/config"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [tsconfigPaths()],
  // tsconfig uses `jsx: preserve` (Next compiles it); tests need the automatic
  // runtime so JSX works without a React import in every spec.
  esbuild: { jsx: "automatic" },
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./tests/setup.ts"],
    // Unit tests only. Playwright specs live in tests/e2e and run separately.
    include: ["tests/unit/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      reportsDirectory: "./coverage",
      // Scope the gate to the pure motion/utility/haptics contract — the small,
      // fully testable core. Component (`ui/**`) and CLI coverage are exercised
      // behaviorally (component smoke + spawn tests) and will be folded into the
      // gate as those suites grow. Ratchet up, never down.
      include: ["registry/seam/lib/**"],
      thresholds: {
        lines: 80,
        statements: 80,
        functions: 80,
        branches: 75,
      },
    },
  },
})
