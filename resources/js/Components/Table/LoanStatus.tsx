import { useForm, usePage } from '@inertiajs/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type LoanStatus = 'borrowed' | 'returned' | 'overdue' | 'pending'

type FlashProps = {
    flash?: {
        success?: string;
        error?: string;
    }
}

const statusColors: Record<string, string> = {
    borrowed: "bg-green-100 text-black",
    returned: "bg-blue-100 text-black",
    overdue: "bg-red-100 text-black",
    pending: "bg-yellow-100 text-black",
}

const LoanStatusCell: React.FC<{ loan: Loan }> = ({ loan }) => {

    const [localStatus, setLocalStatus] = useState(loan.status)
    const { flash } = usePage<FlashProps>().props
    const { put, data, setData, errors } = useForm({ status: loan.status })


    const handleChange = (newStatus: LoanStatus) => {
        setLocalStatus(newStatus);
        setData("status", newStatus);

        put(route('loans.update', loan.id), {
            data: { status: newStatus },
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Loan updated successfully");
            },
            onError: () => {
                toast.error("Failed to update loan");
                setLocalStatus(loan.status);
            },
        });
    }

    useEffect(() => {
        setLocalStatus(loan.status)
        setData("status", loan.status)
    }, [loan.status])

    return (
        <Select value={localStatus} onValueChange={handleChange}>
            <SelectTrigger className={`w-32 ${statusColors[localStatus]}`}>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem className='bg-green-100 text-black hover:bg-green-200 focus:bg-green-300' value="borrowed">Borrowed</SelectItem>
                <SelectItem className='bg-blue-100 text-black hover:bg-blue-200 focus:bg-blue-300' value="returned">Returned</SelectItem>
                <SelectItem className='bg-red-100 text-black hover:bg-red-200 focus:bg-red-300' value="overdue">Overdue</SelectItem>
                <SelectItem className='bg-yellow-100 text-black hover:bg-yellow-200 focus:bg-yellow-300' value="pending">Pending</SelectItem>
            </SelectContent>
            {errors.status && (
                <p className="text-red-500 text-sm mt-1">{errors.status}</p>
            )}
        </Select>
    );
};

export default LoanStatusCell
