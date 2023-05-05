export interface TranferObject {
   Status: boolean,
   Data: any,
   Message: MessageObject
}

export interface MessageObject {
    Code: string,
    Message: string,
    MessageDetail: string,
    MessageType: string
}