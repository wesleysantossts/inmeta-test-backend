module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/__tests__'],
  testMatch: [
    '**/__tests__/**/*.ts',
    '**/__tests__/**/*.js',
    '**/?(*.)+(spec|test).ts',
    '**/?(*.)+(spec|test).js'
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts'
  ],
  moduleFileExtensions: ['ts', 'js', 'json'],
  testPathIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@controllers/(.*)$': '<rootDir>/src/presentation/controllers/$1',
    '^@services/(.*)$': '<rootDir>/src/domain/services/$1',
    '^@repositories/(.*)$': '<rootDir>/src/infrastructure/repositories/$1',
    '^@entities/(.*)$': '<rootDir>/src/domain/entities/$1',
    '^@models/(.*)$': '<rootDir>/src/domain/models/$1',
    '^@utils/(.*)$': '<rootDir>/src/shared/utils/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@middlewares/(.*)$': '<rootDir>/src/presentation/middlewares/$1',
    '^@routes/(.*)$': '<rootDir>/src/presentation/routes/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
};