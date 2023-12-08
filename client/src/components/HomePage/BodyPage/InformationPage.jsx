import React from 'react';

const InformationPage = () => {
    return (
        <div className='w-full h-full mt-5 bg-white border-box'>
            <div className='flex flex-col items-start justify-center py-6 pl-14'>
                {/* account image and name */}
                <div className='flex items-center'>
                    <div className='flex items-center justify-center w-20 h-20 mr-10 border border-gray-300 border-solid rounded-full'>
                       {/* account image */}
                        <img
                            className='object-cover w-4/5 rounded-full h-4/5' 
                            src='' alt='' />
                    </div>
                    <div className='flex flex-col items-start justify-center'>
                        {/* フリガナ */}
                        <p className='text-base text-gray-400'>ヤマダ</p>
                        {/* 名前 */}
                        <div className='flex items-center justify-center'>
                            <p className='mr-2 text-xl font-bold'>山田</p>
                            {/* icon for gender */}
                            <img
                                className='w-3 h-3'
                                // male
                                src='https://cdn-icons-png.flaticon.com/128/1340/1340619.png' alt='' 
                                // female
                                // src='https://cdn-icons-png.flaticon.com/128/866/866954.png alt=''
                                // other
                                // src='https://cdn-icons-png.flaticon.com/128/45/45799.png alt='' 
                            />
                        </div>
                        {/* birthday */}
                        <p className='text-sm text-gray-400'>2023/12/7</p>
                    </div>
                </div>
                <ul className='mt-4'>
                    <li className='py-1 text-base text-gray-400'>abc@gmail.com</li>
                    <li className='py-1 text-base text-gray-400'>080 1234 456</li>
                    <li className='py-1 text-base text-gray-400'>住所</li>
                    <li className='py-1 text-base text-gray-400'>instagram.com</li>
                    <li className='py-1 text-base text-gray-400'>a@2.com</li>
                </ul>
            </div>

            {/* company */}
            <div className='w-full p-10 bg-green-300 rounded-t-3xl'>
                {/* company */}
                <div className='relative w-full h-full'>
                    <p className='text-2xl font-bold text-orange-400'>勤務先</p>
                    <ul>
                        <div className='absolute w-full border-l bottom-4 h-3/4 border-l-gray-500 z-999 left-4 border-l-solid'></div>
                        <li className='flex items-center p-2.5'><div className='z-10 w-4 h-4 mr-4 bg-orange-300 rounded-full'></div> ECCコンピューター専門学校</li>
                        <li className='flex items-center p-2.5'><div className='z-10 w-4 h-4 mr-4 bg-orange-300 rounded-full'></div>住所</li>
                        <li className='flex items-center p-2.5'><div className='z-10 w-4 h-4 mr-4 bg-orange-300 rounded-full'></div>電話番号</li>
                        <li className='flex items-center p-2.5'><div className='z-10 w-4 h-4 mr-4 bg-orange-300 rounded-full'></div>FAX</li>
                        <li className='flex items-center p-2.5'><div className='z-10 w-4 h-4 mr-4 bg-orange-300 rounded-full'></div>Website</li>
                        <li className='flex items-center p-2.5'><div className='z-10 w-4 h-4 mr-4 bg-orange-300 rounded-full'></div>
                            <span>
                                部署
                            </span>
                            <span className='px-2'> - </span>
                            <span>役職</span>
                        </li>
                    </ul>
                </div>
                
                {/* about me */}
                <div className='w-full h-full'>
                    <p className='text-xl font-bold text-orange-400'>私について</p>
                    <ul>
                        <li>hi</li>
                        <li>hi</li>
                        <li>hi</li>
                        <li>hi</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default InformationPage;