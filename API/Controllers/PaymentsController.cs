using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using API.Errors;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Stripe;

namespace API.Controllers
{
    public class PaymentsController : BaseApiController
    {
        private readonly IPaymentService paymentService;
        private const string whSecret = "whsec_03e74c208174012093c256c343569efdcf55710ac4d6af8d0c380c9a5453d963";
        private readonly ILogger<IPaymentService> paymentLogger;
        public PaymentsController(ILogger<BaseApiController> logger, IPaymentService paymentService, ILogger<IPaymentService> paymentLogger) : base(logger)
        {
            this.paymentLogger = paymentLogger;
            this.paymentService = paymentService;
        }

        [Authorize]
        [HttpPost("{basketId}")]
        public async Task<ActionResult<CustomerBasket>> CreateOrUpdatePaymentIntent(string basketId)
        {
            System.Console.WriteLine("enter");
            var basket = await this.paymentService.CreateOrUpdatePaymentIntent(basketId);
            if (basket == null)
                return BadRequest(new ApiResponse(400, "Problem with your basket"));

            return basket;
        }

        [HttpPost("webhook")]
        public async Task<ActionResult> StripeWebhook()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            var stripeEvent = EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"], whSecret);
            PaymentIntent intent;
            Order order;
            switch (stripeEvent.Type)
            {
                case "payment_intent.succeeded":
                    intent = (PaymentIntent) stripeEvent.Data.Object;
                    this.paymentLogger.LogInformation("Payment Succeeded: ", intent.Id);
                    order = await this.paymentService.UpdateOrderPaymentSucceeded(intent.Id);
                    this.paymentLogger.LogInformation("Order Updated to payment received: ", order.Id);
                    break;
                case "payment_intent.payment_failed":
                    intent = (PaymentIntent) stripeEvent.Data.Object;
                    this.paymentLogger.LogInformation("Payment Failed: ", intent.Id);
                    order = await this.paymentService.UpdateOrderPaymentFailed(intent.Id);
                    this.paymentLogger.LogInformation("Order payment failed: ", order.Id);
                    break;
            }

            return new EmptyResult();//To stop Stripe sending us events
        }
    }
}