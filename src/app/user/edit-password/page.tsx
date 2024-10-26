import ChangePassForm from '@/components/pages/auth/ChangePass'
import React from 'react'

const UserEditPasswordPage = () => {
    return (
        <div className='w-[500px] m-auto'>
            <h1 className='text-[30px] font-medium text-center mb-4'>Change password</h1>

            <ChangePassForm />
        </div>
    )
}

export default UserEditPasswordPage