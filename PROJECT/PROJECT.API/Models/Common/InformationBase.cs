namespace PROJECT.API.Models.Common
{
    public class InformationBase
    {
        public virtual string CREATE_BY { get; set; }
        public virtual DateTime? CREATE_DATE { get; set; }
        public virtual string UPDATE_BY { get; set; }
        public virtual DateTime? UPDATE_DATE { get; set; }

    }
}
