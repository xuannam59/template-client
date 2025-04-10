import LayoutAuth from '@/layouts/LayoutAuth'
import LayoutPage from '@/layouts/LayoutPage'
import Notfound from '@/pages/404/Notfound'
import ForgotPassword from '@/pages/auth/ForgotPassword'
import Login from '@/pages/auth/Login'
import SignUp from '@/pages/auth/SignUp'
import Checkout from '@/pages/checkout/Checkout'
import PaymentStatus from '@/pages/checkout/PaymentStatus'
import HomePage from '@/pages/home/HomePage'
import ProductDetail from '@/pages/product/ProductDetail'
import ProductList from '@/pages/product/ProductList'
import ProductSearch from '@/pages/product/ProductSearch'
import ProfilePage from '@/pages/profile/ProfilePage'
import { BrowserRouter, Route, Routes } from 'react-router'

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LayoutPage />} >
                    <Route index element={<HomePage />} />
                    <Route path='products' >
                        <Route path='detail/:slug' element={<ProductDetail />} />
                        <Route path='list/:slug' element={<ProductList />} />
                        <Route path=':key' element={<ProductSearch />} />
                        <Route path='checkout' element={<Checkout />} />
                    </Route>
                    <Route path='user' element={<ProfilePage />} />
                    <Route path='payment' element={<PaymentStatus />} />
                    <Route path='*' element={<Notfound />} />
                </Route>
                <Route element={<LayoutAuth />}>
                    <Route path='login' element={<Login />} />
                    <Route path='sign-up' element={<SignUp />} />
                </Route>
                <Route path='forgot-password' element={<ForgotPassword />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router