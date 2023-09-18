import type { Config } from 'jest'

export default async (): Promise<Config> => {
  return {
    testEnvironment: 'node',
    transform: { '^.+\\.[t|j]sx?$': 'babel-jest' },
    modulePathIgnorePatterns: ['<rootDir>/build/', '<rootDir>/node_modules/'],
  }
}
