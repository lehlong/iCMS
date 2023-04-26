using PROJECT.Core.Common;
using PROJECT.Core.Models.MD;
using PROJECT.Infrastructure.Common;
using PROJECT.Services.Interfaces.MD;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PROJECT.Services.Service.MD
{
    public class UnitService : IUnitService
    {
        public IUnitOfWork _unitOfWork;

        public UnitService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<bool> CreateUnit(T_MD_UNIT UnitDetails)
        {
            if (UnitDetails != null)
            {
                await _unitOfWork.Unit.Add(UnitDetails);

                var result = _unitOfWork.Save();

                if (result > 0)
                    return true;
                else
                    return false;
            }
            return false;
        }

        public async Task<bool> DeleteUnit(int UnitId)
        {
            if (UnitId > 0)
            {
                var UnitDetails = await _unitOfWork.Unit.GetById(UnitId);
                if (UnitDetails != null)
                {
                    _unitOfWork.Unit.Delete(UnitDetails);
                    var result = _unitOfWork.Save();

                    if (result > 0)
                        return true;
                    else
                        return false;
                }
            }
            return false;
        }

        public async Task<IEnumerable<T_MD_UNIT>> GetAllUnits()
        {
            var UnitDetailsList = await _unitOfWork.Unit.GetAll();
            return UnitDetailsList;
        }

        public async Task<T_MD_UNIT> GetUnitById(int UnitId)
        {
            if (UnitId > 0)
            {
                var UnitDetails = await _unitOfWork.Unit.GetById(UnitId);
                if (UnitDetails != null)
                {
                    return UnitDetails;
                }
            }
            return null;
        }

        public async Task<bool> UpdateUnit(T_MD_UNIT UnitDetails)
        {
            if (UnitDetails != null)
            {
                var Unit = await _unitOfWork.Unit.GetById(UnitDetails.CODE);
                if (Unit != null)
                {
                    Unit.NAME = UnitDetails.NAME;
                    Unit.SKF = UnitDetails.SKF;

                    _unitOfWork.Unit.Update(Unit);

                    var result = _unitOfWork.Save();

                    if (result > 0)
                        return true;
                    else
                        return false;
                }
            }
            return false;
        }
    }
}
