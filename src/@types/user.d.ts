
interface signResponse {
   success: boolean;
   token: string;
   message: string,
   user?: {
      firstName: string;
      lastName: string;
      username: string;
      createdAt: string
   }
}

interface walletType {
   balance: number;
   assetValue: number;
   assetLoss: number;
   bonus: number;
   watchList: string[]
}

interface userType {
   firstName: string;
   lastName: string;
   username: string;
   createdAt: string;
   updatedAt: string;
   verified: boolean;
   wallet: walletType
}

interface profileResponse {
   success: boolean;
   user: userType;
}