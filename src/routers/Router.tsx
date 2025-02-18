import LayoutAuth from '@/layouts/LayoutAuth'
import LayoutPage from '@/layouts/LayoutPage'
import ForgotPassword from '@/pages/auth/ForgotPassword'
import Login from '@/pages/auth/Login'
import SignUp from '@/pages/auth/SignUp'
import Checkout from '@/pages/checkout/Checkout'
import HomePage from '@/pages/home/HomePage'
import ProductDetail from '@/pages/product/ProductDetail'
import ProductList from '@/pages/product/ProductList'
import ProductPage from '@/pages/product/ProductPage'
import ProfilePage from '@/pages/profile/ProfilePage'
import { BrowserRouter, Route, Routes } from 'react-router'

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LayoutPage />} >
                    <Route index element={<HomePage />} />
                    <Route path='products' >
                        <Route index element={<ProductPage />} />
                        <Route path='detail/:slug' element={<ProductDetail />} />
                        <Route path='list/:slug' element={<ProductList />} />
                        <Route path='checkout' element={<Checkout />} />
                    </Route>
                    <Route path='user' element={<ProfilePage />} />
                </Route>
                <Route element={<LayoutAuth />}>
                    <Route path='login' element={<Login />} />
                    <Route path='sign-up' element={<SignUp />} />
                </Route>
                <Route path='forgot-password' element={<ForgotPassword />} />
                <Route path='*' element={"404"} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router