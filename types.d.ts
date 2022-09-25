interface emailBody {
    email:string 
} 

interface bookRequestBody {
    quantity:number,
    date:string, 
    paymentMode?:string 
}  

interface generatePaymentInterface {
    amount:number,
    date: string 
} 

interface signInRequestBody {
    email:string, 
    otp: string
} 

interface editUserDetails {
    name:string,
    contact: string, 
    isStaff: boolean, 
    buildingId? : string, 
    departmentId? : string, 
    floorId? : string, 
    room? : string
} 

interface verifyPaymentBody {
    paymentId: string
} 

interface User {
    _id:string,
    name:string,
    contact:string,
    email:string,
    createdAt?: Date| string, 
    updatedAt?: Date| string, 
    room?: string,
    building?: string, 
    department?: string, 
    floor?:string,
    isStaff: boolean, 
    detailsEntered:boolean,
    __v?: number|string 

} 

interface Building {
    _id: string, 
    name: string 
} 

interface Department {
    _id: string, 
    floor: string, 
    department: string 
} 

interface Floor {
    _id: string, 
    building: string, 
    floor: string
} 

interface Payment {
    _id:string, 
    user: string, 
    payment_id: string,
    reference_id: string,
    status: string, 
} 

interface Booking {
    _id:string
    user:string
    building:string
    department: string
    floor:string
    room: string,
    date: string,
    paymentMode: string,
    quantity: number,
    isDelivered: boolean,
    createdAt?: string| Date
    updatedAt?: string|Date
    __v?: number,
    qr: string
  }

interface verifyMailResponse {
    success: boolean 
} 

interface signInResponse {
    success: boolean, 
    token: string, 
    user: User 
} 

interface EditProfileResponse {
    success: boolean, 
    message: string, 
    data: User
} 

interface VerifyTransactionResponse {
    success:boolean, 
    failed?:boolean, 
    message?: string, 
    data?: {
        booking: Booking ,
        qr: string, 

    }
} 

interface GeneratePaymentLinkResponse {
    success: boolean, 
    data: {
        payment_url: string,
        payment_id: string,
        reference_id: string,
      },
    message?: string
} 

interface Orders {
    data: Array<Booking>
}