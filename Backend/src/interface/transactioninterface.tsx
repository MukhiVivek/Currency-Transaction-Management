export interface Transaction {
    _id?: string;
    date?: Date;    
    sender_id?: string;
    s_amount?: number;
    s_currency?: string;
    receiver_id?: string;
    r_amount?: number;
    r_currency?: string;
    rate?: number;
    status?: string;
    note?: string;
    r_balance?: number;
    s_balance?: number;
    creater_id?: string;
}