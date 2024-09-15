using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Infrastructure.Data;
using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : Controller
    {
        private readonly ILogger<ProductsController> _logger;
        private readonly StoreContext context;

        public ProductsController(ILogger<ProductsController> logger, StoreContext context)
        {
            _logger = logger;
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            var products = await this.context.Product.ToListAsync();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await this.context.Product.FindAsync(id);
            return Ok(product);
        }
    }
}