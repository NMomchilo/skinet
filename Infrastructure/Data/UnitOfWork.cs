using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;

namespace Infrastructure.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly StoreContext context;
        private Hashtable repositories;
        
        public UnitOfWork(StoreContext context)
        {
            this.context = context;
        }

        public async Task<int> Complete()
        {
            return await this.context.SaveChangesAsync();
        }

        public void Dispose()
        {
            this.context.Dispose();
        }

        public IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity
        {
            if (this.repositories == null) 
                this.repositories = new Hashtable();

            var type = typeof(TEntity).Name;
            if (!this.repositories.ContainsKey(type))
            {
                var repositoryType = typeof(GenericRepository<>);
                var repositoryInstance = Activator.CreateInstance(repositoryType.MakeGenericType(typeof(TEntity)), this.context);
                this.repositories.Add(type, repositoryInstance);
            }

            return (IGenericRepository<TEntity>)this.repositories[type];
        }
    }
}