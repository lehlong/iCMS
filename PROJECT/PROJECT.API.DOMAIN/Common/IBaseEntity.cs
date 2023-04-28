namespace PROJECT.API.DOMAIN.Common
{
    public interface IBaseEntity
    {
        string? CREATE_BY { get; set; }
        string? UPDATE_BY { get; set; }
        DateTime? CREATE_DATE { get; set; }
        DateTime? UPDATE_DATE { get; set; }
    }
}
