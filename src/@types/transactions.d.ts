
interface transactionType {
   _id: string;
   userId: string
   username: string
   amount: number
   blockchain: string
   image?: string
   walletAddress?: string
   type: "deposit" | "withdrawal"
   status: 'pending' | 'completed' | 'failed'
   description: string
   metadata: Object<any>
   createdAt: string
   updatedAt: string
}

interface transactionListType {
   transactions: transactionType[]
   page: number
   total: number
   totalPages: number
   limit: number
   user: {
      username: string
      balance: string
   }
}

interface transactionResponseType {
   success: boolean;
   message: string;
   data: transactionType
}

interface transactionListResponseType {
   success: boolean;
   message: string;
   data: transactionListType
}