namespace PROJECT.Core.Common
{
    public class BaseEntity : IBaseEntity
    {
        public string? CREATE_BY { get; set; }
        public string? UPDATE_BY { get; set; }
        public DateTime? CREATE_DATE { get; set; }
        public DateTime? UPDATE_DATE { get; set; }
    }
}
