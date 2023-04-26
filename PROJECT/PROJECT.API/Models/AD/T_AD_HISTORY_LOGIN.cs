namespace PROJECT.API.Models.AD
{
    public class T_AD_HISTORY_LOGIN
    {
        public virtual Guid ID { get; set; }
        public virtual string USER_NAME { get; set;}
        public virtual string FULL_NAME { get; set;}
        public virtual string OS { get; set;}
        public virtual DateTime LOGIN_TIME { get;set;}
        public virtual string BROWSER { get; set;}
        public virtual string IP_ADDRESS { get; set;}
        public virtual string CONNECTION_ID { get; set; }
    }
}
