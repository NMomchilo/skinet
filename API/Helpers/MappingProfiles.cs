using API.Dtos;
using AutoMapper;
using Core.Entities;

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
        }
    }
}