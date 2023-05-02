export interface TranferObject {
   Status: boolean,
   Data: object,
   Message: MessageObject
}

export interface MessageObject {
    Code: string,
    Message: string,
    MessageDetail: string,
    MessageType: string
}