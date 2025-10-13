
interface globalDataType {
   BTC: string;
   ETH: string;
   USDT: string;
}

interface globalDataresponseType {
   success: boolean;
   message: string;
   data: globalDataType
}

interface loginResponseType {
   success: boolean;
   message: string;
   access_token: string
}

interface allUserType {
   users: userType[],
   limit: number,
   page: number
   total: number
   totalPages: number
}

interface allTransactionsType {
   transactions: transactionType[]
   page: number
   total: number
   totalPages: number
   limit: number
}

interface allUserResponseType {
   success: boolean;
   message: string;
   data: allUserType
}

interface searchUsersResponse {
   success: boolean;
   message: string;
   data: userType[]
}

interface userResponseType {
   success: boolean;
   message: string;
   data: userType
}

interface allTransactionsResponseType {
   success: boolean;
   message: string;
   data: allTransactionsType
}

interface updateTransactionType {
   success: boolean;
   message: string;
   data: transactionType
}

interface adminType {
   username: string
   password: string
   walletAddress: {
      BTC: string
      ETH: string
      USDT: string
   }
   
   createdAt: string
   updatedAt: string
}

interface adminResponseType {
   success: boolean;
   message: string;
   data: adminType
}