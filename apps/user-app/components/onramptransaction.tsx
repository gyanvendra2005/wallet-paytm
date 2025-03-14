// import { $Enums } from "@repo/db/client"

enum OnRampStatus {
    Success,
    Failed,
    Pending
}

enum OnRampType{
    Debited,
    Credited
}

  
export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        status: OnRampStatus,
        provider: string,
        type: OnRampType
    }[]
}) => {
    if (!transactions.length) {
        return <div >
            <h1 className="text-xl font-semibold mb-4">
                Recent Transactions
            </h1>
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </div>
    }
    return <div>
        <div className="pt-2">
            {transactions.map(t => <div className="flex justify-between">
                <div className="my-2">
                    <div className={`text-sm ${t.status === OnRampStatus.Success ? "text-green-600" : "text-orange-400"}`}>
                        {t.status === OnRampStatus.Success ? "Success" : "Pending"}
                                                
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div className={`flex flex-col justify-center ${t.status === OnRampStatus.Success && t.type===OnRampType.Credited ? "text-green-600" : "text-orange-400"}`}>
                   {t.type=== OnRampType.Debited? "-" : "+"} Rs {t.amount/100}
                </div>

            </div>)}
        </div>
    </div>
}