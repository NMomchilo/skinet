using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithTypesAndBrandsSpecification : BaseSpecification<Product>
    {
        public ProductsWithTypesAndBrandsSpecification(string sort, int? brandId, int? typeId, int? pageSize = 50, int? pageIndex = 0)
            : base(x => 
            (!brandId.HasValue || x.ProductBrandId == brandId) && (!typeId.HasValue || x.ProductTypeId == typeId)
                )
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
            if (!string.IsNullOrWhiteSpace(sort))
            {
                switch (sort)
                {   
                    case "priceAsc":
                        AddOrderBy(p => p.Price);
                        break;
                    case "priceDesc":
                        AddOrderByDescending(p => p.Price);
                        break;
                    default:
                        AddOrderBy(x => x.Name);
                        break;
                }
            }

            int skip = pageIndex == null || pageIndex < 1 ? 0 : (int)((pageIndex - 1) * pageSize);
            int take = pageSize == null || pageSize < 1 ? 50 : (int) pageSize;
            ApplyPaging(skip, take);
        }

        public ProductsWithTypesAndBrandsSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
        }
    }
}