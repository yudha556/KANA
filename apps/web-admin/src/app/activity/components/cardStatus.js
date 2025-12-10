import { Card, StatusBadge, CircleProgress } from '@/components/ui';

export default function CardStatus() {
    return (
        <div className="w-full flex flex-row gap-5 ">
            <Card className='flex flex-col gap-8 items-center w-full p-6'>
                <div className='flex flex-row justify-between items-center w-full'>
                    <h1 className='font-semibold text-lg'>Quiz Delivery</h1>
                    <StatusBadge status='healthy' />
                </div>
                <CircleProgress progress={75} status='healthy'/>
                <div className='flex flex-col gap-4 w-full'>
                    <div className='flex flex-row items-center justify-between shadow-sm py-3 px-3 rounded-xl w-full'>
                        <p>Active Quizzes</p>
                        <p className='text-[#22c55e] font-semibold'>1,247</p>
                    </div>
                    <div className='flex flex-row items-center justify-between shadow-sm py-3 px-3 rounded-xl w-full'>
                        <p>Accessible</p>
                        <p className='text-[#22c55e] font-semibold'>268</p>
                    </div>
                    <div className='flex flex-row items-center justify-between shadow-sm py-3 px-3 rounded-xl w-full'>
                        <p>Error Rate</p>
                        <p className='text-[#22c55e] font-semibold'>5,8s</p>
                    </div>
                </div>
            </Card>

            <Card className='flex flex-col gap-8 items-center w-full p-6'>
                <div className='flex flex-row justify-between items-center w-full'>
                    <h1 className='font-semibold text-lg'>Face Recognition</h1>
                    <StatusBadge status='warning' />
                </div>
                <CircleProgress progress={75} status="warning"/>
                <div className='flex flex-col gap-4 w-full'>
                    <div className='flex flex-row items-center justify-between shadow-sm py-3 px-3 rounded-xl w-full'>
                        <p>Success Rate</p>
                        <p className='text-[#FACC15] font-semibold'>1,247</p>
                    </div>
                    <div className='flex flex-row items-center justify-between shadow-sm py-3 px-3 rounded-xl w-full'>
                        <p>Camera Errors</p>
                        <p className='text-[#FACC15] font-semibold'>2.1%</p>
                    </div>
                    <div className='flex flex-row items-center justify-between shadow-sm py-3 px-3 rounded-xl w-full'>
                        <p>Network TImeouts</p>
                        <p className='text-[#FACC15] font-semibold'>1.8%</p>
                    </div>
                </div>
            </Card>

            <Card className='flex flex-col gap-8 items-center w-full p-6'>
                <div className='flex flex-row justify-between items-center w-full'>
                    <h1 className='font-semibold text-lg'>AI Quiz Generation</h1>
                    <StatusBadge progress={75} status="error" />
                </div>
                <CircleProgress progress={75} status='healthy'/>
                <div className='flex flex-col gap-4 w-full'>
                    <div className='flex flex-row items-center justify-between shadow-sm py-3 px-3 rounded-xl w-full'>
                        <p>Documents Processed</p>
                        <p className='text-[#EF4444] font-semibold'>1,247</p>
                    </div>
                    <div className='flex flex-row items-center justify-between shadow-sm py-3 px-3 rounded-xl w-full'>
                        <p>Failed Documents</p>
                        <p className='text-[#EF4444] font-semibold'>268</p>
                    </div>
                    <div className='flex flex-row items-center justify-between shadow-sm py-3 px-3 rounded-xl w-full'>
                        <p>Avg Processing Time</p>
                        <p className='text-[#EF4444] font-semibold'>5,8s</p>
                    </div>
                </div>
            </Card>
     
        </div>
    )
}