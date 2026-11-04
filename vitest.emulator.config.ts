import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['src/**/*.emulator.test.ts'],
    fileParallelism: false,
    testTimeout: 20000,
    hookTimeout: 30000,
  },
})
