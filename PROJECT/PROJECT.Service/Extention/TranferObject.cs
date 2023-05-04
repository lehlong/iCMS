namespace PROJECT.Service.Extention
{
    public class TranferObject
    {
        public bool Status { get; set; }
        public object Data { get; set; }
        public MessageObject Message { get; set; }
    }

    public class MessageObject
    {
        public string Code { get; set; }
        public string Message { get; set; }
        public string MessageDetail { get; set; }
        public string MessageType { get; set; }
    }
}
