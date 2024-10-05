using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Interfaces;
using StackExchange.Redis;

namespace Infrastructure.Services
{
    public class ResponseCacheService : IResponseCacheService
    {
        private readonly IDatabase database;
        public ResponseCacheService(IConnectionMultiplexer redis)
        {
            this.database = redis.GetDatabase();
        }

        public async Task CacheResponseAsync(string cacheKey, object response, TimeSpan timeToLive)
        {
            if (response == null)
                return;
            
            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };

            var serialisedResponse = JsonSerializer.Serialize(response, options);
            await this.database.StringSetAsync(cacheKey, serialisedResponse, timeToLive);
        }

        public async Task<string> GetCachedResponseAsync(string cacheKey)
        {
            var cachedResponse = await this.database.StringGetAsync(cacheKey);
            if (cachedResponse.IsNullOrEmpty)
                return null;

            return cachedResponse;
        }
    }
}