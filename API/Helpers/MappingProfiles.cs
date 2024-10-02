using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Entities.OrderAggregate;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, ProductToReturnDto>()
            .ForMember(destination => destination.ProductBrand, options => options.MapFrom(source => source.ProductBrand.Name))
            .ForMember(destination => destination.ProductType, options => options.MapFrom(source => source.ProductType.Name))
            .ForMember(destination => destination.PictureUrl, options => options.MapFrom<ProductUrlResolver>());

            CreateMap<Core.Entities.Identity.Address, AddressDto>().ReverseMap();
            CreateMap<CustomerBasketDto, CustomerBasket>().ReverseMap();
            CreateMap<BasketItemDto, BasketItem>().ReverseMap();
            CreateMap<AddressDto, Core.Entities.OrderAggregate.Address>();
            CreateMap<Order, OrderToReturnDto>()
                .ForMember(destination => destination.DeliveryMethod, options => options.MapFrom(source => source.DeliveryMethod.ShortName))
                .ForMember(destination => destination.ShippingPrice, options => options.MapFrom(source => source.DeliveryMethod.Price));
            CreateMap<OrderItem, OrderItemDto>()
                .ForMember(destination => destination.ProductId, options => options.MapFrom(source => source.ItemOrdered.ProductItemId))
                .ForMember(destination => destination.ProductName, options => options.MapFrom(source => source.ItemOrdered.ProductName))
                .ForMember(destination => destination.PictureUrl, options => options.MapFrom<OrderItemUrlResolver>());
        }
    }
}