param location string = resourceGroup().location
param environment string = 'dev'
param appName string = 'auriona'
param imageName string = ''

// Environment-specific variables
var appServicePlanSku = environment == 'prod' ? 'P2V2' : 'B2'
var enableCDN = environment == 'prod'
var minTlsVersion = '1.2'

// Resource names
var containerRegistryName = '${replace(appName, '-', '')}${uniqueString(resourceGroup().id)}'
var appServicePlanName = '${appName}-plan-${environment}'
var appServiceName = '${appName}-app-${environment}'
var postgresqlServerName = '${appName}-db-${environment}'
var redisName = '${appName}-cache-${environment}'
var applicationInsightsName = '${appName}-insights-${environment}'
var keyVaultName = '${appName}-kv-${environment}'
var storageName = '${replace(appName, '-', '')}${environment}${uniqueString(resourceGroup().id)}'

// Tags
var commonTags = {
  environment: environment
  application: appName
  managedBy: 'bicep'
}

// Application Insights
resource appInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: applicationInsightsName
  location: location
  kind: 'web'
  properties: {
    Application_Type: 'web'
    RetentionInDays: environment == 'prod' ? 90 : 30
    publicNetworkAccessForIngestion: 'Enabled'
    publicNetworkAccessForQuery: 'Enabled'
  }
  tags: commonTags
}

// Key Vault
resource keyVault 'Microsoft.KeyVault/vaults@2021-06-01-preview' = {
  name: keyVaultName
  location: location
  properties: {
    enabledForDeployment: true
    enabledForTemplateDeployment: true
    enabledForDiskEncryption: false
    tenantId: subscription().tenantId
    sku: {
      name: 'standard'
      family: 'A'
    }
    accessPolicies: []
  }
  tags: commonTags
}

// PostgreSQL Database
resource postgresqlServer 'Microsoft.DBforPostgreSQL/servers@2017-12-01' = {
  name: postgresqlServerName
  location: location
  sku: {
    name: environment == 'prod' ? 'B_Gen5_2' : 'B_Gen5_1'
    tier: 'Basic'
    capacity: environment == 'prod' ? 2 : 1
    family: 'Gen5'
  }
  properties: {
    createMode: 'Default'
    version: '11'
    administratorLogin: 'pgadmin'
    administratorLoginPassword: uniqueString(resourceGroup().id)
    storageProfile: {
      storageMB: environment == 'prod' ? 204800 : 51200
      backupRetentionDays: environment == 'prod' ? 30 : 7
      geoRedundantBackup: environment == 'prod' ? 'Enabled' : 'Disabled'
    }
    sslEnforcement: 'ENABLED'
    minimalTlsVersion: minTlsVersion
  }
  tags: commonTags
}

// PostgreSQL Database
resource aurionaDatabase 'Microsoft.DBforPostgreSQL/servers/databases@2017-12-01' = {
  parent: postgresqlServer
  name: 'auriona'
  properties: {
    charset: 'UTF8'
    collation: 'en_US.utf8'
  }
}

// Redis Cache
resource redisCache 'Microsoft.Cache/redis@2022-05-01' = {
  name: redisName
  location: location
  properties: {
    sku: {
      name: environment == 'prod' ? 'Premium' : 'Basic'
      family: environment == 'prod' ? 'P' : 'C'
      capacity: environment == 'prod' ? 1 : 0
    }
    enableNonSslPort: false
    minimumTlsVersion: minTlsVersion
    publicNetworkAccess: 'Enabled'
    redisConfiguration: {
      'notify-keyspace-events': 'Ex'
      'maxmemory-policy': environment == 'prod' ? 'allkeys-lru' : 'volatile-lru'
    }
  }
  tags: commonTags
}

// App Service Plan
resource appServicePlan 'Microsoft.Web/serverfarms@2021-02-01' = {
  name: appServicePlanName
  location: location
  sku: {
    name: appServicePlanSku
    tier: environment == 'prod' ? 'PremiumV2' : 'Basic'
  }
  kind: 'linux'
  properties: {
    reserved: true
  }
  tags: commonTags
}

// App Service
resource appService 'Microsoft.Web/sites@2021-02-01' = {
  name: appServiceName
  location: location
  kind: 'app,linux,container'
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      linuxFxVersion: 'DOCKER|${imageName}'
      alwaysOn: environment == 'prod'
      http20Enabled: true
      minTlsVersion: minTlsVersion
      appSettings: [
        {
          name: 'WEBSITES_ENABLE_APP_SERVICE_STORAGE'
          value: 'false'
        }
        {
          name: 'DOCKER_ENABLE_CI'
          value: 'true'
        }
        {
          name: 'DOCKER_REGISTRY_SERVER_URL'
          value: 'https://${containerRegistryName}.azurecr.io'
        }
        {
          name: 'APPLICATION_INSIGHTS_INSTRUMENTATION_KEY'
          value: appInsights.properties.InstrumentationKey
        }
        {
          name: 'APPINSIGHTS_INSTRUMENTATIONKEY'
          value: appInsights.properties.InstrumentationKey
        }
      ]
      connectionStrings: [
        {
          name: 'DATABASE_URL'
          connectionString: 'postgresql://pgadmin:ChangeMe${uniqueString(resourceGroup().id)}!@${postgresqlServer.properties.fullyQualifiedDomainName}:5432/auriona'
          type: 'PostgreSQL'
        }
        {
          name: 'REDIS_URL'
          connectionString: '${redisName}.redis.cache.windows.net:6379'
          type: 'RedisCache'
        }
      ]
    }
    httpsOnly: true
    publicNetworkAccessEnabled: true
  }
  tags: commonTags
}

// Storage Account (for static files)
resource storage 'Microsoft.Storage/storageAccounts@2021-06-01' = {
  name: storageName
  location: location
  kind: 'StorageV2'
  sku: {
    name: environment == 'prod' ? 'Standard_GRS' : 'Standard_LRS'
  }
  properties: {
    accessTier: 'Hot'
    minimumTlsVersion: minTlsVersion
    supportsHttpsTrafficOnly: true
  }
  tags: commonTags
}

// CDN Endpoint (if production)
resource cdnProfile 'Microsoft.Cdn/profiles@2021-06-01' = if (enableCDN) {
  name: '${appName}-cdn-${environment}'
  location: location
  sku: {
    name: 'Standard_Microsoft'
  }
  tags: commonTags
}

// Outputs
output appServiceUrl string = 'https://${appService.properties.defaultHostName}'
output appInsightsKey string = appInsights.properties.InstrumentationKey
output databaseHost string = postgresqlServer.properties.fullyQualifiedDomainName
output redisHost string = redisCache.properties.hostName
