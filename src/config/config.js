import convict from 'convict'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import convictFormatWithValidator from 'convict-format-with-validator'

import emailDomainArray from './formats/email-domain-array.js'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const minSessionCookiePasswordLength = 32

const fifteenMinutesMs = 900000
const fourHoursMs = 14400000
const threeSecondsMs = 3000
const fiveMinutesSeconds = 300
const oneWeekMs = 604800000

const isProduction = process.env.NODE_ENV === 'production'
const isTest = process.env.NODE_ENV === 'test'
const isDevelopment = process.env.NODE_ENV === 'development'

convict.addFormats(convictFormatWithValidator)

convict.addFormat(emailDomainArray)

export const config = convict({
  serviceVersion: {
    doc: 'The service version, this variable is injected into your docker container in CDP environments',
    format: String,
    nullable: true,
    default: null,
    env: 'SERVICE_VERSION'
  },
  host: {
    doc: 'The IP address to bind',
    format: 'ipaddress',
    default: '0.0.0.0',
    env: 'HOST'
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 3000,
    env: 'PORT'
  },
  staticCacheTimeout: {
    doc: 'Static cache timeout in milliseconds',
    format: Number,
    default: oneWeekMs,
    env: 'STATIC_CACHE_TIMEOUT'
  },
  serviceName: {
    doc: 'Applications Service Name',
    format: String,
    default: 'Digital service manual'
  },
  root: {
    doc: 'Project root',
    format: String,
    default: path.resolve(dirname, '../..')
  },
  assetPath: {
    doc: 'Asset path',
    format: String,
    default: '/public',
    env: 'ASSET_PATH'
  },
  isProduction: {
    doc: 'If this application running in the production environment',
    format: Boolean,
    default: isProduction
  },
  isDevelopment: {
    doc: 'If this application running in the development environment',
    format: Boolean,
    default: isDevelopment
  },
  isTest: {
    doc: 'If this application running in the test environment',
    format: Boolean,
    default: isTest
  },
  log: {
    enabled: {
      doc: 'Is logging enabled',
      format: Boolean,
      default: process.env.NODE_ENV !== 'test',
      env: 'LOG_ENABLED'
    },
    level: {
      doc: 'Logging level',
      format: ['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'],
      default: 'info',
      env: 'LOG_LEVEL'
    },
    format: {
      doc: 'Format to output logs in.',
      format: ['ecs', 'pino-pretty'],
      default: isProduction ? 'ecs' : 'pino-pretty',
      env: 'LOG_FORMAT'
    },
    redact: {
      doc: 'Log paths to redact',
      format: Array,
      default: isProduction
        ? ['req.headers.authorization', 'req.headers.cookie', 'res.headers']
        : []
    }
  },
  httpProxy: {
    doc: 'HTTP Proxy',
    format: String,
    nullable: true,
    default: null,
    env: 'HTTP_PROXY'
  },
  isSecureContextEnabled: {
    doc: 'Enable Secure Context',
    format: Boolean,
    default: isProduction,
    env: 'ENABLE_SECURE_CONTEXT'
  },
  isMetricsEnabled: {
    doc: 'Enable metrics reporting',
    format: Boolean,
    default: isProduction,
    env: 'ENABLE_METRICS'
  },
  nunjucks: {
    watch: {
      doc: 'Reload templates when they are changed.',
      format: Boolean,
      default: isDevelopment
    },
    noCache: {
      doc: 'Use a cache and recompile templates each time',
      format: Boolean,
      default: isDevelopment
    }
  },
  googleTagManager: {
    containerId: {
      doc: 'Google Tag Manager container ID',
      format: String,
      nullable: true,
      default: null,
      env: 'GTM_CONTAINER_ID'
    }
  },
  tracing: {
    header: {
      doc: 'Which header to track',
      format: String,
      default: 'x-cdp-request-id',
      env: 'TRACING_HEADER'
    }
  },
  notify: {
    aiToolkit: {
      apiKey: {
        doc: 'Gov.UK Notify API key for the AI toolkit',
        format: String,
        default: null,
        env: 'AI_TOOLKIT_NOTIFY_KEY',
        sensitive: true
      },
      triageTemplateId: {
        doc: 'Gov.UK Notify template ID for triage submission to shared mailbox',
        format: String,
        default: null,
        env: 'AI_TOOLKIT_TRIAGE_TEMPLATE_ID'
      },
      confirmationTemplateId: {
        doc: 'Gov.UK Notify template ID for submission confirmation',
        format: String,
        default: null,
        env: 'AI_TOOLKIT_CONFIRMATION_TEMPLATE_ID'
      },
      verificationCodeTemplateId: {
        doc: 'Gov.UK Notify template ID for verification code email',
        format: String,
        default: null,
        env: 'VERIFICATION_CODE_EMAIL_TEMPLATE_ID'
      },
      mailbox: {
        doc: 'Shared mailbox email address to receive triage submissions',
        format: String,
        default: null,
        env: 'AICE_SHARED_MAILBOX_EMAIL'
      }
    }
  },
  aiTriage: {
    allowedEmailDomains: {
      doc: 'CSV of email domains allowed to submit the AI triage form, e.g. "defra.gov.uk,supplier-co.com". Matching is exact (case-insensitive) on the full email domain. Empty = deny all.',
      format: 'email-domain-array',
      default: [],
      env: 'AI_TOOLKIT_ALLOWED_EMAIL_DOMAINS'
    },
    automationEnabled: {
      doc: 'Whether triage submissions are also posted to the aice-triage-automation service, as well as emailed. The per-environment switch for that integration: on in an environment where aice-triage-automation is deployed and its queue should fill from real traffic, off everywhere else. Independent of authEnabled, which decides only whether the post carries a token.',
      format: Boolean,
      default: false,
      env: 'AI_TRIAGE_AUTOMATION_ENABLED'
    },
    automationUrl: {
      doc: 'Base URL of the aice-triage-automation service. Defaults to where it runs on a laptop.',
      format: String,
      default: 'http://localhost:3001',
      env: 'AI_TRIAGE_AUTOMATION_URL'
    },
    automationTimeoutMs: {
      doc: 'Timeout in milliseconds for the post to aice-triage-automation. fetch has no default timeout, so a service that accepts the connection and never answers would hang the submit button.',
      format: Number,
      default: threeSecondsMs,
      env: 'AI_TRIAGE_AUTOMATION_TIMEOUT_MS'
    },
    authEnabled: {
      doc: 'Whether the post to aice-triage-automation carries an AWS WebIdentity token. Off locally, where the token service is unavailable.',
      format: Boolean,
      default: false,
      env: 'AI_TRIAGE_AUTH_ENABLED'
    },
    automationAudience: {
      doc: 'Audience claim requested for the WebIdentity token. Must match aice-triage-automation\'s auth.audience.',
      format: String,
      default: 'aice-triage-automation',
      env: 'AI_TRIAGE_AUTOMATION_AUDIENCE'
    },
    tokenDurationSeconds: {
      doc: 'Lifetime in seconds of the WebIdentity token. The platform caps this at 15 minutes.',
      format: Number,
      default: fiveMinutesSeconds,
      env: 'AI_TRIAGE_TOKEN_DURATION_SECONDS'
    }
  },
  featureFlags: {
    showTriageReference: {
      doc: 'Show triage reference number on confirmation page',
      format: Boolean,
      default: false,
      env: 'AI_TOOLKIT_SHOW_TRIAGE_REFERENCE'
    }
  },
  session: {
    cache: {
      engine: {
        doc: 'Backend cache engine to use for sessions',
        format: ['redis', 'memory'],
        default: isProduction ? 'redis' : 'memory',
        env: 'SESSION_CACHE_ENGINE'
      },
      name: {
        doc: 'Server-side session cache name',
        format: String,
        default: 'session',
        env: 'SESSION_CACHE_NAME'
      },
      ttl: {
        doc: 'Server-side session cache TTL in milliseconds',
        format: Number,
        default: fourHoursMs,
        env: 'SESSION_CACHE_TTL'
      }
    },
    cookie: {
      ttl: {
        doc: 'Session cookie TTL in milliseconds',
        format: Number,
        default: fourHoursMs,
        env: 'SESSION_COOKIE_TTL'
      },
      password: {
        doc: `Session cookie encryption password (must be at least ${minSessionCookiePasswordLength} characters)`,
        format: (value) => {
          if (
            typeof value !== 'string' ||
            value.length < minSessionCookiePasswordLength
          ) {
            throw new Error(
              `must be a string with at least ${minSessionCookiePasswordLength} characters`
            )
          }
        },
        default: null,
        env: 'SESSION_COOKIE_PASSWORD',
        sensitive: true
      },
      secure: {
        doc: 'Set secure flag on session cookie',
        format: Boolean,
        default: isProduction,
        env: 'SESSION_COOKIE_SECURE'
      }
    }
  },
  verificationCode: {
    codeTtl: {
      doc: 'Verification code lifetime in milliseconds',
      format: Number,
      default: fifteenMinutesMs,
      env: 'VERIFICATION_CODE_TTL'
    },
    loginTtl: {
      doc: 'Successful verification verify session lifetime in milliseconds',
      format: Number,
      default: oneWeekMs,
      env: 'VERIFICATION_CODE_LOGIN_TTL'
    }
  },
  redis: {
    port: {
      doc: 'Redis port',
      format: 'port',
      default: 6379,
      env: 'REDIS_PORT'
    },
    db: {
      doc: 'Redis database number',
      format: Number,
      default: 0,
      env: 'REDIS_DB'
    },
    host: {
      doc: 'Redis cache host',
      format: String,
      default: '127.0.0.1',
      env: 'REDIS_HOST'
    },
    username: {
      doc: 'Redis cache username',
      format: String,
      default: '',
      env: 'REDIS_USERNAME'
    },
    password: {
      doc: 'Redis cache password',
      format: '*',
      default: '',
      sensitive: true,
      env: 'REDIS_PASSWORD'
    },
    keyPrefix: {
      doc: 'Redis cache key prefix name used to isolate the cached results across multiple clients',
      format: String,
      default: 'service-manual-ui:',
      env: 'REDIS_KEY_PREFIX'
    },
    useSingleInstanceCache: {
      doc: 'Connect to a single instance of redis instead of a cluster.',
      format: Boolean,
      default: !isProduction,
      env: 'USE_SINGLE_INSTANCE_CACHE'
    },
    useTLS: {
      doc: 'Connect to redis using TLS',
      format: Boolean,
      default: isProduction,
      env: 'REDIS_TLS'
    },
    connectTimeout: {
      doc: 'Redis connection timeout in milliseconds',
      format: Number,
      default: 5000,
      env: 'REDIS_CONNECT_TIMEOUT'
    },
    commandTimeout: {
      doc: 'Redis command timeout in milliseconds',
      format: Number,
      default: 5000,
      env: 'REDIS_COMMAND_TIMEOUT'
    },
    keepAlive: {
      doc: 'Redis keepAlive interval in milliseconds',
      format: Number,
      default: 30000,
      env: 'REDIS_KEEPALIVE'
    },
    enableReadyCheck: {
      doc: 'Enable Redis ready check',
      format: Boolean,
      default: true,
      env: 'REDIS_ENABLE_READY_CHECK'
    },
    maxRetriesPerRequest: {
      doc: 'Maximum number of retries per Redis request',
      format: Number,
      default: 3,
      env: 'REDIS_MAX_RETRIES_PER_REQUEST'
    },
    retryDelayMs: {
      doc: 'Redis retry delay in milliseconds',
      format: Number,
      default: 50,
      env: 'REDIS_RETRY_DELAY_MS'
    },
    maxRetries: {
      doc: 'Redis maximum connection retries',
      format: Number,
      default: 3,
      env: 'REDIS_MAX_RETRIES'
    },
    slotsRefreshTimeout: {
      doc: 'Redis cluster slots refresh timeout in milliseconds',
      format: Number,
      default: 10000,
      env: 'REDIS_SLOTS_REFRESH_TIMEOUT'
    }
  }
})

config.validate({ allowed: 'strict' })
